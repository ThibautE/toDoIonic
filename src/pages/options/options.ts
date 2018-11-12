import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home'; 

@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

	filtre: any;
	type: any;
	date: any;
	titre: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }

  search(){
  	this.navCtrl.push(HomePage, { 
  		filtre : this.filtre,
  		type : this.type,
  		date : this.date,
  		titre : this.titre
  	});
  }

}
