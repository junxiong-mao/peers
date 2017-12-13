import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth/auth-service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { email: '', password: '', confirm_password: '', firstName: '', lastName: '', major: '', level: '', bio: '', interests: [], };

  interestsList;

  // bio: max length 500 chars
  // interests: "A_B_C"
  // except for email, all other attributes must be prefixed with "custom:"

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private http: HttpClient) { }

  ngOnInit(): void {
    const url = `${location.origin}/assets/academic-interests.json`;
    this.interestsList = this.http.get(url);
  }

  public register() {
    if(this.registerCredentials.password != this.registerCredentials.confirm_password){
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

  public requestAutocompleteItems = (text: string) : Observable<Response> => {
    return this.interestsList;
  }

}
