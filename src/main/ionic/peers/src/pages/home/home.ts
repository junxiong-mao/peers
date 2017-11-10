import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CardsState } from "../../states/cards-state";
import { Subscription } from "rxjs/Subscription";
import { Card } from "../../models/card";
import { AlertController } from 'ionic-angular';
import { UserService } from "../../services/user-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit, OnDestroy {
  currentCard: Card;
  private cardsSubscription: Subscription;
  private isMatchSubscription: Subscription;

  constructor(public navCtrl: NavController, private cardsState: CardsState, private userService: UserService, private alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    this.cardsState.initialize();
    this.cardsSubscription = this.cardsState.currentCard.subscribe(
      currentCard => this.currentCard = currentCard);
    this.isMatchSubscription = this.cardsState.isMatch.subscribe(
      isMatch => this.handleAlert(isMatch)
    );
  }

  ngOnDestroy(): void {
    this.cardsSubscription.unsubscribe();
    this.isMatchSubscription.unsubscribe();
  }

  likeBtnClick() {
    this.cardsState.likeCurrenCard();
  }

  passBtnClick() {
    this.cardsState.rejectCurrenCard();
  }

  private handleAlert(isMatch: boolean) {
    if (isMatch) {
      this.userService.getUser(this.currentCard.id).subscribe(
        user => {
          let alert = this.alertCtrl.create({
            title: 'You have a match!',
            message: `
              <img class="user-photo" src="${user.photoUrl}" />
              <h3>${this.capitalize(user.firstName)} ${this.capitalize(user.lastName)}</h3>
              <b>Major:</b><br/>
              ${user.major}<br/><br/>
              <b>Level:</b><br/>
              ${user.level}<br/><br/>
              <b>Interests:</b><br/>
              ${user.interests}<br/>
            `,
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  console.log('Cancel clicked');
                  this.cardsState.nextCard();
                }
              },
              {
                text: 'Send Email',
                handler: () => {
                  console.log('Email clicked');
                  window.location.href = `mailto:${user.email}?subject=We%20got%20Peered!&body=Hi%20${user.firstName},`;
                  this.cardsState.nextCard();
                }
              }
            ]
          });
          alert.present();
        });
    }
  }

  private capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }
}
