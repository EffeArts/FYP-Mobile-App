import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardTabsPage } from './card-tabs';

@NgModule({
  declarations: [
    CardTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(CardTabsPage),
  ]
})
export class CardTabsPageModule {}
