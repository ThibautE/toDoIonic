import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Stepcounter } from '@ionic-native/stepcounter';

@Component({
  selector: 'page-sport',
  templateUrl: 'sport.html',
})
export class SportPage {

  steps : String = 'Démarrer';
  count = 0;
  started : Boolean = false;
  task;

  constructor(public navCtrl: NavController, public navParams: NavParams, private stepcounter: Stepcounter) {
  }

  startSport(){
    if(this.started == true){
      clearInterval(this.task);
      this.stepcounter.stop();
      this.steps = 'Remettre à zéro';
      this.started = false;
    }else{
      let startingOffset = 0;
      this.stepcounter.start(startingOffset).then(onSuccess => console.log('stepcounter-start success', onSuccess), onFailure => console.log('stepcounter-start error', onFailure));
      this.task = setInterval(() => { this.getSteps() }, 100);
      this.started = true;
    }
  }

  async getSteps(){
    this.count = (await this.stepcounter.getStepCount()).toString();
  }

}