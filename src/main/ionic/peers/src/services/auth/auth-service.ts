import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as AWSCognito from 'amazon-cognito-identity-js';
import { AppState } from "../../states/app-state";

export class UserLogin {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

const poolDataConfig = {
  UserPoolId: 'us-west-2_Wy2X4wHy6',
  ClientId: '2jmudqp2dthht56d0hrt7fb1fl'
};

const userPool = new AWSCognito.CognitoUserPool(poolDataConfig);

@Injectable()
export class AuthService {
  currentUser: UserLogin;
  access: boolean;

  constructor(private appState : AppState) {
    console.log("AuthService");
  }

  public login(credentials) {
    let authenticationData = {
      Username: credentials.email,
      Password: credentials.password
    };
    let authenticationDetails = new AWSCognito.AuthenticationDetails(authenticationData);
    let userData = {
      Username: credentials.email,
      Pool: userPool
    };
    let currentUser = new AWSCognito.CognitoUser(userData);
    return Observable.create(observer => {
      currentUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          localStorage.isLoggedIn = true;
          observer.next(result);
          observer.complete();
        },
        onFailure: function(err) {
          observer.next(null);
          observer.complete();
        }
      });
    });
  }

  public signOut()  {
    let currentUser = userPool.getCurrentUser();
    return Observable.create(observer => {
      if (currentUser) {
        currentUser.signOut();
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    })
  }

  public checkCurrentUser() {
    return Observable.create(observer => {
      let currentUser = userPool.getCurrentUser();
      if (currentUser != null) {
        currentUser.getSession((err, session) => {
          if (err) {
            console.log(err);
            return;
          }
          observer.next(session.isValid());
          localStorage.isLoggedIn = true;
        })
      } else {
        observer.next(false);
        localStorage.isLoggedIn = false;
      }
    });
  }

  public register(credentials) {
    console.log("clicked");
    let attributeList = [];
    let dataEmail = {
      Name: 'email',
      Value: credentials.email
    };
    let attributeEmail = new AWSCognito.CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);
    userPool.signUp(credentials.email, credentials.password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
    })
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }
}
