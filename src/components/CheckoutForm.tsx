import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CartItem } from '@/types/pizza';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface CheckoutFormProps {
  items: CartItem[];
  total: number;
  onSuccess: () => void;
}

export const CheckoutForm = ({ items, total, onSuccess }: CheckoutFormProps) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione pelo menos uma pizza ao carrinho.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log('Iniciando checkout com:', { items, customerInfo });

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          })),
          customerInfo
        }
      });

      if (error) {
        console.error('Erro na função create-payment:', error);
        throw new Error(error.message || 'Erro ao processar pagamento');
      }

      if (!data?.url) {
        throw new Error('URL de checkout não recebida');
      }

      console.log('Redirecionando para:', data.url);
      
      // Redirecionar para o Stripe Checkout
      window.open(data.url, '_blank');
      
      // Limpar carrinho após redirecionar
      onSuccess();

      toast({
        title: "Redirecionando para pagamento",
        description: "Você será redirecionado para completar o pagamento.",
      });

    } catch (error) {
      console.error('Erro durante checkout:', error);
      toast({
        title: "Erro no checkout",
        description: error instanceof Error ? error.message : "Erro desconhecido ao processar pagamento.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Finalizar Pedido</CardTitle>
        <CardDescription>
          Preencha seus dados para continuar com o pagamento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              type="text"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
              required
              placeholder="Seu nome completo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
              required
              placeholder="seu@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
              required
              placeholder="(11) 99999-9999"
            />
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              'Pagar com Stripe'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};