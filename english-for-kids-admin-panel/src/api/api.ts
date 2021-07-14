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

export const createCategory1 = async (category: FormData): Promise<Category> => {
  console.log(url(CATEGORIES));
  const response = await fetch(`${url(CATEGORIES)}`, {
    method: 'POST',
    mode: 'cors',
    /* headers: {
      "Content-Type": "application/json",
    }, */
    headers: {
      'Content-Type': 'multipart/form-data; boundary=something',
      //   /* Accept: "multipart/form-data; boundary=something", */
    },
    body: JSON.stringify(category),
  });
  const dataCategory = await response.json();
  return dataCategory;
};
