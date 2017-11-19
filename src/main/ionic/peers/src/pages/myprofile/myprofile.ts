import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user-service";
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

  ngOnDestroy() : void {

  }

  ngOnInit() : void {
    this.appState.setIsLoading(true);
    this.userService.getUser("2").then(response => {
      this.appState.setIsLoading(false);
      response.data.photoUrl = "http://jacobsschool.ucsd.edu/faculty/faculty_bios/photos/23.jpg";
      this.user = response.data;
    })
  }

}
