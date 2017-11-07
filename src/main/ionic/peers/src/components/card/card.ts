import { Component } from '@angular/core';

/**
 * Generated class for the CardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'card',
  templateUrl: 'card.html'
})
export class CardComponent {

  isFlipped = false;

  constructor() {
  }

  doFlip() {
    this.isFlipped = !this.isFlipped;
  }

}
