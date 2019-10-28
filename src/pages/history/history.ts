import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import{ PostProvider } from '../../providers/post-provider';
import{ Storage } from '@ionic/storage';
import { ApplyCardPage } from '../apply-card/apply-card';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  commuter_status: any;
  anggota: any;
  cards: any;
  card_id: any;
  trips: any;
  has_tripped: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private postPvdr: PostProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter(){
    this.storage.get('session_storage').then((res) => {
      this.anggota = res;
      this.presentLoadingDefault();
      this.load();
    });
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  load(){
    
    let body = {
      user_id: this.anggota.user_id,
      req: 'card-history'
    };

    this.postPvdr.postData(body, 'file_card.php').subscribe(data => {
      this.card_id = data.card_id;
      this.commuter_status = data.commuter;
      this.has_tripped = data.has_tripped;
      this.trips = data.trips;
      console.log(data.commuter);
      console.log(data.has_tripped);
      console.log(data.trips);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  applicationPage(){
    this.navCtrl.push(ApplyCardPage);
  }

}
