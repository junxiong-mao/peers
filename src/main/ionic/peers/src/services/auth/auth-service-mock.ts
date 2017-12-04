import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENV } from "@app/env";

@Injectable()
export class AuthServiceMock {

  constructor(private http : HttpClient) {
    console.log("mock");
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

  public getIDToken() : Observable<any> {
    return Observable.create(observer => {
      observer.next("THIS IS MOCKED ID TOKEN");
      observer.complete();
      return;
    })
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
        observer.next(res);
        observer.complete();
      });
    });
  }
}
