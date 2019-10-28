import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import{ PostProvider } from '../../providers/post-provider';
import{ Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  anggota: any;
  fname: string;
  lname: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private postPvdr: PostProvider,
    private storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get('session_storage').then((res) => {
      this.anggota = res;
      this.fname = this.anggota.fname;
      this.lname = this.anggota.lname;
      console.log(res);
    });
  }

  selectText(event): void{
    event.target.select();
  }

  saveChange(){
    let body = {
      fname: this.fname,
      lname: this.lname,
      user_id: this.anggota.user_id,
      aksi: 'update_profile'
    };

    this.postPvdr.postData(body, 'file_aksi.php').subscribe((data) => {

      this.anggota.fname = this.fname;
      this.anggota.lname = this.lname;

      this.storage.set('session_storage', this.anggota);
      this.navCtrl.pop()
      const toast = this.toastCtrl.create({
        message: 'Profile updated',
        duration: 3000,
        position: 'top'
       });
       toast.present();
    });
  }
  

}
