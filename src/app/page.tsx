"use client";
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { MenuSection } from '@/components/MenuSection';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Cart } from '@/components/Cart';
import { Footer } from '@/components/Footer';
import { Pizza, CartItem } from '@/types/pizza';
import { useToast } from '@/hooks/use-toast';

export default function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (pizza: Pizza) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === pizza.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...pizza, quantity: 1 }];
    });

    toast({
      title: "Pizza adicionada!",
      description: `${pizza.name} foi adicionada ao seu carrinho.`,
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Pizza removida",
      description: "Item removido do carrinho.",
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Pagamento não configurado",
      description: "Integre manualmente um provedor de pagamento (ex.: Mercado Pago, Stripe, etc.) antes de habilitar o checkout.",
    });
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartItemsCount} />
      <Hero />
      <MenuSection onAddToCart={addToCart} />
      <About />
      <Contact />
      <Cart
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
      <Footer />
    </div>
  );
}
