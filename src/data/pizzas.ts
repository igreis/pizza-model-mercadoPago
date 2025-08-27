import { Pizza } from '@/types/pizza';
import margheritaImage from '@/assets/margherita-pizza.jpg';
import pepperoniImage from '@/assets/pepperoni-pizza.jpg';

export const pizzas: Pizza[] = [
  {
    id: '1',
    name: 'Margherita',
    description: 'Molho de tomate, mozzarella fresca, manjericão e azeite extra virgem',
    priceG: 79.90,
    priceM: 69.90,
    priceP: 59.90,
    image: margheritaImage,
    category: 'tradicional',
    ingredients: ['molho de tomate', 'mozzarella fresca', 'manjericão', 'azeite extra virgem'],
    popular: true
  },
  {
    id: '2',
    name: 'Pepperoni',
    description: 'Molho de tomate, mozzarella, pepperoni italiano e orégano',
    priceG: 79.90,
    priceM: 69.90,
    priceP: 59.90,
    image: pepperoniImage,
    category: 'tradicional',
    ingredients: ['molho de tomate', 'mozzarella', 'pepperoni italiano', 'orégano'],
    popular: true
  },
  {
    id: '3',
    name: 'Quattro Stagioni',
    description: 'Presunto, cogumelos, alcachofras, azeitonas e mozzarella',
    priceG: 54.90,
    priceM: 44.90,
    priceP: 34.90,
    image: margheritaImage,
    category: 'especial',
    ingredients: ['presunto', 'cogumelos', 'alcachofras', 'azeitonas', 'mozzarella']
  },
  {
    id: '4',
    name: 'Vegetariana',
    description: 'Abobrinha, berinjela, pimentão, cebola roxa, tomate cereja e rúcula',
    priceG: 46.90,
    priceM: 36.90,
    priceP: 26.90,
    image: margheritaImage,
    category: 'vegetariana',
    ingredients: ['abobrinha', 'berinjela', 'pimentão', 'cebola roxa', 'tomate cereja', 'rúcula']
  },
  {
    id: '5',
    name: 'Portuguesa',
    description: 'Presunto, ovos, cebola, azeitonas, mozzarella e orégano',
    priceG: 52.90,
    priceM: 42.90,
    priceP: 32.90,
    image: pepperoniImage,
    category: 'tradicional',
    ingredients: ['presunto', 'ovos', 'cebola', 'azeitonas', 'mozzarella', 'orégano'],
    popular: true
  },
  {
    id: '6',
    name: 'Nutella com Morango',
    description: 'Nutella cremosa, morangos frescos e açúcar de confeiteiro',
    priceG: 38.90,
    priceM: 28.90,
    priceP: 18.90,
    image: margheritaImage,
    category: 'doce',
    ingredients: ['nutella', 'morangos frescos', 'açúcar de confeiteiro']
  },
  {
    id: '7',
    name: 'Calabresa Especial',
    description: 'Calabresa artesanal, cebola caramelizada, pimentão e mozzarella',
    priceG: 49.90,
    priceM: 39.90,
    priceP: 29.90,
    image: pepperoniImage,
    category: 'tradicional',
    ingredients: ['calabresa artesanal', 'cebola caramelizada', 'pimentão', 'mozzarella']
  },
  {
    id: '8',
    name: 'Trufa Negra',
    description: 'Molho branco, mozzarella de búfala, trufa negra e rúcula',
    priceG: 78.90,
    priceM: 68.90,
    priceP: 58.90,
    image: margheritaImage,
    category: 'especial',
    ingredients: ['molho branco', 'mozzarella de búfala', 'trufa negra', 'rúcula']
  },
  {
    id: '9',
    name: 'Vegana Suprema',
    description: 'Queijo vegano, tomate seco, azeitonas, rúcula e azeite trufado',
    priceG: 44.90,
    priceM: 34.90,
    priceP: 24.90,
    image: margheritaImage,
    category: 'vegetariana',
    ingredients: ['queijo vegano', 'tomate seco', 'azeitonas', 'rúcula', 'azeite trufado']
  },
  {
    id: '10',
    name: 'Banana com Canela',
    description: 'Banana caramelizada, canela, açúcar mascavo e leite condensado',
    priceG: 36.90,
    priceM: 26.90,
    priceP: 16.90,
    image: margheritaImage,
    category: 'doce',
    ingredients: ['banana caramelizada', 'canela', 'açúcar mascavo', 'leite condensado']
  }
];