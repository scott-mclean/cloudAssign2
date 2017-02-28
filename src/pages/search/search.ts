import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Jsonp, URLSearchParams } from "@angular/http";
import { ResultsPage } from "../results/results";

import 'rxjs/add/operator/map';

// GET Request sample Code
// GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  apiKey: string = 'MDpiYjk1NjkwYy1mZDQ5LTExZTYtOWM2ZS00N2ZiOTMxOTY5MzI6NWRNYldhdmJrTExmRW1JVkwyN2VnTDlvQm80WnlMZjhBOEYz'
  site : string = 'https://lcboapi.com/products';
  product : string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private jsonp: Jsonp) {

  }

  searchProductByName(){
    console.log('Search click');
    let siteSearch = this.site;
    let params = new URLSearchParams();
    params.append('access_key', this.apiKey);
    params.append('name', this.product);
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    console.log(params.toString());
    this.jsonp.get(siteSearch, { search : params }).map(res => res.json())
    .subscribe(
      reply => {
        this.navCtrl.push(ResultsPage, reply)
      },
      error => console.warn("Error: ", error)
    )
  }

}
