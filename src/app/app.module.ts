import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SettingPage } from '../pages/setting/setting';
import { RoutePage } from '../pages/route/route';
import { TripPage } from '../pages/trip/trip';
import { ApplyCardPage } from '../pages/apply-card/apply-card';
import { CardTabsPage } from '../pages/card-tabs/card-tabs';

import { HttpModule } from '@angular/http';
import { PostProvider } from '../providers/post-provider';
import { AuthService } from '../providers/auth-service';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    SettingPage,
    RoutePage,
    TripPage,
    ApplyCardPage,
    CardTabsPage
    

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    SettingPage,
    RoutePage,
    TripPage,
    ApplyCardPage,
    CardTabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PostProvider,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
