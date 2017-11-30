import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CardsService } from "../services/cards-service";
import { Injectable } from "@angular/core";
import { Card } from "../models/card";
import { AppState } from "./app-state";

@Injectable()
export class CardsState {
  private cards = [];
  private cardIndex = 0;
  private currentCardSubject: BehaviorSubject<Card>;
  public readonly currentCard: Observable<Card>;
  private isMatchSubject: BehaviorSubject<boolean>;
  public readonly isMatch: Observable<boolean>;

  //todo: add isFlipped card state

  constructor(private cardsService: CardsService, private appState: AppState) {
    this.currentCardSubject = new BehaviorSubject(new Card(null, null, null, [], null));
    this.currentCard = this.currentCardSubject.asObservable();
    this.isMatchSubject = new BehaviorSubject(false);
    this.isMatch = this.isMatchSubject.asObservable();
  }

  public initialize() {
    // this.isErrorSubject.next(false);
    this.appState.setIsLoading(true);
    this.cardsService.getCards()
      .then(response => {
        this.appState.setIsLoading(false);
        this.cards = response.data;
        this.cardIndex = 0;
        this.currentCardSubject.next(this.cards[this.cardIndex]);
        this.isMatchSubject.next(false);
      })
      .catch(err => this.appState.handleError(err));
  }

  public nextCard() {
    this.cardIndex++;
    this.isMatchSubject.next(false);
    if (this.cardIndex >= this.cards.length) {
      this.initialize();
    } else {
      this.currentCardSubject.next(this.cards[this.cardIndex]);
    }
  }

  public likeCurrenCard() {
    this.appState.setIsLoading(true);
    this.cardsService.postDecision(this.currentCardSubject.getValue().id, 'LIKE').then(
      response => {
        this.isMatchSubject.next(response.data);
        this.appState.setIsLoading(false);
        this.nextCard();
      })
      .catch(err => this.appState.handleError(err));
  }

  public rejectCurrenCard() {
    this.cardsService.postDecision(this.currentCardSubject.getValue().id, 'REJECT')
      .catch(err => this.appState.handleError(err));
    this.nextCard();
  }
}
