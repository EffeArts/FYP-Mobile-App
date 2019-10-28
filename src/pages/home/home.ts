import { Component } from '@angular/core';
import { NavController, NavParams, App, ToastController, MenuController, LoadingController } from 'ionic-angular';

import{ PostProvider } from '../../providers/post-provider';
import{ Storage } from '@ionic/storage';

import { SettingPage } from '../setting/setting';
import { LoginPage } from '../login/login';
import { ApplyCardPage } from '../apply-card/apply-card';
import { CardTabsPage } from '../card-tabs/card-tabs';

// AuthService

import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  anggota: any;
  members: any;
  commuter_status: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private postPvdr: PostProvider,
    private storage: Storage,
    private appCtrl: App,
    public menuCtrl: MenuController,
    public authService: AuthService,
    public loadingCtrl: LoadingController) {

  }

  ionViewCanEnter(){
    this.presentLoadingDefault();
   }

   presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2500);
  }


  ionViewWillEnter(){
    this.storage.get('session_storage').then((res) => {
      this.anggota = res;
      this.load();
      console.log("This is from home.ts");
    });
  }

  load(){
    let body = {
      user_id: this.anggota.user_id,
      aksi: 'profile'
    };

    this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
      this.members = data.profiles;
      this.commuter_status = data.commuter;
    });
  }

  openSetting(){
    this.navCtrl.push(SettingPage);
  }

  applicationPage(){
    this.navCtrl.push(ApplyCardPage);
  }

  cardPage(){
    this.navCtrl.push(CardTabsPage);
  }

  logout(){
    this.authService.logout();
    this.storage.clear();
    this.appCtrl.getRootNav().setRoot(LoginPage);
    const toast = this.toastCtrl.create({
      message: 'Logged out. See you soon :(',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  isAuthenticated(){
    return this.authService.authenticated();
  }
}
