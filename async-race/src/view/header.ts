import { BaseComponent } from '../models/base-component';
import { Link } from '../models/base-component-link';

export class Header extends BaseComponent {
  private readonly garageLink: Link;
  private readonly winnersLink: Link;
  private readonly garage: BaseComponent;
  private readonly winners: BaseComponent;
  constructor(garage: BaseComponent, winners: BaseComponent) {
    super('header', ['page-header']);
    this.garageLink = new Link(['page-header__button', 'button']);
    this.garageLink.link.textContent = 'to garage';
    this.winnersLink = new Link(['page-header__button', 'button']);
    this.winnersLink.link.textContent = 'to winners';

    this.garage = garage;
    this.winners = winners;

    this.element.append(
      this.garageLink.link,
      this.winnersLink.link,
    )

    this.garageLink.link.addEventListener('click', () => {
      this.garageLinkHandler();
    })

    this.winnersLink.link.addEventListener('click', () => {
      this.winnersLinkHandler();
    })
  }

  garageLinkHandler = () => {
    this.garage.element.style.display= 'block';
    this.winners.element.style.display= 'none';
  }

  winnersLinkHandler = () => {
    this.garage.element.style.display= 'none';
    this.winners.element.style.display= 'block';
  }
}
