import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CreditCard, X } from 'lucide-react';
import { Pizza } from '@/types/pizza';

export interface PizzaCustomization {
  size: 'P' | 'M' | 'G';
  border: 'tradicional' | 'catupiry' | 'cheddar' | 'chocolate';
  observations: string;
}

interface PizzaCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  pizza: Pizza;
  customization: PizzaCustomization;
  onCustomizationChange: (customization: PizzaCustomization) => void;
  onAddToCart: () => void;
  onFinalizeOrder: () => void;
}

export const PizzaCustomizationModal = ({
  isOpen,
  onClose,
  pizza,
  customization,
  onCustomizationChange,
  onAddToCart,
  onFinalizeOrder
}: PizzaCustomizationModalProps) => {
  const sizeMultiplier = {
    P: 0.8,
    M: 1,
    G: 1.3
  };

  const borderPrices = {
    tradicional: 0,
    catupiry: 5,
    cheddar: 6,
    chocolate: 8
  };

  const calculatePrice = () => {
    const basePrice = pizza.price * sizeMultiplier[customization.size];
    const borderPrice = borderPrices[customization.border];
    return basePrice + borderPrice;
  };

  const updateCustomization = (updates: Partial<PizzaCustomization>) => {
    onCustomizationChange({ ...customization, ...updates });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute -top-1 -left-1 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          <DialogTitle className="text-center">Personalizar Pedido - {pizza.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Size Selection */}
          <div>
            <Label className="text-base font-semibold">Tamanho</Label>
            <RadioGroup 
              value={customization.size} 
              onValueChange={(value: 'P' | 'M' | 'G') => 
                updateCustomization({ size: value })
              }
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="P" id="size-p" />
                <Label htmlFor="size-p">Pequena (P) - R$ {(pizza.price * 0.8).toFixed(2)}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="M" id="size-m" />
                <Label htmlFor="size-m">Média (M) - R$ {pizza.price.toFixed(2)}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="G" id="size-g" />
                <Label htmlFor="size-g">Grande (G) - R$ {(pizza.price * 1.3).toFixed(2)}</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Border Selection */}
          <div>
            <Label className="text-base font-semibold">Borda</Label>
            <RadioGroup 
              value={customization.border} 
              onValueChange={(value: any) => 
                updateCustomization({ border: value })
              }
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tradicional" id="border-tradicional" />
                <Label htmlFor="border-tradicional">Tradicional - Grátis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="catupiry" id="border-catupiry" />
                <Label htmlFor="border-catupiry">Catupiry - +R$ 5,00</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cheddar" id="border-cheddar" />
                <Label htmlFor="border-cheddar">Cheddar - +R$ 6,00</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="chocolate" id="border-chocolate" />
                <Label htmlFor="border-chocolate">Chocolate - +R$ 8,00</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Observations */}
          <div>
            <Label htmlFor="observations" className="text-base font-semibold">Observações</Label>
            <Textarea
              id="observations"
              placeholder="Alguma observação especial? (Ex: sem cebola, massa fina, etc.)"
              value={customization.observations}
              onChange={(e) => 
                updateCustomization({ observations: e.target.value })
              }
              className="mt-2"
              rows={3}
            />
          </div>

          {/* Total Price */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary">R$ {calculatePrice().toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onAddToCart}
              className="flex-1"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Adicionar ao Carrinho
            </Button>
            <Button 
              onClick={onFinalizeOrder}
              className="flex-1"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Finalizar Compra
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};