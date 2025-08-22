import { Pizza } from '@/types/pizza';
import margheritaImage from '@/assets/margherita-pizza.jpg';
import pepperoniImage from '@/assets/pepperoni-pizza.jpg';

export const pizzas: Pizza[] = [
  {
    id: '1',
    name: 'Margherita',
    description: 'Molho de tomate, mozzarella fresca, manjericão e azeite extra virgem',
    price: 42.90,
    image: margheritaImage,
    category: 'tradicional',
    ingredients: ['molho de tomate', 'mozzarella fresca', 'manjericão', 'azeite extra virgem'],
    popular: true
  },
  {
    id: '2',
    name: 'Pepperoni',
    description: 'Molho de tomate, mozzarella, pepperoni italiano e orégano',
    price: 48.90,
    image: pepperoniImage,
    category: 'tradicional',
    ingredients: ['molho de tomate', 'mozzarella', 'pepperoni italiano', 'orégano'],
    popular: true
  },
  {
    id: '3',
    name: 'Quattro Stagioni',
    description: 'Presunto, cogumelos, alcachofras, azeitonas e mozzarella',
    price: 54.90,
    image: margheritaImage,
    category: 'especial',
    ingredients: ['presunto', 'cogumelos', 'alcachofras', 'azeitonas', 'mozzarella']
  },
  {
    id: '4',
    name: 'Vegetariana',
    description: 'Abobrinha, berinjela, pimentão, cebola roxa, tomate cereja e rúcula',
    price: 46.90,
    image: margheritaImage,
    category: 'vegetariana',
    ingredients: ['abobrinha', 'berinjela', 'pimentão', 'cebola roxa', 'tomate cereja', 'rúcula']
  },
  {
    id: '5',
    name: 'Portuguesa',
    description: 'Presunto, ovos, cebola, azeitonas, mozzarella e orégano',
    price: 52.90,
    image: pepperoniImage,
    category: 'tradicional',
    ingredients: ['presunto', 'ovos', 'cebola', 'azeitonas', 'mozzarella', 'orégano'],
    popular: true
  },
  {
    id: '6',
    name: 'Nutella com Morango',
    description: 'Nutella cremosa, morangos frescos e açúcar de confeiteiro',
    price: 38.90,
    image: margheritaImage,
    category: 'doce',
    ingredients: ['nutella', 'morangos frescos', 'açúcar de confeiteiro']
  },
  {
    id: '7',
    name: 'Calabresa Especial',
    description: 'Calabresa artesanal, cebola caramelizada, pimentão e mozzarella',
    price: 49.90,
    image: pepperoniImage,
    category: 'tradicional',
    ingredients: ['calabresa artesanal', 'cebola caramelizada', 'pimentão', 'mozzarella']
  },
  {
    id: '8',
    name: 'Trufa Negra',
    description: 'Molho branco, mozzarella de búfala, trufa negra e rúcula',
    price: 78.90,
    image: margheritaImage,
    category: 'especial',
    ingredients: ['molho branco', 'mozzarella de búfala', 'trufa negra', 'rúcula']
  },
  {
    id: '9',
    name: 'Vegana Suprema',
    description: 'Queijo vegano, tomate seco, azeitonas, rúcula e azeite trufado',
    price: 44.90,
    image: margheritaImage,
    category: 'vegetariana',
    ingredients: ['queijo vegano', 'tomate seco', 'azeitonas', 'rúcula', 'azeite trufado']
  },
  {
    id: '10',
    name: 'Banana com Canela',
    description: 'Banana caramelizada, canela, açúcar mascavo e leite condensado',
    price: 36.90,
    image: margheritaImage,
    category: 'doce',
    ingredients: ['banana caramelizada', 'canela', 'açúcar mascavo', 'leite condensado']
  }
];