import { IAnimalAction, SET_ERROR_CLICK, SET_SUCCESS_CLICK, SET_TRAIN_CLICK } from './actions';

export interface Card {
  value: string;
  translate: string;
  trainMode: {
    clicks: number;
  };
  playMode: {
    successClicks: number;
    errorClicks: number;
  };
}

export interface Category {
  [key: string]: Card[];
}

export interface IStatisticsState {
  categoriesStat: Category;
}

export const initialState: IStatisticsState = {
  categoriesStat: {
    fruits: [
      {
        value: 'apple',
        translate: 'яблоко',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'banana',
        translate: 'банан',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'orange',
        translate: 'апельсин',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'grapes',
        translate: 'виноград',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'watermelon',
        translate: 'арбуз',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'pineapple',
        translate: 'ананас',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'kiwi',
        translate: 'киви',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'peach',
        translate: 'персик',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
    ],
    animals: [
      {
        value: 'cat',
        translate: 'кошка',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'monkey',
        translate: 'обезьяна',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'penguin',
        translate: 'пингвин',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'elephant',
        translate: 'слон',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'bear',
        translate: 'медведь',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'zebra',
        translate: 'зебра',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'wolf',
        translate: 'волк',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'panda',
        translate: 'панда',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
    ],
    'body-parts': [
      {
        value: 'ear',
        translate: 'ухо',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'hand',
        translate: 'рука',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'knee',
        translate: 'коленка',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'leg',
        translate: 'нога',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'head',
        translate: 'голова',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'finger',
        translate: 'палец',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'eye',
        translate: 'глаз',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'neck',
        translate: 'neck',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
    ],
    clothes: [
      {
        value: 'hat',
        translate: 'шляпа',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'dress',
        translate: 'платье',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'socks',
        translate: 'носки',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'tie',
        translate: 'галстук',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'trousers',
        translate: 'штаны',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'shirt',
        translate: 'рубашка',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'skirt',
        translate: 'юбка',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'swimsuit',
        translate: 'купальник',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
    ],
    colors: [
      {
        value: 'red',
        translate: 'красный',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'orange',
        translate: 'оранжевый',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'yellow',
        translate: 'желтый',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'green',
        translate: 'зеленый',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'blue',
        translate: 'синий',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'purple',
        translate: 'фиолетовый',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'white',
        translate: 'белый',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'brown',
        translate: 'коричневый',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
    ],
    profession: [
      {
        value: 'ballerina',
        translate: 'балерина',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'builder',
        translate: 'строитель',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'clown',
        translate: 'клоун',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'conductor',
        translate: 'дирижер',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'doctor',
        translate: 'врач',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'pilot',
        translate: 'пилот',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'politician',
        translate: 'политик',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'teacher',
        translate: 'учитель',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
    ],
    emotion: [
      {
        value: 'angry',
        translate: 'злость',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'hurt',
        translate: 'боль',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'joy',
        translate: 'радость',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'laugh',
        translate: 'смех',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'sadness',
        translate: 'печаль',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'surprise',
        translate: 'удивление',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'tiredness',
        translate: 'усталость',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'love',
        translate: 'влюбленность',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
    ],
    numbers: [
      {
        value: 'eight',
        translate: 'восемь',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'four',
        translate: 'четыре',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'nine',
        translate: 'девять',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'one',
        translate: 'один',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'seven',
        translate: 'семь',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'six',
        translate: 'шесть',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'three',
        translate: 'три',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
      {
        value: 'two',
        translate: 'два',
        trainMode: {
          clicks: 0,
        },
        playMode: {
          successClicks: 0,
          errorClicks: 0,
        },
      },
    ],
  },
};

export const statisticsSelector: (state: { statistics: IStatisticsState }) => IStatisticsState = (state: {
  statistics: IStatisticsState;
}) => state.statistics;

export function statistics(state = initialState, action: IAnimalAction): IStatisticsState {
  switch (action.type) {
    case SET_SUCCESS_CLICK: {
      const {
        payload: { category, card },
      } = action;
      const curentCard = state.categoriesStat[category].find((item: { value: string }) => item.value === card);

      state.categoriesStat[category].map((item: { value: string }) =>
        item.value === card
          ? {
              ...item,
              playMode: {
                successClicks: curentCard!.playMode.successClicks++,
                errorClicks: curentCard!.playMode.errorClicks,
              },
            }
          : item
      );

      return {
        ...state,
      };
    }

    case SET_ERROR_CLICK: {
      const {
        payload: { category, card },
      } = action;
      const curentCard = state.categoriesStat[category].find((item: { value: string }) => item.value === card);

      state.categoriesStat[category].map((item: { value: string }) =>
        item.value === card
          ? {
              ...item,
              playMode: {
                successClicks: curentCard!.playMode.successClicks,
                errorClicks: curentCard!.playMode.errorClicks++,
              },
            }
          : item
      );

      return {
        ...state,
      };
    }

    case SET_TRAIN_CLICK: {
      const {
        payload: { category, card },
      } = action;
      console.log(category);
      const curentCard = state.categoriesStat[category].find((item: { value: string }) => item.value === card);

      state.categoriesStat[category].map((item: { value: string }) =>
        item.value === card
          ? {
              ...item,
              trainMode: {
                clicks: curentCard!.trainMode.clicks++,
              },
            }
          : item
      );

      return {
        ...state,
      };
    }

    default:
      return state;
  }
}
