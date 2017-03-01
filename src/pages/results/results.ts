import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductPage } from "../product/product";
import { SearchPage } from "../search/search";

/*
  Generated class for the SearchResults page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-results',
  templateUrl: 'results.html'
})
export class ResultsPage {

  searchResults: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.searchResults = this.navParams.get('result');
    console.log(this.searchResults);
  }

  private viewProductInfo(product: any){
    this.navCtrl.push(ProductPage, { product: product, mode: "search"});
  }
/*
  private increasePage() {
    SearchPage.pageNum++;
    SearchPage.searchProductByName();
  }

  private decreasePage() {
    if (SearchPage.pageNum > 1) {
      SearchPage.pageNum--;
      SearchPage.searchProductByName();
    }
  }
*/
}
