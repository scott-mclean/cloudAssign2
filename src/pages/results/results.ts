import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductPage } from "../product/product";
import { SearchPage } from "../search/search";
import {URLSearchParams, Http} from "@angular/http";

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
  pageNum: number = 1;
  apiKey: string = 'MDpiYjk1NjkwYy1mZDQ5LTExZTYtOWM2ZS00N2ZiOTMxOTY5MzI6NWRNYldhdmJrTExmRW1JVkwyN2VnTDlvQm80WnlMZjhBOEYz';
  query: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.searchResults = this.navParams.get('result');
    console.log(this.searchResults);
  }

  private viewProductInfo(product: any){
    this.navCtrl.push(ProductPage, { product: product, mode: "search"});
  }
  private increasePage() {
    this.pageNum++;
    this.searchProductByName(this.pageNum + "");
  }

  private decreasePage() {
    if (this.pageNum > 1) {
      this.pageNum--;
      this.searchProductByName(this.pageNum + "");
    }
  }

  private searchProductByName(pageNum: string) {
    // console.log('Search click');
    let siteSearch = 'http://localhost:8100/api'; //Change to actual for hosting
    let params = new URLSearchParams();
    params.append('access_key', this.apiKey);
    this.query = this.navParams.get('query').split(' ').join('+');
    // console.log("Query:", this.query);
    params.append('q', this.query);
    params.append("page", pageNum);
    // console.log(params.toString());
    this.query = params.toString();
    this.http.get(siteSearch, { search : params }).map(res => res.json())
      .subscribe(
        reply => {
          // console.log("THIS IS THE DATA", reply);
          this.searchResults = reply.result;
        },
        error => console.warn("Error: ", error)
      )
  }
}
