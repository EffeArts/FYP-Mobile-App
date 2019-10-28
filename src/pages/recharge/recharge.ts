import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController,LoadingController } from 'ionic-angular';
import{ PostProvider } from '../../providers/post-provider';
import{ Storage } from '@ionic/storage';

import { ApplyCardPage } from '../apply-card/apply-card';


@IonicPage()
@Component({
  selector: 'page-recharge',
  templateUrl: 'recharge.html',
})
export class RechargePage {
  anggota: any;
  cards: any;
  commuter_status: any;
  pin: string;
  card_number: string;
  amount: string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private postPvdr: PostProvider,
    private storage: Storage,
    public alertCtrl: AlertController,
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
    });
  }

  load(){
    let body = {
      user_id: this.anggota.user_id,
      req: 'card-funds'
    };

    this.postPvdr.postData(body, 'file_card.php').subscribe(data => {
      this.cards = data.cardInfo;
      this.commuter_status = data.commuter;
      this.card_number = data.card_number;
    });
  }
  //First and foremost we simulate payment options available to the user, before anythind else
  paymentOptions(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose payment method');

    alert.addInput({
      type: 'radio',
      label: 'Tigo Pesa',
      value: 'Tigo Pesa',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'M-Pesa',
      value: 'M-pesa',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Visa Card',
      value: 'Visa Card',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Master Card',
      value: 'Master Card',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log(data + ' is chosen.');
        this.cardRecharge_pin_check();
      }
    });
    alert.present();
  }
  // The following function is asking the user to provide a pin
  // Which is then sent to the database to check it's authenticity
  cardRecharge_pin_check(){
    const prompt = this.alertCtrl.create({
      title: 'Card Top Up',
      message: "Enter the card PIN to Top up",
      inputs:[
        {
          name: 'pin',
          placeholder: 'PIN'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.pin = data.pin;
            this.pin_check();
          }
        }
      ]
    });
    prompt.present();
  }

  cardRecharge_pin_check_retry(){
    const prompt = this.alertCtrl.create({
      title: 'Card Top Up',
      message: "Wrong Pin, try again!",
      inputs:[
        {
          name: 'pin2',
          placeholder: 'PIN'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.pin = data.pin2;
            this.pin_check();
          }
        }
      ]
    });
    prompt.present();
  }

  // The following function is asking the user to provide a pin
  // Which is then sent to the database to check it's authenticity
  cardRecharge_funds(){
    const prompt = this.alertCtrl.create({
      title: 'Card Top Up',
      message: "Enter the amount of money to top up,",
      inputs:[
        {
          name: 'amount',
          placeholder: 'Amount'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.amount = data.amount;
            this.recharge();
          }
        }
      ]
    });
    prompt.present();
  }

  // And this following function sends the provided pin to the database to be checked
  pin_check(){
    console.log("pin: " + this.pin + " is sent to be checked");
    console.log("Unique id:" + this.card_number);

    let body = {
      unique_id: this.card_number,
      card_pin: this.pin,
      req: 'pin-check'
    };

    // Then the results from backend are delivered and the appropriate action is taken
    this.postPvdr.postData(body, 'file_card.php').subscribe(data => {
      console.log(data.msg);
      if(data.success){
        this.cardRecharge_funds();
      }
      else{
        this. cardRecharge_pin_check_retry();
      }
    });
  }

  // Now after the card validation and the provision of the amount to be recharges,
  // then the real simulation of third party card top up is done HERE!
  recharge(){
    console.log("amount: " + this.amount);
    console.log("Unique id:" + this.card_number);

    let body = {
      unique_id: this.card_number,
      amount: this.amount,
      req: 'recharge'
    };

    this.postPvdr.postData(body, 'file_card.php').subscribe(data => {
      console.log(data.msg);

      if(data.success){
        
        this.load();
        const toast = this.toastCtrl.create({
          message: 'Card Successfully recharged.',
          duration: 3000,
          position: 'top'
        });
        toast.present();

      }

      else{
        this.load();
        const toast = this.toastCtrl.create({
          message: 'Card recharge failed.',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
      

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RechargePage');
  }

  applicationPage(){
    this.navCtrl.push(ApplyCardPage);
  }

}
