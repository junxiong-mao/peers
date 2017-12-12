import { Component } from '@angular/core';
import {NavParams, Platform, ViewController} from 'ionic-angular';
import { MyProfile } from "../../pages/my-profile/my-profile";
import {UserState} from "../../states/user-state";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'edit-profile-modal',
  templateUrl: 'edit-profile-modal.html'
})

export class EditProfileModal {
  userInfo: any;
  private myProfile: MyProfile;
  private interestsList: any;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              private userState: UserState,
              private http: HttpClient) {
    const url = `${location.origin}/assets/academic-interests.json`;
    this.userInfo = params.get('user');
    this.myProfile = params.get("myProfile");
    this.interestsList = this.http.get(url);
  }

  public save() {
    this.viewCtrl.dismiss(null);
  }

  public dismiss() {
    this.viewCtrl.dismiss(null);
  }

  public submitEditUser() {
    this.userInfo.interests = this.userInfo.interests.map(i => {
      if (typeof i == "string") {
        return i;
      } else {
        return i.value;
      }
    });
    this.userState.updateUser(this.userInfo);
    this.dismiss();
  }

  public requestAutocompleteItems = (text: string) : Observable<Response> => {
    return this.interestsList;
  }
}
