import {AuthServiceMock} from "../services/auth/auth-service-mock";

export const ENV = {
  mode: 'Development',
  invokeUrl: location.origin,
  auth: AuthServiceMock
};
