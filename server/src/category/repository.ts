import { Category } from './category';

const categories: Category[] = [
  {
    name: 'fruits',
    image: '/images/categories/fruits.png',
  },
  {
    name: 'animals',
    image: '/images/categories/fruits.png',
  },
];

// const newId = (function () {
//   let id = categories.length;
//   return () => id++;
// })();

export function getCategories(): Promise<Category[]> {
  return Promise.resolve<Category[]>(categories);
}

export function getCategoryByName(categoryName: string): Promise<Category | undefined> {
  return Promise.resolve(categories.find((cat) => cat.name === categoryName));
}

// export function createCategory(category: Category): Promise<Category> {
//   const isExist = typeof categories
//     .find((cat) => cat.name.toLowerCase() === category.name.toLowerCase()) !== 'undefined';
//   if (isExist) {
//     return Promise.reject(new Error(`Category with name ${category.name} is already exists`));
//   }

//   // const id = categories.length + 1;
//   const model = { ...category, id: newId() };
//   categories.push(model);

//   return Promise.resolve(model);
// }

// export function deleteCategory(id: number): Promise<void> {
//   const index = categories.findIndex((cat) => cat.id === id);
//   if (index < 0) {
//     Promise.reject(new Error('Category not found'));
//   }
//   categories.splice(index, 1);
//   return Promise.resolve();
// }