import { BaseComponent } from './base-component';

export class Header extends BaseComponent {
  constructor() {
    super('header', ['page-header']);

    this.element.innerHTML = `
    <div class="page-header__wrapper">
    <a class="logo">
      <img
        class="logo__image"
        src="assets/images/logo.svg"
        width="80"
        height="39"
        alt="Logo of Match-Match-Game"
      />
    </a>
    <nav class="main-nav">
      <ul class="main-nav__list">
        <li class="main-nav__item">
          <a class="main-nav__link main-nav__link--current main-nav__link--about" href="/about-game">About Game</a>
        </li>
        <li class="main-nav__item">
          <a class="main-nav__link main-nav__link--score" href="/best-score">Best Score</a>
        </li>
        <li class="main-nav__item">
          <a class="main-nav__link main-nav__link--settings" href="/game-settings">Game Settings</a>
        </li>
      </ul>
    </nav>
    <button class="main-nav__toggle button" type="button">register new player</button>
  </div>
    `;
  }
}
