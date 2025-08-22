import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, X, ShoppingCart } from 'lucide-react';
import { CartItem } from '@/types/pizza';
import { CheckoutForm } from '@/components/CheckoutForm';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const Cart = ({ items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 btn-hero shadow-warm"
        size="lg"
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        Ver Carrinho ({itemCount})
      </Button>
    );
  }

  const handleCheckoutSuccess = () => {
    // Clear all items from cart
    items.forEach(item => onRemoveItem(item.id));
    setShowCheckout(false);
    setIsOpen(false);
  };

  if (showCheckout) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCheckout(false)}
            className="absolute -top-2 -right-2 z-10"
          >
            <X className="w-5 h-5" />
          </Button>
          <CheckoutForm 
            items={items}
            total={total}
            onSuccess={handleCheckoutSuccess}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-foreground">Seu Pedido</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Seu carrinho está vazio</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 bg-muted/50 rounded-lg p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    R$ {item.price.toFixed(2)}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    className="w-8 h-8 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveItem(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span className="text-primary">R$ {total.toFixed(2)}</span>
            </div>
            
            <Button
              onClick={() => setShowCheckout(true)}
              className="w-full btn-hero"
              size="lg"
            >
              Finalizar Pedido
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              {total >= 60 ? '🎉 Entrega grátis!' : `Faltam R$ ${(60 - total).toFixed(2)} para entrega grátis`}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};