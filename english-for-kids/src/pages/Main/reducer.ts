export interface Category {
  value: string;
  cards: string[];
  translate: string[];
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
    },
    animals: {
      value: 'animals',
      cards: ['cat', 'monkey', 'penguin', 'elephant', 'bear', 'zebra', 'wolf', 'panda'],
      translate: ['кошка', 'обезьяна', 'пенгвин', 'слон', 'медведь', 'зебра', 'волк', 'panda'],
    },
    bodyParts: {
      value: 'body-parts',
      cards: ['ear', 'hand', 'knee', 'leg', 'head', 'finger', 'eye', 'neck'],
      translate: ['ухо', 'рука', 'коленка', 'нога', 'голова', 'палец', 'глаз', 'шея'],
    },
    clothes: {
      value: 'clothes',
      cards: ['hat', 'dress', 'socks', 'tie', 'trousers', 'shirt', 'skirt', 'swimsuit'],
      translate: ['шляпа', 'платье', 'носки', 'галстук', 'штаны', 'рубашка', 'юбка', 'купальник'],
    },
    colors: {
      value: 'colors',
      cards: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'white', 'brown'],
      translate: ['красный', 'оранжевый', 'желтый', 'зеленый', 'синий', 'фиолетовый', 'белый', 'коричневый'],
    },
    profession: {
      value: 'profession',
      cards: ['ballerina', 'builder', 'clown', 'conductor', 'doctor', 'pilot', 'politician', 'teacher'],
      translate: ['балерина', 'строитель', 'клоун', 'дирижер', 'врач', 'пилот', 'политик', 'учитель'],
    },
    emotion: {
      value: 'emotion',
      cards: ['angry', 'hurt', 'joy', 'laugh', 'sadness', 'surprise', 'tiredness', 'love'],
      translate: ['злость', 'боль', 'радость', 'смех', 'печаль', 'удивление', 'усталость', 'влюбленность'],
    },
    numbers: {
      value: 'numbers',
      cards: ['eight', 'four', 'nine', 'one', 'seven', 'six', 'three', 'two'],
      translate: ['восемь', 'четыре', 'девять', 'один', 'семь', 'шесть', 'три', 'два'],
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
