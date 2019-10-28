import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { PostProvider } from '../../providers/post-provider';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-apply-card',
  templateUrl: 'apply-card.html',
})
export class ApplyCardPage {
  user: any;
  fname: string;
  lname: string;
  contact: string = "";
  address: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private postPvdr: PostProvider,
    private storage: Storage,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.storage.get('session_storage').then((res) => {
      this.user = res;
      this.fname = this.user.fname;
      this.lname = this.user.lname;
      console.log(res);
    });
  }

  cardApplication() {

    if (this.contact == "") {
      const toast = this.toastCtrl.create({
        message: "Contact is required!",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }

    else {
      let body = {
        user_id: this.user.user_id,
        contact: this.contact,
        address: this.address,
        req: 'apply_card'
      };

      this.postPvdr.postData(body, 'file_card.php').subscribe((data) => {
        var alertpesan = data.msg;
        if (data.success) {
          this.navCtrl.pop();
          const alert = this.alertCtrl.create({
            title: 'New Card',
            subTitle: 'Application went through, Congratulations!',
            buttons: ['OK']
          });
          alert.present();
        }
        else {
          const alert = this.alertCtrl.create({
            title: 'New Card',
            subTitle: alertpesan,
            buttons: ['OK']
          });
          alert.present();
        }
      });
    }
  }
}
