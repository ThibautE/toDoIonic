import { Component } from '@angular/core';
import { AlertController, NavParams, NavController } from 'ionic-angular';
import { Data } from '../../providers/data/data';
import { SportPage } from '../sport/sport';
import { ModifyTaskPage } from '../modify-task/modify-task';

@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html',
})
export class TaskDetailPage {

	id;
	type;
	titre;
	contenu;
	date;
	heure;
	public task : any;

 constructor(public navParams: NavParams, public navCtrl: NavController, public database: Data, public alertCtrl : AlertController) {
  this.getTask();
}

ionViewWillEnter() {
  this.id = this.navParams.get('idTask'); 
  this.getTask();
}

delete(){
  this.database.deleteTask(this.id);
  this.navCtrl.pop();
}

getTask(){
  this.database.getTaskById(this.id).then((data: any) => {
    console.log(data);
    this.task = data;

  }, (error) => {
    console.log(error);
  })
}

startSport(){
  this.navCtrl.push(SportPage, {
  });
}

modifyTask(){
  this.navCtrl.push(ModifyTaskPage, {
    'idTask': this.id,
    'typeTask': this.task[0].type,
    'titreTask': this.task[0].titre,
    'contenuTask': this.task[0].contenu,
    'dateTask': this.task[0].date,
    'heureTask': this.task[0].heure,
    'photoTask': this.task[0].photo,
    'lieuTask': this.task[0].lieu,
    'importantTask': this.task[0].important
  });
}

}
