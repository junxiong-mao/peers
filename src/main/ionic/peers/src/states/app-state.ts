import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from "@angular/core";

@Injectable()
export class AppState {
  private isLoadingSubject: BehaviorSubject<boolean>;
  public readonly isLoading: Observable<boolean>;
  public currentUser = null;

  private loadingCalls = 0;

  constructor() {
    this.isLoadingSubject = new BehaviorSubject(false);
    this.isLoading = this.isLoadingSubject.asObservable();
  }

  public setIsLoading(isLoading: boolean) {
    if (isLoading == false) {
      this.loadingCalls--;
      if (this.loadingCalls == 0) {
        this.isLoadingSubject.next(false);
      }
    } else {
      this.loadingCalls++;
      if (this.loadingCalls == 1) {
        this.isLoadingSubject.next(true);
      }
    }
  }

}
