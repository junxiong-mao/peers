import { Component } from '@angular/core';
import {NavParams, Platform, ViewController} from 'ionic-angular';
import {UserService} from "../../services/user-service";
import {AppState} from "../../states/app-state";
import { MyProfile } from "../../pages/my-profile/my-profile";
import {UserState} from "../../states/user-state";

@Component({
  selector: 'edit-profile-modal',
  templateUrl: 'edit-profile-modal.html'
})
export class EditProfileModal {
  data: any;
  userInfo = {
    firstName: '',
    lastName: '',
    level: '',
    major: '',
    interests: '',
    bio: '',
  };

  private myProfile: MyProfile;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              private userService: UserService,
              private appState: AppState,
              private userState: UserState) {
    this.userInfo.firstName = params.get("firstName");
    this.userInfo.lastName = params.get("lastName");
    this.userInfo.level = params.get("level");
    this.userInfo.major = params.get("major");
    this.userInfo.interests = params.get("interests");
    this.userInfo.bio = params.get("bio");
    this.myProfile = params.get("myProfile");
  }

  public save() {
    this.viewCtrl.dismiss(null);
  }

  public dismiss() {
    this.viewCtrl.dismiss(null);
  }

  public submitEditUser() {
    this.userState.updateUser(this.userInfo);
    this.dismiss();

  }
}
