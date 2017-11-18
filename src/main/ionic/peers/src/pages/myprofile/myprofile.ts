import {Component, OnDestroy, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user";
import {CardsService} from "../../services/cards-service";
import {UserService} from "../../services/user-service";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {AppState} from "../../states/app-state";

@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html'
})
export class MyProfile implements OnInit, OnDestroy {
  user : User;
  constructor(private userService : UserService,
              private appState: AppState) {


  }

  ngOnInit() : void {
    this.appState.setIsLoading(true);
    this.userService.getUser(2).then(response => {
      this.appState.setIsLoading(false);
      console.log(response.data);
      this.user = response.data;
      this.user.photoUrl = "http://jacobsschool.ucsd.edu/faculty/faculty_bios/photos/23.jpg";
    })
  }

}
