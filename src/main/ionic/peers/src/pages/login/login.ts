import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { AuthService } from '../../services/auth-service';
import { AppState } from "../../states/app-state";
import { HomePage } from "../home/home";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  registerCredentials = { email: '', password: '' };

  constructor(private nav: NavController,
              private auth: AuthService,
              private alertCtrl: AlertController,
              private appState: AppState) {
    auth.checkCurrentUser().subscribe(isValid => {
      console.log(isValid);
      if (isValid) {
        console.log("isvalid");
        this.nav.setRoot(HomePage);
      }
    })
  }

  public createAccount() {
    this.nav.push('RegisterPage');
  }

  public login() {
    this.appState.setIsLoading(true);
    this.auth.login(this.registerCredentials).subscribe(session => {
      this.appState.setIsLoading(false);
      if (session) {
        this.nav.setRoot(HomePage);
      } else {
        this.showError("Access Denied");
      }
    },
    error => {
      this.showError(error);
    });
  }

  /*public register() {
    this.auth.register(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        console.log("register succeed");
      } else {
        console.log("register failed");
      }
    }, error => {
      this.showError(error);
    });
  }*/

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
