import { shuffleArray } from '@/helpers/utils';

export interface Category {
  value: string;
  cards: string[];
  translate: string[];
  shuffleCards: string[];
}

export interface IMainState {
  categories: {
    [key: string]: Category;
  };
}

export const initialState: IMainState = {
  categories: {
    fruits: {
      value: 'fruits',
      cards: ['apple', 'banana', 'orange', 'grapes', 'watermelon', 'pineapple', 'kiwi', 'peach'],
      translate: ['яблоко', 'банан', 'апельсин', 'виноград', 'арбуз', 'ананас', 'киви', 'персик'],
      shuffleCards: shuffleArray(['apple', 'banana', 'orange', 'grapes', 'watermelon', 'pineapple', 'kiwi', 'peach']),
    },
    animals: {
      value: 'animals',
      cards: ['cat', 'monkey', 'penguin', 'elephant', 'bear', 'zebra', 'wolf', 'panda'],
      translate: ['кошка', 'обезьяна', 'пингвин', 'слон', 'медведь', 'зебра', 'волк', 'панда'],
      shuffleCards: shuffleArray(['cat', 'monkey', 'penguin', 'elephant', 'bear', 'zebra', 'wolf', 'panda']),
    },
    bodyParts: {
      value: 'body-parts',
      cards: ['ear', 'hand', 'knee', 'leg', 'head', 'finger', 'eye', 'neck'],
      translate: ['ухо', 'рука', 'коленка', 'нога', 'голова', 'палец', 'глаз', 'neck'],
      shuffleCards: shuffleArray(['ear', 'hand', 'knee', 'leg', 'head', 'finger', 'eye', 'neck']),
    },
    clothes: {
      value: 'clothes',
      cards: ['hat', 'dress', 'socks', 'tie', 'trousers', 'shirt', 'skirt', 'swimsuit'],
      translate: ['шляпа', 'платье', 'носки', 'галстук', 'штаны', 'рубашка', 'юбка', 'купальник'],
      shuffleCards: shuffleArray(['hat', 'dress', 'socks', 'tie', 'trousers', 'shirt', 'skirt', 'swimsuit']),
    },
    colors: {
      value: 'colors',
      cards: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'white', 'brown'],
      translate: ['красный', 'оранжевый', 'желтый', 'зеленый', 'синий', 'фиолетовый', 'белый', 'коричневый'],
      shuffleCards: shuffleArray(['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'white', 'brown']),
    },
    profession: {
      value: 'profession',
      cards: ['ballerina', 'builder', 'clown', 'conductor', 'doctor', 'pilot', 'politician', 'teacher'],
      translate: ['балерина', 'строитель', 'клоун', 'дирижер', 'врач', 'пилот', 'политик', 'учитель'],
      shuffleCards: shuffleArray([
        'ballerina',
        'builder',
        'clown',
        'conductor',
        'doctor',
        'pilot',
        'politician',
        'teacher',
      ]),
    },
    emotion: {
      value: 'emotion',
      cards: ['angry', 'hurt', 'joy', 'laugh', 'sadness', 'surprise', 'tiredness', 'love'],
      translate: ['злость', 'боль', 'радость', 'смех', 'печаль', 'удивление', 'усталость', 'влюбленность'],
      shuffleCards: shuffleArray(['angry', 'hurt', 'joy', 'laugh', 'sadness', 'surprise', 'tiredness', 'love']),
    },
    numbers: {
      value: 'numbers',
      cards: ['eight', 'four', 'nine', 'one', 'seven', 'six', 'three', 'two'],
      translate: ['восемь', 'четыре', 'девять', 'один', 'семь', 'шесть', 'три', 'два'],
      shuffleCards: shuffleArray(['eight', 'four', 'nine', 'one', 'seven', 'six', 'three', 'two']),
    },
  },
};

export const mainSelector: (state: { main: IMainState }) => IMainState = (state: { main: IMainState }) => state.main;

export function main(state = initialState): IMainState {
  return state;
}

// { value: 'fruits' },
// { value: 'animals' },
// { value: 'body-parts' },
// { value: 'clothes' },
// { value: 'colors' },
// { value: 'profession' },
// { value: 'emotion' },
// { value: 'numbers' },
