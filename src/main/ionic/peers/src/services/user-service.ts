import { Injectable } from "@angular/core";
import 'rxjs/add/observable/of';
import { ENV } from '@app/env'

declare var apigClientFactory: any;

@Injectable()
export class UserService {
  private user =
    {
      id: '123',
      firstName: "John",
      lastName: "Doe",
      level: "phd",
      major: "Computer Science",
      interests: ["Machine Learning", "AI"],
      bio: "I like turtles.",
      email: "email@ucsd.edu",
      photoUrl: "https://i.pinimg.com/736x/45/18/61/4518617f909007087ef9cebbfcaec007--rock-painting-bonsai.jpg"
    };

  apigClient: any;

  constructor() {
    this.apigClient = apigClientFactory.newClient({
      accessKey: 'AKIAIDJ24K2S2XDBYMRA',
      secretKey: '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',
      region: 'us-west-1',
      // invokeUrl:'https://c72uud7t8a.execute-api.us-west-1.amazonaws.com/beta'
      invokeUrl: ENV.invokeUrl
    });
  }

  public getUser(userId: string): Promise<any> {
    const params = {
      id: userId
    };
    return this.apigClient.getUserInfo(params, {});
  }

}
