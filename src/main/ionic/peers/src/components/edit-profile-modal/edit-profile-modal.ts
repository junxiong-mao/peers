import { Component } from '@angular/core';
import {NavParams, Platform, ViewController} from 'ionic-angular';
import { MyProfile } from "../../pages/my-profile/my-profile";
import {UserState} from "../../states/user-state";

@Component({
  selector: 'edit-profile-modal',
  templateUrl: 'edit-profile-modal.html'
})
export class EditProfileModal {
  userInfo: any;

  private myProfile: MyProfile;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              private userState: UserState) {
    this.userInfo = params.get('user');
    this.myProfile = params.get("myProfile");
  }

  public save() {
    this.viewCtrl.dismiss(null);
  }

  public dismiss() {
    this.viewCtrl.dismiss(null);
  }

  public submitEditUser() {
    this.userInfo.interests = this.userInfo.interests.split(',');
    this.userState.updateUser(this.userInfo);
    this.dismiss();
  }
}
