import { Component, OnInit } from '@angular/core';
import { NavParams, Platform, ViewController } from 'ionic-angular';
import { MyProfile } from "../../pages/my-profile/my-profile";
import { UserState } from "../../states/user-state";
import { AppState } from "../../states/app-state";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'edit-profile-modal',
  templateUrl: 'edit-profile-modal.html'
})
export class EditProfileModal implements OnInit {
  userInfo: any;
  interestsList = [];

  private myProfile: MyProfile;

  constructor(public platform: Platform,
              public http: HttpClient,
              public params: NavParams,
              public viewCtrl: ViewController,
              private userState: UserState,
              private appState: AppState,) {
    this.userInfo = params.get('user');
    this.myProfile = params.get("myProfile");
  }

  ngOnInit(): void {
    const url = `${location.origin}/assets/academic-interests.json`;
    this.http.get(url).subscribe((l: Array<string>) => this.interestsList = l);
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

  handleIllegalInterestInput(message: string) {
    this.appState.handleError('Tried to add non existing interest', message);
  }

  handleInterestsValueChange(interests: Array<string>) {
    this.userInfo.interests = interests;
  }
}
