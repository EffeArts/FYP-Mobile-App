import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import{ PostProvider } from '../../providers/post-provider';
import{ Storage } from '@ionic/storage';

import { ApplyCardPage } from '../apply-card/apply-card';

//Auth-services

import { AuthService } from '../../providers/auth-service';

@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',

})
export class CardPage {
  commuter_status: any;
  anggota: any;
  cards: any;
  card_statuses: any;
  last_topup: any;
  last_used: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private postPvdr: PostProvider,
    private storage: Storage,
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
    }, 3000);
  }

  ionViewWillEnter(){
    this.storage.get('session_storage').then((res) => {
      this.anggota = res;
      
      this.load();
    });
  }

  

  load(){
    
    let body = {
      user_id: this.anggota.user_id,
      req: 'card-info'
    };

    this.postPvdr.postData(body, 'file_card.php').subscribe(data => {
      this.cards = data.cardInfo;
      this.commuter_status = data.commuter;
      this.card_statuses = data.cardStatus;
      this.last_topup = data.last_topup;
      this.last_used = data.last_used;
      console.log(data.cardStatus);
    });
  }

  applicationPage(){
    this.navCtrl.push(ApplyCardPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
  }

}
