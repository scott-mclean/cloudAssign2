import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from "firebase";

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {

  public db : any;
  public auth: any;
  public users: any;
  public ref: any;
  public uid: any;

  constructor() {
  }

  init() {
    /*
    apiKey: "AIzaSyAWHO3zT_Sjxm16CV99VvNdfNiB-SfwZ14",
    authDomain: "cloudassign1.firebaseapp.com",
    databaseURL: "https://cloudassign1.firebaseio.com",
    storageBucket: "cloudassign1.appspot.com",
    messagingSenderId: "54996453160"
    */
    const firebaseConfig  = {
      apiKey : "AIzaSyAWHO3zT_Sjxm16CV99VvNdfNiB-SfwZ14",
      authDomain: "cloudassign1.firebaseapp.com",
      databaseURL: "https://cloudassign1.firebaseio.com",
      storageBucket: "cloudassign1.appspot.com",
      messagingSenderId: "54996453160"
    };

    firebase.initializeApp(firebaseConfig);
    this.db = firebase.database();
    this.auth = firebase.auth();
    this.users = this.db.ref('users');
    this.ref = this.db.ref();
  }
}
