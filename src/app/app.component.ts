import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, App, ToastController, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RoutePage } from '../pages/route/route';
import { TripPage } from '../pages/trip/trip';
import { SettingPage } from '../pages/setting/setting';
import { CardTabsPage } from '../pages/card-tabs/card-tabs';

// Auth-service
import { AuthService } from '../providers/auth-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController;
  @ViewChild(Nav) navMenu: Nav;
  rootPage:any;
  pages: Array<{title: string, component: any, icon: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private storage: Storage,
    private appCtrl: App,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    public authService: AuthService ) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage, icon: 'ios-home' },
      { title: 'My Card', component: CardTabsPage, icon: 'ios-card'},
      { title: 'All Routes', component: RoutePage, icon: 'ios-subway' },
      { title: 'Settings', component: SettingPage, icon: 'ios-settings-outline' }
      
    ];
  }

  logout(){
    this.authService.logout();
    this.menuCtrl.close();
    this.storage.clear();
    this.appCtrl.getRootNav().setRoot(LoginPage);
    const toast = this.toastCtrl.create({
      message: 'Logged out. See you soon :(',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.storage.get('session_storage').then((res) => {
      if(res == null){
        this.rootPage = LoginPage;
      }
      else{
        this.rootPage = HomePage;
      }
    });

  }

  openPage(page){
    this.navMenu.setRoot(page.component);
  }

  isAuthenticated(){
    return this.authService.authenticated();
  }

}

