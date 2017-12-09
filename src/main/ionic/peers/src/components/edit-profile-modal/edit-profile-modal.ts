import { Component } from '@angular/core';
import {NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {UserService} from "../../services/user-service";
import {AppState} from "../../states/app-state";
import { MyProfile } from "../../pages/my-profile/my-profile";

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
              private nav: NavController) {
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
    this.appState.setIsLoading(true);
    this.userService.updateUser(this.userInfo).then(res => {
      this.appState.setIsLoading(false);
      this.myProfile.updateView(this.userInfo);
      this.dismiss();
    }).catch(err => this.appState.handleError(err));
  }
}
