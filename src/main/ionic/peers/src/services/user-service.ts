import { Injectable } from "@angular/core";
import 'rxjs/add/observable/of';
import { ENV } from '@app/env'
import {apigClientConfig} from "./apigClientConfig";

declare var apigClientFactory: any;

@Injectable()
export class UserService {
  apigClient: any;

  constructor() {
    this.apigClient = apigClientFactory.newClient({
      region: apigClientConfig.region,
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
