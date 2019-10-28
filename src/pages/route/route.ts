import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import{ PostProvider } from '../../providers/post-provider';
import{ Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-route',
  templateUrl: 'route.html',
})
export class RoutePage {
  routes: any;
  all_routes: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private postPvdr: PostProvider,
    private storage: Storage ) {
  }

  ionViewDidLoad() {
    this.load()
    console.log('ionViewDidLoad RoutePage');
  }

  load(){
    let body = {
      opt: 'all_routes'
    };

    
    this.postPvdr.postData(body, 'file_routes.php').subscribe(data => {
      this.routes = data.routes;
      console.log(data.routes);
    });
  }

}
