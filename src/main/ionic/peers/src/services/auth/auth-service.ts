import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as AWSCognito from 'amazon-cognito-identity-js';
import { AppState } from "../../states/app-state";
import {DescribeJobsRequest} from "aws-sdk/clients/batch";

export class UserLogin {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

const poolDataConfig = {
  UserPoolId: 'us-west-2_2d4zGLTiS',
  ClientId: '64qnrqqi6d1gi5h9n7d4ifb5c3'
};

const userPool = new AWSCognito.CognitoUserPool(poolDataConfig);

@Injectable()
export class AuthService {

  constructor() {
  }

  public getSession() : Observable<any> {
    return Observable.create(observer => {
      let currentUser = userPool.getCurrentUser();
      if (!currentUser) {
        observer.next(null);
        observer.complete();
        return;
      }
      currentUser.getSession((err, session) => {
        if (err) {
          console.log(err);
          observer.next(null);
          observer.complete();
          return;
        } else {
          observer.next(session);
          console.log(session);
        }
        observer.complete();
      });
    });
  }

  public getIDToken() : Observable<any> {
    console.log("out getIDToken");
    return Observable.create(observer => {
      this.getSession().subscribe(session => {
        if (!session) {
          observer.next(null);
          observer.complete();
          return;
        }
        console.log(session);
        observer.next(session.idToken.jwtToken);
        observer.complete();
        return;
      })
    })
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

  public signOut() : Observable<boolean> {
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
      this.getSession().subscribe(session => {
        if (session) {
          observer.next(session.isValid());
        } else {
          observer.next(false);
        }
        observer.complete();
      });
    });
  }

  public register(credentials) {
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
