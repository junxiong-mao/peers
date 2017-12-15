import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as AWSCognito from 'amazon-cognito-identity-js';

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
        }
        observer.complete();
      });
    });
  }

  public getIDToken() : Observable<any> {
    return Observable.create(observer => {
      this.getSession().subscribe(session => {
        if (!session) {
          observer.next(null);
          observer.complete();
          return;
        }
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
        observer.next(false);
      } else {
        observer.next(true);
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
    // bio: max length 500 chars
    // interests: "A_B_C"
    // except for email, all other attributes must be prefixed with "custom:"

    let attributeList = [];
    let dataEmail = {
      Name: 'email',
      Value: credentials.email
    };
    let dataFirstName = {
      Name: 'custom:firstName',
      Value: credentials.firstName
    };
    let dataLastName = {
      Name: 'custom:lastName',
      Value: credentials.lastName
    };
    let dataMajor = {
      Name: 'custom:major',
      Value: credentials.major
    };
    let dataLevel  = {
      Name: 'custom:level',
      Value: credentials.level
    };
    let dataBio = {
      Name: 'custom:bio',
      Value: credentials.bio
    };
    let dataInterests = {
      Name: 'custom:interests',
      Value: credentials.interests.join('_')
    };

    let attributeEmail = new AWSCognito.CognitoUserAttribute(dataEmail);
    let attributeFirstName = new AWSCognito.CognitoUserAttribute(dataFirstName);
    let attributeLastName = new AWSCognito.CognitoUserAttribute(dataLastName);
    let attributeMajor = new AWSCognito.CognitoUserAttribute(dataMajor);
    let attributeLevel = new AWSCognito.CognitoUserAttribute(dataLevel);
    let attributeBio = new AWSCognito.CognitoUserAttribute(dataBio);
    let attributeInterests = new AWSCognito.CognitoUserAttribute(dataInterests);

    attributeList.push(attributeEmail);
    attributeList.push(attributeFirstName);
    attributeList.push(attributeLastName);
    attributeList.push(attributeBio);
    attributeList.push(attributeInterests);
    attributeList.push(attributeLevel);
    attributeList.push(attributeMajor);

    let success = false;

    userPool.signUp(credentials.email, credentials.password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err);
        return;
      } else{
        success = true;
      }
    });

    if (success){
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    } else {
      return Observable.create(observer => {
        observer.next(null);
        observer.complete();
      });
    }

  }
}
