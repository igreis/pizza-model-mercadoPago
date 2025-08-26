import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PizzaCard } from './PizzaCard';
import { pizzas } from '@/data/pizzas';
import { Pizza } from '@/types/pizza';
import { CartItem } from '@/types/pizza';

interface MenuSectionProps {
  onAddToCart: (pizza: Pizza) => void;
  items: CartItem[];
  handleCheckoutClick: (items: CartItem[]) => Promise<void>;
}

const categories = [
  { id: 'all', label: 'Todas' },
  { id: 'tradicional', label: 'Tradicionais' },
  { id: 'especial', label: 'Especiais' },
  { id: 'vegetariana', label: 'Vegetarianas' },
  { id: 'doce', label: 'Doces' }
];

export const MenuSection = ({ onAddToCart, items, handleCheckoutClick }: MenuSectionProps) => {
  const [activeCategory, setActiveCategory] = useState('all');
  console.log(items);

  const filteredPizzas = activeCategory === 'all' 
    ? pizzas 
    : pizzas.filter(pizza => pizza.category === activeCategory);

  return (
    <section id="menu" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nosso Cardápio
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra sabores únicos e ingredientes selecionados em cada uma de nossas pizzas artesanais
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`transition-all duration-200 ${
                activeCategory === category.id 
                  ? 'shadow-warm' 
                  : 'hover:shadow-sm'
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Pizza Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPizzas.map((pizza) => (
            <PizzaCard 
              key={pizza.id} 
              pizza={pizza} 
              onAddToCart={onAddToCart}
              items={items}
              handleCheckoutClick={() => handleCheckoutClick(items)}
            />
          ))}
        </div>

        {/* Popular Pizzas Note */}
        <div className="text-center mt-12 p-6 bg-card rounded-xl shadow-warm">
          <p className="text-muted-foreground">
            💫 Nossas pizzas mais populares são preparadas com ingredientes premium e receitas exclusivas
          </p>
        </div>
      </div>
    </section>
  );
};