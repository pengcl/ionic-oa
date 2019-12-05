import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast;

  constructor(private toastController: ToastController) {
  }

  async show(content, timeInterval) {
    this.toast = await this.toastController.create({
      message: content ? content : '',
      duration: timeInterval ? timeInterval : 0
    });
    await this.toast.present();
  }

  hide() {
    this.toast.dismiss();
  }
}
