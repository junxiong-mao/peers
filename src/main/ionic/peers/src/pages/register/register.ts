import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth/auth-service';
import { HttpClient } from "@angular/common/http";
import { AppState } from "../../states/app-state";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {
  createSuccess = false;
  registerCredentials = {
    email: '',
    password: '',
    confirm_password: '',
    firstName: '',
    lastName: '',
    major: '',
    level: '',
    bio: '',
    interests: [],
  };

  interestsList = [];

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private http: HttpClient, private appState: AppState) {
  }

  ngOnInit(): void {
    const url = `${location.origin}/assets/academic-interests.json`;
    this.http.get(url).subscribe((l: Array<string>) => this.interestsList = l);
  }

  public register() {
    if (this.registerCredentials.password != this.registerCredentials.confirm_password) {
      this.showPopup("Error", "Passwords must be the same.");
    } else {

      this.auth.register(this.registerCredentials).subscribe(success => {
          if (success) {
            this.createSuccess = true;
            this.showPopup("Success", "Account created.");
          } else {
            this.showPopup("Error", "Problem creating account.");
          }
        },
        error => {
          this.showPopup("Error", error);
        });
    }
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  handleIllegalInterestInput(message: string) {
    this.appState.handleError('Tried to add non existing interest', message);
  }

  handleInterestsValueChange(interests: Array<string>) {
    this.registerCredentials.interests = interests;
  }
}
