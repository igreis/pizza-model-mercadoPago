import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Star } from 'lucide-react';
import { Pizza, CartItem } from '@/types/pizza';
import Image from 'next/image';
import { useState } from 'react';
import { PizzaCustomizationModal, PizzaCustomization } from './modalPizzaCustomization';
import { DeliveryInfoModal, DeliveryInfo } from './modalEntrega';
import { OrderSummaryModal } from './modalInfos';

interface PizzaCardProps {
  pizza: Pizza;
  onAddToCart: (pizza: Pizza, customizations: PizzaCustomization) => void;
  items: CartItem[];
  handleCheckoutClick: (items: CartItem[]) => Promise<void>;
}

export const PizzaCard = ({ pizza, onAddToCart, items, handleCheckoutClick }: PizzaCardProps) => {
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  console.log(pizza)
  
  const [customization, setCustomization] = useState<PizzaCustomization>({
    size: 'M',
    border: 'tradicional',
    observations: ''
  });
  
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    type: 'retirada',
    name: '',
    phone: '',
    email: ''
  });

  const categoryColors = {
    tradicional: 'bg-primary text-primary-foreground',
    especial: 'bg-secondary text-secondary-foreground',
    doce: 'bg-accent text-accent-foreground',
    vegetariana: 'bg-emerald-500 text-white'
  };

  const categoryLabels = {
    tradicional: 'Tradicional',
    especial: 'Especial',
    doce: 'Doce',
    vegetariana: 'Vegetariana'
  };

  const handleOpenModal = () => {
    setShowCustomizationModal(true);
  };

  const handleCloseModals = () => {
    setShowCustomizationModal(false);
    setShowDeliveryModal(false);
    setShowSummaryModal(false);
    resetData();
  };

  const handleAddToCart = () => {
    onAddToCart(pizza, customization);
    handleCloseModals();
  };

  const handleGoToDelivery = () => {
    onAddToCart(pizza, customization);
    setShowCustomizationModal(false);
    setShowDeliveryModal(true);
  };

  const handleBackToCustomization = () => {
    setShowDeliveryModal(false);
    setShowCustomizationModal(true);
  };

  const handleGoToSummary = () => {
    setShowDeliveryModal(false);
    setShowSummaryModal(true);
  };

  const handleBackToDelivery = () => {
    setShowSummaryModal(false);
    setShowDeliveryModal(true);
  };

  const handleCompleteOrder = () => {
    // Aqui você pode implementar a lógica para finalizar o pedido
    console.log('Pedido finalizado:', {
      pizza,
      customization,
      deliveryInfo
    });
    
    // Exemplo: redirecionar para pagamento, salvar no sistema, etc.
    handleCloseModals();
  };

  const resetData = () => {
    setCustomization({
      size: 'M',
      border: 'tradicional',
      observations: ''
    });
    setDeliveryInfo({
      type: 'retirada',
      name: '',
      phone: '',
      email: ''
    });
  };

  return (
    <>
      <div className="pizza-card group">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-lg mb-4 h-48">
          <Image 
            src={pizza.image}
            alt={pizza.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={pizza.popular}
          />
          
          {/* Popular Badge */}
          {pizza.popular && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-secondary text-secondary-foreground font-medium">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Popular
              </Badge>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <Badge className={categoryColors[pizza.category]}>
              {categoryLabels[pizza.category]}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">{pizza.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {pizza.description}
            </p>
          </div>

          {/* Price and Order Button */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-2xl font-bold text-primary">
              A partir de R$ {pizza.priceG.toFixed(2)}
            </div>
            
            <Button 
              onClick={handleOpenModal}
              className="btn-secondary group"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-1 group-hover:rotate-90 transition-transform" />
              Fazer Pedido
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PizzaCustomizationModal
        isOpen={showCustomizationModal}
        onClose={handleCloseModals}
        pizza={pizza}
        customization={customization}
        onCustomizationChange={setCustomization}
        onAddToCart={handleAddToCart}
        onFinalizeOrder={handleGoToDelivery}
      />

      <DeliveryInfoModal
        isOpen={showDeliveryModal}
        onClose={handleCloseModals}
        deliveryInfo={deliveryInfo}
        onDeliveryInfoChange={setDeliveryInfo}
        onBack={handleBackToCustomization}
        handleGoToSummary={handleGoToSummary}
      />

      <OrderSummaryModal
        isOpen={showSummaryModal}
        onClose={handleCloseModals}
        onBack={handleBackToDelivery}
        items={items}
        customization={customization}
        deliveryInfo={deliveryInfo}
        onConfirmOrder={() => handleCheckoutClick(items)}
      />
    </>
  );
};