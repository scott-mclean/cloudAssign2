import { Component, DoCheck } from "@angular/core";
import { NavController, NavParams, ViewController, AlertController } from "ionic-angular";
import { DataService } from "../../providers/data-service";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage implements DoCheck {

  registrationError: boolean;
  passwordMismatch: boolean;
  newCredentials: any;
  errorMessage: string;

  ngDoCheck(): void {
    this.passwordMismatch = (this.newCredentials.password !== this.newCredentials.confirmPassword)
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DataService, private viewCtrl: ViewController, private alertCtrl: AlertController) {
    this.registrationError = false;
    this.newCredentials = {}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  AccountRegister() {
    this.database.auth.createUserWithEmailAndPassword(this.newCredentials.email, this.newCredentials.confirmPassword)
      .then((info) => {
        console.log("Registered: ", info);
        this.createNewUserEntry(info.uid);
        this.Dismiss(info.uid);
        this.showRegisteredMessage();
        this.database.uid = info.uid;
      }, (error) => {
        // Handle Errors here.
        this.errorMessage = error.message;
        console.log("Error: ", this.errorMessage);
        this.registrationError = true;
        // ...
      });
  }

  Dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  private showRegisteredMessage() {
    let alert = this.alertCtrl.create({
      title: 'Registration Successful',
      subTitle: 'You have been logged into your new account',
      buttons: ['Ok']
    });
    alert.present();
  }

  private createNewUserEntry(uid: string) {
    this.database.db.ref('users/' + uid).set({
      name: this.newCredentials.name
    });
  }
}
