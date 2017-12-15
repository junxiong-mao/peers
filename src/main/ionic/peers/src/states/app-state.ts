import { Injectable } from "@angular/core";
import { Loading, LoadingController, ToastController } from "ionic-angular";

@Injectable()
export class AppState {
  private loadingCalls = 0;
  private loading: Loading;

  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }

  public setIsLoading(isLoading: boolean) {
    if (isLoading == false) {
      this.loadingCalls--;
      if (this.loadingCalls == 0) {
        this.loading.dismiss();
      }
    } else {
      this.loadingCalls++;
      if (this.loadingCalls == 1) {
        this.createLoading();
      }
    }
  }

  private createLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();
  }

  public handleError(error, message?: string) {
    console.error('error', error);
    this.setIsLoading(false);
    this.presentErrorToast(message);
  }

  presentErrorToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message || 'Oops, something went wrong. Please try again later.',
      duration: 60000,
      position: 'top',
      showCloseButton: true
    });

    toast.present();
  }

}
