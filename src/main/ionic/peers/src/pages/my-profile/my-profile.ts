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
              private alertCtrl: AlertController,
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
    console.log("editProfile");
    let profileModal = this.modalCtrl.create(EditProfileModal, this.user);
    profileModal.present();
  }
}
