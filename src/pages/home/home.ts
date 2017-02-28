import {Component, NgZone} from '@angular/core';

import {NavController, ModalController, AlertController} from 'ionic-angular';
import { LoginPage } from "../login/login";
import { DataService } from "../../providers/data-service";
import { ProductPage } from "../product/product";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  name: string = "";
  productList: any;
  keys: Array<string>;

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private database: DataService, private zone: NgZone, private alertCtrl: AlertController) {
  }

  ionViewDidLoad(){
    let loginModal = this.modalCtrl.create(LoginPage, {}, {showBackdrop: false, enableBackdropDismiss: false});

    loginModal.onDidDismiss(data => {
      console.log(data);
      this.database.db.ref('/users/' + this.database.uid).on('value', snap => {
        this.zone.run(() => {
          this.name = snap.val().name;
          this.initializeList()
        })
      })

    });
    loginModal.present();
  }

  private viewProductInfo(selectedProduct: any){
    this.navCtrl.push(ProductPage, {product: {productInfo: selectedProduct}, mode: "read"});
  }

  ionViewWillEnter(){
    console.log("ACTIVE");
    this.initializeList();
  }

  initializeList(){
    this.database.db.ref('/users/' + this.database.uid + "/savedProducts").on('value', (snap) => {
      console.log(snap.val());
      if (snap.val() !== null) {
        this.productList = snap.val();
        this.keys = Object.keys(snap.val());
      }
      else{
        this.productList = null;
        this.keys = null;
      }
      console.log(this.keys);
    });
  }

  logout(){
    let confirm = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Logout Cancelled');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            location.reload();
          }
        }
      ]
    });

    confirm.present()
  }

}
