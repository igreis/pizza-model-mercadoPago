import type { StaticImageData } from 'next/image'

export interface Pizza {
  id: string;
  name: string;
  description: string;
  priceG: number;
  priceM: number;
  priceP: number;
  image: string | StaticImageData;
  category: 'tradicional' | 'especial' | 'doce' | 'vegetariana';
  ingredients: string[];
  popular?: boolean;
}

export interface CartItem extends Pizza {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  total: number;
  status: 'pendente' | 'em_preparo' | 'enviado' | 'entregue';
  createdAt: Date;
}