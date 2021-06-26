export interface Category {
  value: string;
}

export interface IMainState {
  categories: Category[];
}

export const initialState: IMainState = {
  categories: [
    { value: "fruits" },
    { value: "animals" },
    { value: "body-parts" },
    { value: "clothes" },
    { value: "colors" },
    { value: "profession" },
    { value: "emotion" },
    { value: "numbers" },
  ],
};

export const mainSelector: (state: { main: IMainState }) => IMainState =
  (state: { main: IMainState }) => state.main;

export function main(state = initialState): IMainState {
  return state;
}
