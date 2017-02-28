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
    const firebaseConfig  = {
      apiKey : "AIzaSyC0TQ79z-ZWvE8pwWi04bQ4Pl5oJv3JFbs",
      authDomain: "cloudassign2-285d7.firebaseapp.com",
      databaseURL: "https://cloudassign2-285d7.firebaseio.com",
      storageBucket: "cloudassign2-285d7.appspot.com",
      messagingSenderId: "604482624287"
    };

    firebase.initializeApp(firebaseConfig); 
    this.db = firebase.database();
    this.auth = firebase.auth();
    this.users = this.db.ref('users');
    this.ref = this.db.ref();
  }
}
/*

<script src="https://www.gstatic.com/firebasejs/3.6.10/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: ,
    authDomain: "cloudassign2-285d7.firebaseapp.com",
    databaseURL: "https://cloudassign2-285d7.firebaseio.com",
    storageBucket: "cloudassign2-285d7.appspot.com",
    messagingSenderId: "604482624287"
  };
  firebase.initializeApp(config);
</script>
*/
