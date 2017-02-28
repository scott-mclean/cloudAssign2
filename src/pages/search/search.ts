import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from "@angular/http";
import { ResultsPage } from "../results/results";

// GET Request sample Code
// GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  apiKey: string = 'MDpiYjk1NjkwYy1mZDQ5LTExZTYtOWM2ZS00N2ZiOTMxOTY5MzI6NWRNYldhdmJrTExmRW1JVkwyN2VnTDlvQm80WnlMZjhBOEYz';
  queryString: string = 'https://lcboapi.com/products?access_key=';

  titlePrefix: string = "intitle:";
  authorPrefix: string = "inauthor:";
  publisherPrefix: string = "inpublisher:";
  subjectPrefix: string = "subject:";
  isbnPrefix: string = "isbn:";
  lccnPrefix: string = "lccn:";
  oclcPrefix: string = "oclc:";

  title: string = "";
  author: string = "";
  publisher: string = "";
  subject: string = "";
  isbn: string = "";
  lccn: string = "";
  oclc: string = "";

  c_title: string;
  c_author: string;
  c_publisher: string;
  c_subject: string;
  c_isbn: string;
  c_lccn: string;
  c_oclc: string;

  cQuery: string;
  nospaceQuery: string;

  results: JSON;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {

  }

  searchProductByName(){
    // Generate Search Query
    this.title === "" ? this.c_title = "" : this.c_title = this.titlePrefix + this.title;
    this.author === "" ? this.c_author = "" : this.c_author =  "+" + this.authorPrefix + this.author;
    this.publisher === "" ? this.c_publisher = "" : this.c_publisher = "+" + this.publisherPrefix + this.publisher;
    this.subject === "" ? this.c_subject = "" : this.c_subject = "+" + this.subjectPrefix + this.subject;
    this.isbn === "" ? this.c_isbn = "" : this.c_isbn = "+" + this.isbnPrefix + this.isbn;
    this.lccn === "" ? this.c_lccn = "" : this.c_lccn = "+" + this.lccnPrefix + this.lccn;
    this.oclc === "" ? this.c_oclc = "" : this.c_oclc = "+" + this.oclcPrefix + this.oclc;

    this.cQuery = this.queryString
    + this.c_title
    + this.c_author
    + this.c_publisher
    + this.c_subject
    + this.c_isbn
    + this.lccn
    + this.oclc
    + this.apiKey;

    this.nospaceQuery = this.cQuery.split(' ').join('+');
    console.log("QUERY STRING:", this.nospaceQuery);

    this.http.get(this.nospaceQuery)
      .map(res => res.json())
      .subscribe(
        reply => {
          this.results = reply;
          this.navCtrl.push(ResultsPage, this.results);
        },
        error => console.warn("Error:", error)
      )
  }

}
