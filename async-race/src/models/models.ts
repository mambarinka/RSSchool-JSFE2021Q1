export enum Path {
  garage = '/garage',
  engine = '/engine',
  winners = '/winners',
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface Car {
  name?: string;
  color?: string;
  id?: number;
  wins?: number;
  time?: number;
}

export class BaseComponent {
  element: HTMLElement;

  constructor(
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    innerHTML = ''
  ) {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    this.element.innerHTML = innerHTML;
  }
}

export class BaseComponentForm {
  readonly form: HTMLFormElement;

  constructor(styles: string[] = []) {
    this.form = document.createElement('form');
    this.form.classList.add(...styles);
  }
}

export class Input {
  readonly input: HTMLInputElement;

  constructor(styles: string[] = []) {
    this.input = document.createElement('input');
    this.input.classList.add(...styles);
  }
}

export class Button {
  button: HTMLButtonElement;

  constructor(styles: string[] = []) {
    this.button = document.createElement('button');
    this.button.classList.add(...styles);
  }
}


