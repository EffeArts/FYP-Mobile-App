import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the CardTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card-tabs',
  templateUrl: 'card-tabs.html'
})
export class CardTabsPage {

  cardRoot = 'CardPage'
  rechargeRoot = 'RechargePage'
  historyRoot = 'HistoryPage'
  settingsRoot = 'CardSettingsPage'


  constructor(public navCtrl: NavController) {}

}
