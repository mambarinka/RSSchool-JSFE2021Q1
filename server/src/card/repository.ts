import { Card } from './card';

const cards: Card[] = [
  {
    categoryName: 'fruits',
    name: 'apple',
    translate: 'яблоко',
    image: '../../english-for-kids/data/images/cards/fruits/apple.png',
    audio: '../../english-for-kids/data/audio/cards/fruits/apple.mp3',
    trainMode: {
      clicks: 0
    },
    playMode: {
      successClicks: 0,
      errorClicks: 0,
    },
    correctPerсent: 0,
  },
  {
    categoryName: 'fruits',
    name: 'banana',
    translate: 'банан',
    image: '../../english-for-kids/data/images/cards/fruits/banana.png',
    audio: '../../english-for-kids/data/audio/cards/fruits/banana.mp3',
    trainMode: {
      clicks: 0
    },
    playMode: {
      successClicks: 0,
      errorClicks: 0,
    },
    correctPerсent: 0,
  },
];

export function getCards(): Promise<Card[]> {
  return Promise.resolve<Card[]>(cards);
}

export function getCardByName(name: string): Promise<Card | undefined> {
  return Promise.resolve(cards.find((it) => it.name.toLowerCase() === name.toLowerCase()));
}

// export function createItem(card: Card): Promise<Card> {
//   const isExist = typeof cards.find((it) => it.name.toLowerCase() === card.name.toLowerCase()) !== 'undefined';
//   if (isExist) {
//     return Promise.reject(new Error(`Card with name ${card.name} is already exists.`));
//   }
//   cards.push(card);
//   return Promise.resolve(card);
// }

// export function updateItem(card: Card): Promise<Card> {
//   const itemIndex = cards.findIndex((it) => it.name.toLowerCase() === card.name.toLowerCase());
//   if (itemIndex < 0) {
//     return Promise.reject(new Error('Card not found'));
//   }
//   const existsCard = cards.splice(itemIndex, 1)[0];
//   const newCard: Card = {
//     ...existsCard,
//     ...card,
//   };
//   cards.push(newCard);
//   return Promise.resolve(newCard);
// }

// export function deleteItem(name: string): Promise<void> {
//   const index = cards.findIndex((it) => it.name.toLowerCase() === name.toLowerCase());
//   if (index < 0) {
//     Promise.reject(new Error('Card not found.'));
//   }
//   cards.splice(index, 1);
//   return Promise.resolve();
// }