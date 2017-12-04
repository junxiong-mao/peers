import { Injectable } from "@angular/core";
import 'rxjs/add/observable/of';
import { ENV } from '@app/env';
import "rxjs/add/operator/delay";
import 'rxjs/add/operator/toPromise';
import {apigClientConfig} from "./apigClientConfig";
import {AuthService} from "./auth/auth-service";
import {Observable} from "rxjs/Observable";

declare var apigClientFactory: any;

@Injectable()
export class CardsService {
  apigClient: any;
  constructor(private auth : AuthService) {
    this.apigClient = apigClientFactory.newClient({
      //apiKey: apigClientConfig.apiKey,
      region: apigClientConfig.region,
      invokeUrl: ENV.invokeUrl
    });
  }

  public getCards(/*interests: Array<String>*/): Promise<any> {
    console.log("new promise");
    return this.auth.getIDToken().toPromise().then(token => {
      let interests = ['AI'];
      console.log("token:", token);
      let params = {
        interests: interests,
        Authorization: token + " Credential: , SignedHeaders: , Signature: , Date: "
      }
      return this.apigClient.getCards(params, {});
    })
  }

  public postDecision(id: string, decisionType: string): Promise<any> {
    const params = {
      id: id,
      type: decisionType
    };
    return this.apigClient.postDecision(params);
  }
}
