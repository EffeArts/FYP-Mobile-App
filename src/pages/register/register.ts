import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { AuthService } from '../../providers/auth-service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  fname: string = "";
  lname: string = "";
  username: string = "";
  email: string = "";
  password: string = "";
  confirm_password: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController,
    private postPvdr: PostProvider,
    public authService: AuthService ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.authService.logout();
  }

  addRegister(){
    console.log(this.fname);

    // Validation

    if(this.fname == ""){
      const toast = this.toastCtrl.create({
        message: "First name is required!",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.lname == ""){
      const toast = this.toastCtrl.create({
        message: "Last name is required!",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.username == ""){
      const toast = this.toastCtrl.create({
        message: "Username is required!",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.email == ""){
      const toast = this.toastCtrl.create({
        message: "Email is required!",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.password == ""){
      const toast = this.toastCtrl.create({
        message: "Password is required!",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.password != this.confirm_password){
      const toast = this.toastCtrl.create({
        message: "Password doeas not match with the confirmation!",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else{
      let body = {
        fname: this.fname,
        lname: this.lname,
        username: this.username,
        email: this.email,
        password: this.password,
        aksi: 'add_register'
      };

      this.postPvdr.postData(body, 'file_aksi.php').subscribe((data) => {
        var alertpesan = data.msg;
        if(data.success){
          this.navCtrl.pop();
          const toast = this.toastCtrl.create({
            message: 'Successful registration',
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
  }

  formLogin(){
    this.navCtrl.pop();
  }

  isAuthenticated(){
    return this.authService.authenticated();
  }

}
