import { Injectable } from "@angular/core";
import 'rxjs/add/observable/of';
import { ENV } from '@app/env';
import "rxjs/add/operator/delay";
import 'rxjs/add/operator/toPromise';
import {apigClientConfig} from "./apigClientConfig";
import {AuthService} from "./auth/auth-service";

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
    return this.auth.getIDToken().toPromise().then(token => {
      let interests = ['AI'];
      let params = {
        interests: interests
      };
      let additionalParams = {
        headers: {
          Authorization: token
        }
      };
      return this.apigClient.getCards(params, null, additionalParams);
    })
  }

  public postDecision(id: string, decisionType: string): Promise<any> {
    return this.auth.getIDToken().toPromise().then(token => {
      const params = {
        id: id,
        type: decisionType
      };
      let additionalParams = {
        headers: {
          Authorization: token
        }
      }
      return this.apigClient.postDecision(params, null, additionalParams);
    })
  }
}
