import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CardsState } from "../../states/cards-state";
import { Subscription } from "rxjs/Subscription";
import { Card } from "../../models/card";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit, OnDestroy {
  currentCard: Card;
  cardsSubscription: Subscription;

  constructor(public navCtrl: NavController, private cardsState: CardsState) {
  }

  ngOnInit(): void {
    this.cardsState.initialize();
    this.cardsSubscription = this.cardsState.currentCard.subscribe(
      currentCard => this.currentCard = currentCard);
  }

  ngOnDestroy(): void {
    this.cardsSubscription.unsubscribe();
  }
}
