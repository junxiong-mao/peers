import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { UserService } from "../../services/user-service";
import { AppState } from "../../states/app-state";
import { AlertController, ModalController } from "ionic-angular";
import { EditProfileModal } from "../../components/edit-profile-modal/edit-profile-modal";
import {UserState} from "../../states/user-state";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'page-myprofile',
  templateUrl: 'my-profile.html'
})

export class MyProfile implements OnInit, OnDestroy {
  user: User;
  private userSubscription: Subscription;

  constructor(private userService: UserService,
              private appState: AppState,
              private modalCtrl: ModalController,
              private userState: UserState) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.userSubscription = this.userState.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  editProfile() {
    let data:any = this.user;
    data.myProfile = this;
    let profileModal = this.modalCtrl.create(EditProfileModal, data);
    profileModal.present();
  }

}
