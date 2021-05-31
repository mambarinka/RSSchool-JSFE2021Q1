export interface ImageCategoryModel {
  category: string;
  images: string[];
}

export interface Component {
  render(): HTMLElement;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  bestScore: number;
  id?: IDBValidKey;
}

export interface Settings {
  gameCardsType: string;
  gameDifficultyType: string;
  // id?: IDBValidKey
}
