export type Category = 'hot-drinks' | 'cold-drinks' | 'meals' | 'desserts';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  featured?: boolean;
  aiHint?: string;
}
