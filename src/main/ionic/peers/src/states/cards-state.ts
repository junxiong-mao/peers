import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CardsService } from "../services/cards-service";
import { Injectable } from "@angular/core";
import { Card } from "../models/card";
import { AlertController } from 'ionic-angular';



@Injectable()
export class CardsState {
  private cards = [];
  private cardIndex = 0;
  private currentCardSubject: BehaviorSubject<Card>;
  public readonly currentCard: Observable<Card>;
  

  //todo: add isFlipped card state

  constructor(private cardsService: CardsService, private alertCtrl: AlertController) {
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
    // Write to database and get response.
    if (true) {
      // If there is a match. For now, I assume true all the time.
      let alert = this.alertCtrl.create({
      title: 'You have a match!',
      message: 'Junxiong Mao: Graduate student at UCSD<br/>Interests: CS, AI, ML<br/>Email: jum029@eng.ucsd.edu',
      buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Email',
            handler: () => {
              console.log('Email clicked');
            }
          }
        ]
      });
      alert.present();
    }
    
    this.nextCard();
  }

  public rejectCurrenCard() {
    this.nextCard();
  }

  
}
