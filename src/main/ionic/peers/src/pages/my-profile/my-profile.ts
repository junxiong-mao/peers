import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { UserService } from "../../services/user-service";
import { AppState } from "../../states/app-state";
import { AlertController, ModalController } from "ionic-angular";
import { EditProfileModal } from "../../components/edit-profile-modal/edit-profile-modal";

@Component({
  selector: 'page-myprofile',
  templateUrl: 'my-profile.html'
})

export class MyProfile implements OnInit, OnDestroy {
  user: User;

  constructor(private userService: UserService,
              private appState: AppState,
              private modalCtrl: ModalController) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.appState.setIsLoading(true);
    this.userService.getUser().then(response => {
      this.appState.setIsLoading(false);
      this.user = response.data;
    })
  }

  editProfile() {
    let data:any = this.user;
    data.myProfile = this;
    let profileModal = this.modalCtrl.create(EditProfileModal, data);
    profileModal.present();
  }

  updateView(userInfo) {
    userInfo.id = this.user.id;
    userInfo.email = this.user.email;
    userInfo.photoUrl = this.user.photoUrl;
    this.user = userInfo;
  }

}
