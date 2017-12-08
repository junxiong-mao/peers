import { Injectable } from "@angular/core";
import 'rxjs/add/observable/of';
import { ENV } from '@app/env'
import { apigClientConfig } from "./apigClientConfig";
import { AuthService } from "./auth/auth-service";

declare var apigClientFactory: any;

@Injectable()
export class UserService {
  apigClient: any;

  constructor(private auth: AuthService) {
    this.apigClient = apigClientFactory.newClient({
      region: apigClientConfig.region,
      invokeUrl: ENV.invokeUrl
    });
  }

  public getUser(userId?: string): Promise<any> {
    return this.auth.getIDToken().toPromise().then(token => {
      let params: any = {};
      params.id = userId ? userId : -1;
      const additionalParams = {
        headers: {
          Authorization: token
        }
      };
      return this.apigClient.getUserInfo(params, null, additionalParams);
    });
  }
}
