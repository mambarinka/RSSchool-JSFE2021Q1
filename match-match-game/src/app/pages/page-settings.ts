import { BaseComponent } from '../../shared/base-component';

export class Settings extends BaseComponent {
  constructor() {
    super('div', ['settings__wrapper']);
    this.element.innerHTML = `
    <h2 class="settings__title">Game cards</h2>
    <label class="settings__label">select game cards type</label>
    <select class="settings__select" name="cards type">
    <option class="settings__option" value=""></option>
    <option class="settings__option" value="animals">animals</option>
    <option class="settings__option" value="cars">cars</option>
    </select>
  <h2 class="settings__title">Difficulty</h2>
  <label class="settings__label">select game type</label>
  <select class="settings__select" name="game type">
    <option class="settings__option" value=""></option>
    <option class="settings__option" value="4x4">4x4</option>
    <option class="settings__option" value="6x6">6x6</option>
    <option class="settings__option" value="8x8">8x8</option>
</select>
      `;
  }
}
