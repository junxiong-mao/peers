import { Injectable } from "@angular/core";
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import { ENV } from '@app/env'
import "rxjs/add/operator/delay";

declare var apigClientFactory: any;

@Injectable()
export class CardsService {
  private cards = [
    {
      level: 'PhD',
      major: 'Computer Science',
      interests: [
        'Machine Learning',
        'Bumblebees',
        'Biology'
      ],
      bio: 'I like Machine Learning because it\'s cool'
    },
    {
      level: 'MS',
      major: 'Physics',
      interests: [
        'Biology',
        'Newton'
      ],
      bio: 'I like bio because it\'s cool'
    },
    {
      level: 'MS',
      major: 'Electrical Engineering',
      interests: [
        'Processors',
        'Digital Signal Processing'
      ],
      bio: 'I like Digital Signal Processing because it\'s cool'
    }
  ];

  apigClient: any;

  constructor() {
    this.apigClient = apigClientFactory.newClient({
      apiKey: 'jVmBChVpRK6tivnEcT8zGaHAYRmDrglP8SiFvDTE',
      region: 'us-west-1',
      // invokeUrl:'https://c72uud7t8a.execute-api.us-west-1.amazonaws.com/beta'
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
