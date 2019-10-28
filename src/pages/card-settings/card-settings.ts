import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';

import { ApplyCardPage } from '../apply-card/apply-card';
import{ Storage } from '@ionic/storage';
import{ PostProvider } from '../../providers/post-provider';

@IonicPage()
@Component({
  selector: 'page-card-settings',
  templateUrl: 'card-settings.html',
})
export class CardSettingsPage {
  commuter_status: any;
  anggota: any;
  cards: any;
  card_statuses: any;
  pin: string;
  card_number: string;
  amount: string;
  pin1: string;
  pin2: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardSettingsPage');
  }

  ionViewWillEnter(){
    this.storage.get('session_storage').then((res) => {
      this.anggota = res;
      this.load();
    });
  }

  

  applicationPage(){
    this.navCtrl.push(ApplyCardPage);
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
      this.card_number = data.card_number;
      console.log(data.cardStatus);
    });
  }

  // The following function is asking the user to provide a pin
  // Which is then sent to the database to check it's authenticity
  cardSettings_pin_check(){
    const prompt = this.alertCtrl.create({
      title: 'Card Block',
      message: "Enter the card PIN to block the card",
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
        this.cardBlock();
      }
      else{
        this. cardSettings_pin_check_retry();
      }
    });
  }

  // The following function pops up the blocking prompt box
  cardBlock(){
    const confirm = this.alertCtrl.create({
      title: 'Block your card?',
      message: 'Do you agree to block this travel card?',
      buttons: [
        {
          text: 'Cancel', 
          handler: () => {
            console.log('Cancel clicked');
          }
        },

        {
          text: 'Block',
          handler: () => {
            console.log('Yes, Block');
          }
        }
      ]
    });
    confirm.present();
  }

  //Once the initial pin check fails, this function runs the retry
  cardSettings_pin_check_retry(){
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
  ChangePin_pin_check(){
    const prompt = this.alertCtrl.create({
      title: 'Change Card Pin',
      message: "Enter the card PIN to change the card's pin",
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
            this.pin_check2(); // this one is for changing the card pin
          }
        }
      ]
    });
    prompt.present();
  }

  // And this following function sends the provided pin to the database to be checked
  pin_check2(){
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
        this.pinChange();
      }
      else{
        this. ChangePin_pin_check_retry();
      }
    });
  }

  //Once the initial pin check fails, this function runs the retry
  ChangePin_pin_check_retry(){
    const prompt = this.alertCtrl.create({
      title: 'PIN Change',
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
            this.pin_check2();
          }
        }
      ]
    });
    prompt.present();
  }

  //The actual function for changing the pin
  pinChange(){
    const prompt = this.alertCtrl.create({
      title: 'Change Pin',
      message: 'Enter a new pin of 4 numbers',
      inputs: [
        {
          name: 'pin1',
          type: "password",
          placeholder: 'New Pin'
        },
        {
          name: 'pin2',
          type: "password",
          placeholder: 'Re-enter Pin'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancelled');
          }
        },

        {
          text: 'Update',
          handler: data => {
            this.pin1 = data.pin1;
            this.pin2 = data.pin2;
            
            // New Pin validation
            if(this.pin1 != this.pin2){
              this.pinChange();
              this.load();
                const toast = this.toastCtrl.create({
                  message: 'Provided PINs do not match.',
                  duration: 3000,
                  position: 'top'
                });
              toast.present();
            }
            else{
              this.pin_change();
              console.log('Pin Updated');
            }
            
          }
        }
      ]
    });

    prompt.present();
  }

  //The actual function to change the pin
  pin_change(){
    console.log("Unique id:" + this.card_number);

    let body = {
      unique_id: this.card_number,
      pin1: this.pin1,
      pin2: this.pin2,
      req: 'change_pin'
    };

    this.postPvdr.postData(body, 'file_card.php').subscribe(data => {
      console.log(data.msg);

      if(data.success){
        
        this.load();
        const toast = this.toastCtrl.create({
          message: 'Pin Successfully updated.',
          duration: 3000,
          position: 'top'
        });
        toast.present();

      }

      else{
        this.load();
        const toast = this.toastCtrl.create({
          message: 'Pin update failed.',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
      

    });
  }




}
