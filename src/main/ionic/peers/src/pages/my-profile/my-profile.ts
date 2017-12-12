import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { ModalController } from "ionic-angular";
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

  constructor(private modalCtrl: ModalController,
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
    let data: any = {};
    data.user = Object.assign({}, this.user);
    data.myProfile = this;
    let profileModal = this.modalCtrl.create(EditProfileModal, data);
    profileModal.present();
  }

}
