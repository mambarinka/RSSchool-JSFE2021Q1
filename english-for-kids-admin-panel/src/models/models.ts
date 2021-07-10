export interface Category {
  name: string;
  image: string;
}

export interface Card {
  categoryName: string;
  name: string;
  translate: string;
  image?: string;
  audio?: string;
  trainMode: {
    clicks: 0;
  };
  playMode: {
    successClicks: 0;
    errorClicks: 0;
  };
  correctPerсent: 0;
}
