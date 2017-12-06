import { Component } from '@angular/core';
import {ViewController, IonicPage, Platform, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'modal-with-inputs.html'
})
export class ModalWithInputs {
  data: any;
  firstName: string;
  lastName: string;
  level: string;
  major: string;
  interests: string;
  bio: string;
  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController) {
    this.firstName = params.get("firstName");
    this.lastName = params.get("lastName");
    this.level = params.get("level");
    this.major = params.get("major");
    this.interests = params.get("interests");
    this.bio = params.get("bio");
  }

  public save() {
    this.viewCtrl.dismiss(this.data);
  }

  public dismiss() {
    this.viewCtrl.dismiss(null);
  }
  public submitEditUser() {

  }
}
