import { Injectable } from "@angular/core";
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import { ENV } from '@app/env'
import "rxjs/add/operator/delay";

declare var apigClientFactory: any;

@Injectable()
export class CardsService {
  apigClient: any;

  constructor() {
    this.apigClient = apigClientFactory.newClient({
      apiKey: 'jVmBChVpRK6tivnEcT8zGaHAYRmDrglP8SiFvDTE',
      region: 'us-west-1',
      invokeUrl: ENV.invokeUrl
    });
  }

  public getCards(/*interests: Array<String>*/): Promise<any> {
    let interests = ['AI'];
    const params = {
      interests: interests
    };
    return this.apigClient.getCards(params, {});
  }

  public postDecision(id: string, decisionType: string): Promise<any> {
    const params = {
      id: id,
      type: decisionType
    };
    return this.apigClient.postDecision(params);
  }
}
