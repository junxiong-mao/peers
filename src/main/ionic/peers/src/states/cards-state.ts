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
  private isFlippedSubject: BehaviorSubject<boolean>;
  public readonly isFlipped: Observable<boolean>;

  constructor(private cardsService: CardsService, private appState: AppState) {
    this.currentCardSubject = new BehaviorSubject(new Card(null, null, null, [], null));
    this.currentCard = this.currentCardSubject.asObservable();
    this.isMatchSubject = new BehaviorSubject(false);
    this.isMatch = this.isMatchSubject.asObservable();
    this.isFlippedSubject = new BehaviorSubject(false);
    this.isFlipped = this.isFlippedSubject.asObservable();
  }

  public initialize() {
    this.appState.setIsLoading(true);
    this.cardsService.getCards().then(response => {
      this.appState.setIsLoading(false);
      this.cards = response.data;
      this.cardIndex = 0;
      this.isMatchSubject.next(false);
      this.isFlippedSubject.next(false);
      this.currentCardSubject.next(this.cards[this.cardIndex]);
    });
  }

  public nextCard() {
    this.cardIndex++;
    this.isMatchSubject.next(false);
    this.isFlippedSubject.next(false);
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
      }
    );
  }

  public rejectCurrenCard() {
    this.cardsService.postDecision(this.currentCardSubject.getValue().id, 'REJECT');
    this.nextCard();
  }

  public flipCurrentCard() {
    this.isFlippedSubject.next(!this.isFlippedSubject.value);
  }
}
