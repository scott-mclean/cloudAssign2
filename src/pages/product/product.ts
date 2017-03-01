import { Component} from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { DataService } from "../../providers/data-service";
import { ResultsPage } from "../results/results";

/*
 Generated class for the BookInfo page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {

  productObject: any;
  mode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DataService, private alertCtrl: AlertController) {
    this.productObject = this.navParams.get('product').name;
    this.mode = this.navParams.get('mode');
    console.log(this.productObject);
    console.log("Mode: ", this.mode);
  }

  databaseSaveProduct() {
    this.database.db.ref('/users/' + this.database.uid + "/savedProducts").push(this.productObject);
    let alert = this.alertCtrl.create({
      title: 'Saved',
      subTitle: 'Added <em>' + this.productObject.name + '</em> to your saved products',
      buttons: ['Ok']
    });
    alert.present();
    this.navCtrl.pop();
  }

  databaseDeleteProduct() {
    let confirm = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete <em>' + this.productObject.name + '</em> from your saved products?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cancel Delete');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let keys;
            let key;
            console.log('Delete Product');
            this.database.db.ref('/users/' + this.database.uid + "/savedProducts").on('value', (snap) => {
              if (snap.val()) {
                keys = Object.keys(snap.val());
                for (let thiskey of keys) {
                  if (snap.val()[thiskey].name === this.productObject.name) {
                    key = thiskey;
                    break;
                  }
                }
                this.database.db.ref('/users/' + this.database.uid + "/savedProducts").child(key).remove().then(() => {
                  console.log('Product Deleted');
                }).catch((error) => {
                  console.warn("Error: ", error.message)
                });
              }
            });
            this.navCtrl.pop();
          }
        }
      ]
    });

    confirm.present()
  }

}
