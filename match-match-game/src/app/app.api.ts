export interface ImageCategoryModel {
  category: string;
  images: string[];
}

export interface Component {
  render(): HTMLElement;
}

export type RootElement = HTMLElement | null;

export interface CounterService {
  increment(): void;
  // subscribeOnCounter(callback: Function): number;
}

export interface User {
  // id: number,
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  bestScore: number
}
