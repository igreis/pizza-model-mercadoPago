import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MapPin, User, Phone, Mail, Clock, CreditCard } from 'lucide-react';
import { Pizza } from '@/types/pizza';
import { PizzaCustomization } from './modalPizzaCustomization';
import { DeliveryInfo } from './modalEntrega';
import Image from 'next/image';

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  pizza: Pizza;
  customization: PizzaCustomization;
  deliveryInfo: DeliveryInfo;
  onConfirmOrder: () => void;
}

export const OrderSummaryModal = ({
  isOpen,
  onClose,
  onBack,
  pizza,
  customization,
  deliveryInfo,
  onConfirmOrder
}: OrderSummaryModalProps) => {
  const sizeLabels = {
    P: 'Pequena',
    M: 'Média',
    G: 'Grande'
  };

  const borderLabels = {
    tradicional: 'Tradicional',
    catupiry: 'Catupiry',
    cheddar: 'Cheddar',
    chocolate: 'Chocolate'
  };

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

  const calculateItemPrice = () => {
    const basePrice = pizza.price * sizeMultiplier[customization.size];
    const borderPrice = borderPrices[customization.border];
    return basePrice + borderPrice;
  };

  const deliveryFee = deliveryInfo.type === 'entrega' ? 8.50 : 0;
  const itemPrice = calculateItemPrice();
  const totalPrice = itemPrice + deliveryFee;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="absolute -top-1 -left-1 h-8 w-8 p-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <DialogTitle className="text-center">Resumo do Pedido</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Pizza Info */}
          <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image 
                src={pizza.image}
                alt={pizza.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{pizza.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {pizza.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {pizza.ingredients.slice(0, 2).map((ingredient, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {ingredient}
                  </Badge>
                ))}
                {pizza.ingredients.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{pizza.ingredients.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Customizations */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Personalizações
            </h4>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div>
                  <span className="text-muted-foreground">Tamanho:</span>
                  <p className="font-medium">{sizeLabels[customization.size]} ({customization.size})</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Borda:</span>
                  <p className="font-medium">
                    {borderLabels[customization.border]}
                    {borderPrices[customization.border] > 0 && (
                      <span className="text-green-600 ml-1">
                        (+R$ {borderPrices[customization.border].toFixed(2)})
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {customization.observations && (
              <div>
                <span className="text-muted-foreground text-sm">Observações:</span>
                <p className="text-sm bg-muted p-2 rounded mt-1">
                  {customization.observations}
                </p>
              </div>
            )}
          </div>

          <Separator />

          {/* Delivery Info */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              {deliveryInfo.type === 'entrega' ? 'Informações de Entrega' : 'Informações de Retirada'}
            </h4>
            
            <div className="space-y-3 text-sm">
              {/* Personal Info */}
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{deliveryInfo.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{deliveryInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{deliveryInfo.email}</span>
                </div>
              </div>

              {/* Address or Pickup Info */}
              {deliveryInfo.type === 'entrega' ? (
                <div className="flex items-start gap-2 mt-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">
                      {deliveryInfo.address?.street}, {deliveryInfo.address?.number}
                    </p>
                    {deliveryInfo.address?.complement && (
                      <p className="text-muted-foreground">{deliveryInfo.address.complement}</p>
                    )}
                    <p className="text-muted-foreground">
                      {deliveryInfo.address?.neighborhood} - {deliveryInfo.address?.city}
                    </p>
                    <p className="text-muted-foreground">CEP: {deliveryInfo.address?.zipCode}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900">Retirar no Local</p>
                    <p className="text-blue-700">Tempo estimado: 25-30 minutos</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Price Breakdown */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Resumo de Valores
            </h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{pizza.name} ({sizeLabels[customization.size]})</span>
                <span>R$ {(pizza.price * sizeMultiplier[customization.size]).toFixed(2)}</span>
              </div>
              
              {borderPrices[customization.border] > 0 && (
                <div className="flex justify-between">
                  <span>Borda {borderLabels[customization.border]}</span>
                  <span>R$ {borderPrices[customization.border].toFixed(2)}</span>
                </div>
              )}
              
              {deliveryInfo.type === 'entrega' && (
                <div className="flex justify-between">
                  <span>Taxa de entrega</span>
                  <span>R$ {deliveryFee.toFixed(2)}</span>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">R$ {totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Estimated Time */}
          <div className="flex items-center justify-center gap-2 p-3 bg-green-50 rounded-lg">
            <Clock className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              {deliveryInfo.type === 'entrega' ? 'Tempo estimado de entrega: 35-45 min' : 'Preparo estimado: 25-30 min'}
            </span>
          </div>

          {/* Confirm Button */}
          <div className="pt-2">
            <Button 
              onClick={onConfirmOrder}
              className="w-full"
              size="lg"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Confirmar Pedido - R$ {totalPrice.toFixed(2)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};