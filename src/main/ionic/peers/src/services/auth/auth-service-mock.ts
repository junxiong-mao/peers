import {Injectable} from "@angular/core";
import {AppState} from "../../states/app-state";
import {Observable} from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthServiceMock {
  constructor(private appState : AppState,
              private http : HttpClient) {
    console.log("AuthServiceMock");
  }
  //commands.js
  public login(credentials) : Observable<boolean> {
    return Observable.create(observer => {
      this.http.put('http://localhost:8100/ngapimock/mocks', JSON.stringify({identifier: "getCurrentUser", scenario: "loggedInUser"})).subscribe(res => {
    //return this.checkCurrentUser();
        //console.log("res:", res);
        observer.next(this.checkCurrentUser());
        observer.complete();
      });
    });
  }
  public signOut() {
    this.http.put('http://localhost:8100/ngapimock/mocks', JSON.stringify({identifier: "getCurrentUser", scenario: "noLoggedInUser"}));
    this.checkCurrentUser();
    console.log("signOut");
  }
  public checkCurrentUser() : Observable<boolean> {
    return Observable.create(observer => {
      this.http.get('http://localhost:8100/api/testing/current-user').subscribe(res => {
        console.log("observable", typeof res, res);
        observer.next(res);
        observer.complete();
      });
    });
  }
}
