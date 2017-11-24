import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CardsState } from "../../states/cards-state";
import { Subscription } from "rxjs/Subscription";
import { Card } from "../../models/card";
import { AlertController } from 'ionic-angular';
import { UserService } from "../../services/user-service";
import { AppState } from "../../states/app-state";
import { ENV } from "@app/env";

import { StackConfig } from 'angular2-swing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit, OnDestroy {

  isDev = false;

  private cardsSubscription: Subscription;
  private isMatchSubscription: Subscription;
  cards = [];
  stackConfig: StackConfig;

  constructor(public navCtrl: NavController,
              private cardsState: CardsState,
              private appState: AppState,
              private userService: UserService,
              private alertCtrl: AlertController) {
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  ngOnInit(): void {
    this.isDev = ENV.mode == 'Development' && location.origin.indexOf('localhost') !== -1;
    this.cardsState.initialize();
    this.cardsSubscription = this.cardsState.currentCard.subscribe(
      currentCard => {
        this.cards.pop();
        this.cards.push(currentCard);
      });
    this.isMatchSubscription = this.cardsState.isMatch.subscribe(
      isMatch => this.handleAlert(isMatch)
    );
  }

  ngOnDestroy(): void {
    this.cardsSubscription.unsubscribe();
    this.isMatchSubscription.unsubscribe();
  }

  likeCard() {
    this.cardsState.likeCurrenCard();
  }

  rejectCard() {
    this.cardsState.rejectCurrenCard();
  }

  private handleAlert(isMatch: boolean) {
    if (isMatch) {
      this.appState.setIsLoading(true);
      this.userService.getUser(this.cards[0].id).then(
        response => {
          this.appState.setIsLoading(false);
          let user = response.data;
          if (!user) {
            console.warn('user was null');
            return;
          }
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
                }
              },
              {
                text: 'Send Email',
                handler: () => {
                  console.log('Email clicked');
                  window.location.href = `mailto:${user.email}?subject=We%20got%20Peered!&body=Hi%20${user.firstName},`;
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

  onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.max(16*16 - abs, 16*8));
    let hexCode = this.decimalToHex(min, 2);

    console.log(abs, min, hexCode);

    if(x === 0) {
      color = '#FFFFFF'
    } else if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }

    console.log(color);

    let front = element.querySelector('div .front');
    let back = element.querySelector('div .back');
    front.style.background = color;
    back.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  }
}
