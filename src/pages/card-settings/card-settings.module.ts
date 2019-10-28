import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardSettingsPage } from './card-settings';

@NgModule({
  declarations: [
    CardSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(CardSettingsPage),
  ],
})
export class CardSettingsPageModule {}
