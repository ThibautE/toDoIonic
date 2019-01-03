import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Stepcounter } from '@ionic-native/stepcounter';

@Component({
  selector: 'page-sport',
  templateUrl: 'sport.html',
})
export class SportPage {

	private steps : String = 'Démarrer';
  	private started : Boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private stepcounter: Stepcounter) {
  }

  startSport(){
    let task;

    if(this.started == true){
      clearInterval(task);
      this.stepcounter.stop();
      this.steps = 'Start';
      this.started = false;
    }else{
      this.stepcounter.start(0).then(onSuccess => console.log('stepcounter-start success', onSuccess), onFailure => console.log('stepcounter-start error', onFailure));

      task = setInterval(() => {
        this.getSteps();
      }, 2000);

      this.started = true;
    }
  }

  async getSteps(){
    this.steps = (await this.stepcounter.getStepCount()).toString();
  }

}




