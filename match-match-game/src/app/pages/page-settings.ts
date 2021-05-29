import { SettingsLabel } from '../../components/settings-label';
import { SettingsOption } from '../../components/settings-option';
import { SettingsSelect } from '../../components/settings-select';
import { SettingsTitle } from '../../components/settings-title';
import { BaseComponent } from '../../shared/base-component';
import db from '../app';
import { Settings } from '../app.api';

export class PageSettings extends BaseComponent {
  private readonly cardsTypes: string[];
  private readonly gameTypes: string[];
  titleSettingsCards: SettingsTitle;
  titleSettingsGame: SettingsTitle;
  labelSettingsCards: SettingsLabel;
  labelSettingsGame: SettingsLabel;
  selectSettingsCards: SettingsSelect;
  selectSettingsGame: SettingsSelect;

  constructor() {
    super('div', ['settings__wrapper']);


    this.cardsTypes = ['', 'animals', 'cars'];
    this.gameTypes = ['', '4x4', '6x6', '8x8'];

    this.titleSettingsCards = new SettingsTitle();
    this.titleSettingsCards.element.textContent = 'Game cards';
    this.labelSettingsCards = new SettingsLabel();
    this.labelSettingsCards.label.textContent = 'select game cards type';
    this.selectSettingsCards = new SettingsSelect('cards');

    this.titleSettingsGame = new SettingsTitle();
    this.titleSettingsGame.element.textContent = 'Difficulty';
    this.labelSettingsGame = new SettingsLabel();
    this.labelSettingsGame.label.textContent = 'select game type';
    this.selectSettingsGame = new SettingsSelect('game');

    for (let i = 0; i < this.cardsTypes.length; i++) {
      const optionSettingsCards: SettingsOption = new SettingsOption(this.cardsTypes[i]);
      this.selectSettingsCards.select.append(optionSettingsCards.option);
    }

    for (let i = 0; i < this.gameTypes.length; i++) {
      const optionSettingsGame: SettingsOption = new SettingsOption(this.gameTypes[i]);
      this.selectSettingsGame.select.append(optionSettingsGame.option);
    }

    this.element.append(
      this.titleSettingsCards.element,
      this.labelSettingsCards.label,
      this.selectSettingsCards.select,
      this.titleSettingsGame.element,
      this.labelSettingsGame.label,
      this.selectSettingsGame.select
    )

    this.selectSettingsCards.select.addEventListener('change', () => this.selectHandler());
    this.selectSettingsGame.select.addEventListener('change', () => this.selectHandler());


    //  db.init('mambarinka').then(() => {
    //   db.readAll('Settings').then(arr => {
    //     this.selectSettingsCards.select.value = arr[0].gameCardsType;
    //     this.selectSettingsGame.select.value = arr[0].gameDifficultyType;


    //   //   arr[0].gameCardsType;
    //   //  arr[0].gameDifficultyType;

    //   })
    // })
  }

  selectHandler() {
    db.write(this.getSettingsObject(), 'Settings');
  }

  getSettingsObject(): Settings {
    const settingsObject: Settings = {
      gameCardsType: '',
      gameDifficultyType: ''
    }
    settingsObject.gameCardsType = this.selectSettingsCards.select.value;
    settingsObject.gameDifficultyType = this.selectSettingsGame.select.value;

    return settingsObject;
  }
}
