import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENV } from "@app/env";

@Injectable()
export class AuthServiceMock {

  userCredentials = {
    email: 'jum029@eng.ucsd.edu',
    password: '123456'
  };

  constructor(private http : HttpClient) {
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
        this.checkCurrentUser().subscribe(currentUser => {
          observer.next(currentUser);
          observer.complete();
        });
      });
    });
  }

  public getIDToken() : Observable<any> {
    return Observable.create(observer => {
      observer.next("THIS IS MOCKED ID TOKEN");
      observer.complete();
    })
  }

  public login(credentials) : Observable<boolean> {
    if (this.userCredentials.email == credentials.email && this.userCredentials.password == credentials.password) {
      return this.constructScenario("loggedInUser");
    }
    return this.constructScenario("noLoggedInUser");
  }

  public signOut() : Observable<boolean> {
    return this.constructScenario("noLoggedInUser");
  }

  public checkCurrentUser() : Observable<boolean> {
    return Observable.create(observer => {
      this.http.get(`${ENV.invokeUrl}/api/testing/current-user`).subscribe(res => {
        observer.next(res == 'true');
        observer.complete();
      });
    });
  }
}
