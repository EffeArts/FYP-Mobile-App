import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import{ PostProvider } from '../../providers/post-provider';
import{ Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { StatusBar } from '@ionic-native/status-bar';

//Auth-service
import { AuthService } from '../../providers/auth-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string = "";
  password: string = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private postPvdr: PostProvider,
    private storage: Storage,
    public authService: AuthService,
    private statusBar: StatusBar) {

    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);

    // Set status bar to any color
    this.statusBar.backgroundColorByHexString('#ffffff');
  }

 


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    //validation
    if(this.username == "" || this.password == ""){
      const toast = this.toastCtrl.create({
        message: 'Wrong Username or Password',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }

    else if(this.username != "" && this.password != ""){
      let body = {
        username: this.username,
        password: this.password,
        aksi: 'login'
      };

      this.postPvdr.postData(body, '/file_aksi.php').subscribe((data) => {
        var alertpesan = data.msg;
        if(data.success){
          this.authService.login();
          this.storage.set('session_storage', data.result);
          this.navCtrl.setRoot(HomePage);
          const toast = this.toastCtrl.create({
            message: 'Successful Login.',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
        else{
          const toast = this.toastCtrl.create({
            message: alertpesan,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
      });

    }
    else{
      const toast = this.toastCtrl.create({
        message: 'username or password invalid',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

  formRegister(){
    this.navCtrl.push(RegisterPage);
    this.authService.login();
  }

  isAuthenticated(){
    return this.authService.authenticated();
  }

  ionViewCanLeave(){
    return this.authService.authenticated();
  }

  

}
