import {Injectable} from "@angular/core";
import {UserService} from "../services/user-service";
import {AppState} from "./app-state";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";

@Injectable()
export class UserState {
  public user;
  private currentUserSubject: BehaviorSubject<User>;
  public readonly currentUser: Observable<User>;
  constructor(private userService: UserService,
              private appState: AppState){
    this.currentUserSubject = new BehaviorSubject(new User(
      '', '', '', '', '', [], '', '', ''
    ));
    this.currentUser = this.currentUserSubject.asObservable();

  }
  public initialize(): Promise<any> {
    //Not sure whether it is a good idea to return a Promise.
    this.appState.setIsLoading(true);
    return this.userService.getUser().then(response => {
      this.appState.setIsLoading(false);
      this.user = response.data;
      this.currentUserSubject.next(this.user);
    })
  }
  public updateUser(user) {
    this.appState.setIsLoading(true);
    this.userService.updateUser(user).then(res => {
      this.appState.setIsLoading(false);
      this.user = user;
      this.currentUserSubject.next(this.user);
    }).catch(err => this.appState.handleError(err));
  }
}
