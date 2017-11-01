import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CardsService } from "../services/cards-service";
import { Injectable } from "@angular/core";
import { Card } from "../models/card";

@Injectable()
export class CardsState {
  private cards = [];
  private cardIndex = 0;
  private currentCardSubject: BehaviorSubject<Card>;
  public readonly currentCard: Observable<Card>;

  //todo: add isFlipped card state

  constructor(private cardsService: CardsService) {
    this.currentCardSubject = new BehaviorSubject(new Card(null, null, [], null));
    this.currentCard = this.currentCardSubject.asObservable();
  }

  public initialize() {
    this.cardsService.getCards().subscribe(cards => {
      this.cards = cards;
      this.cardIndex = 0;
      this.currentCardSubject.next(cards[this.cardIndex]);
    });
  }

  private nextCard() {
    this.cardIndex++;
    if (this.cardIndex >= this.cards.length) {
      this.initialize();
    } else {
      this.currentCardSubject.next(this.cards[this.cardIndex]);
    }
  }

  public likeCurrenCard() {
    this.nextCard();
  }

  public rejectCurrenCard() {
    this.nextCard();
  }


}
