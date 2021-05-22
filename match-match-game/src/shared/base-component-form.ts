export class BaseComponentForm {
  readonly form: HTMLFormElement;

  constructor(styles: string[] = []) {
    this.form = document.createElement('form');
    this.form.classList.add(...styles);
  }
}
