import { Injectable } from "@angular/core";
import { AppState } from "../../states/app-state";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENV } from "@app/env";

@Injectable()
export class AuthServiceMock {

  constructor(private appState : AppState,
              private http : HttpClient) {
  }

  private constructScenario(scenarioType : string) : Observable<boolean> {
    return Observable.create(observer => {
      this.http.put(`${ENV.invokeUrl}/ngapimock/mocks`,
        JSON.stringify({identifier: "getCurrentUser", scenario: scenarioType}),
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
          responseType: 'text'
        }
      ).subscribe(res => {
        observer.next(this.checkCurrentUser());
        observer.complete();
      });
    });
  }

  public login(credentials) : Observable<boolean> {
    return this.constructScenario("loggedInUser");
  }

  public signOut() : Observable<boolean> {
    return this.constructScenario("noLoggedInUser");
  }

  public checkCurrentUser() : Observable<boolean> {
    return Observable.create(observer => {
      this.http.get(`${ENV.invokeUrl}/api/testing/current-user`).subscribe(res => {
        console.log("observable", typeof res, res);
        observer.next(res);
        observer.complete();
      });
    });
  }
}
