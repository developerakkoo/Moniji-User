import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  constructor(private loadingController: LoadingController,
              private toastController: ToastController,
              
              private alertController: AlertController) { }


               hapticsImpactMedium = async () => {
                await Haptics.impact({ style: ImpactStyle.Medium });
              };
              
               hapticsImpactLight = async () => {
                await Haptics.impact({ style: ImpactStyle.Light });
              };
              
               hapticsVibrate = async () => {
                await Haptics.vibrate();
              };
              
               hapticsSelectionStart = async () => {
                await Haptics.selectionStart();
              };
              
               hapticsSelectionChanged = async () => {
                await Haptics.selectionChanged();
              };
              
               hapticsSelectionEnd = async () => {
                await Haptics.selectionEnd();
              };
              async presentToast(msg: string, duration: number) {
                const toast = await this.toastController.create({
                  message: msg,
                  duration: duration
                });
                toast.present();
              }

              async presentLoading(msg: string) {
                const loading = await this.loadingController.create({
                  message: msg,
                  spinner: 'circular'
                });
                await loading.present();
              }


              async dismissLoading(){
                this.loadingController.dismiss();
              }

              async presentAlert(header: string, subheader: string, msg: string, buttonText: string) {
                const alert = await this.alertController.create({
                  header: header,
                  subHeader: subheader,
                  message: msg,
                  buttons: [buttonText]
                });
              
                await alert.present();
              }

              async presentAlertConfirm(header: string, handler:any, msg: string, buttonText: string) {
                const alert = await this.alertController.create({
                  header: header,
                  message: msg,
                  buttons: [
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      cssClass: 'secondary',
                      handler: () => {
                        console.log('Confirm Cancel: blah');
                      }
                    }, {
                      text: buttonText,
                      handler: handler
                    }
                  ]
                });
              
                await alert.present();
              }
}
