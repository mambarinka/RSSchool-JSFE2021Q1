import { BaseComponent } from '../shared/base-component';

export class Footer extends BaseComponent {
  constructor() {
    super('footer', ['footer']);

    this.element.innerHTML = `
    <div class='footer__wrapper'>
    <a class='footer__link footer__link--github' href='https://github.com/mambarinka' target='_blank'
      rel='noopener noreferrer'>mambarinka</a>
    <a class='footer__link footer__link--rsschool' href='https://rs.school/js/' target='_blank'
      rel='noopener noreferrer'>
      <span class='footer__link-year'>'21</span>
    </a>
  </div>
    `;
  }
}
