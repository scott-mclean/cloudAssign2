import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Jsonp, URLSearchParams, Http } from "@angular/http";
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

  // TODO: Remeber to change the port number as necessary.
  site : string = 'http://localhost:8100/api';
  product : string = "";
  query : string = "";
  pageNum : number = 1;
  reply : Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private jsonp: Jsonp, private http: Http) {

  }

  searchProductByName(){
    console.log('Search click');
    let siteSearch = this.site;
    let params = new URLSearchParams();
    params.append('access_key', this.apiKey);
    this.query = this.product.split(' ').join('+');
    params.append('q', this.query);
    params.append("page", this.pageNum.toString());
    //params.set('action', 'opensearch');
    //params.set('format', 'json');
    //params.set('callback', 'JSONP_CALLBACK');
    console.log(params.toString());
    this.query = params.toString();
    this.http.get(siteSearch, { search : params }).map(res => res.json())
    .subscribe(
      reply => {
        console.log(reply);
        this.reply = reply;
        this.navCtrl.push(ResultsPage, reply)
      },
      error => console.warn("Error: ", error)
    )
  }

}
