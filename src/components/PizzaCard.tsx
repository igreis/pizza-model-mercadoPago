import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Star } from 'lucide-react';
import { Pizza } from '@/types/pizza';
import Image from 'next/image';

interface PizzaCardProps {
  pizza: Pizza;
  onAddToCart: (pizza: Pizza) => void;
}

export const PizzaCard = ({ pizza, onAddToCart }: PizzaCardProps) => {
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

  return (
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

        {/* Ingredients */}
        <div className="flex flex-wrap gap-1">
          {pizza.ingredients.slice(0, 3).map((ingredient, index) => (
            <span 
              key={index}
              className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
            >
              {ingredient}
            </span>
          ))}
          {pizza.ingredients.length > 3 && (
            <span className="text-xs text-muted-foreground px-2 py-1">
              +{pizza.ingredients.length - 3} mais
            </span>
          )}
        </div>

        {/* Price and Add Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-2xl font-bold text-primary">
            R$ {pizza.price.toFixed(2)}
          </div>
          
          <Button 
            onClick={() => onAddToCart(pizza)}
            className="btn-secondary group"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1 group-hover:rotate-90 transition-transform" />
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
};