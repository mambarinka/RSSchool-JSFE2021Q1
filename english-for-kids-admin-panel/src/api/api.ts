import { Category } from '@/models/models';

const CATEGORIES = 'categories';
const CARDS = 'cards';

const url = (endpoint: string) => `http://localhost:3000/api/${endpoint}`;

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${url(CATEGORIES)}`);
  return response.json();
};

export const getCategoryByName = async (categoryName: string): Promise<Category | undefined> => {
  const response = await fetch(`${url(CATEGORIES)}/${categoryName}`);
  return response.json();
};
