import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { TaskDetailPage } from '../task-detail/task-detail';
import { Data } from '../../providers/data/data';
import { CreateTaskPage } from '../create-task/create-task';
import { OptionsPage } from '../options/options';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	public tasks : any;
  public tacheDate: string;

  filtre: any;
  type: any = '';
  date: any = '';
  titre: any = '';
  disp: number = 0;

  constructor(public navCtrl: NavController, public database: Data, public params: NavParams, public modalCtrl : ModalController) {
    this.filtre = this.params.get('filtre');
    this.type = this.params.get('type');
    this.date = this.params.get('date');
    this.titre = this.params.get('titre');
    this.tacheDate = "Afficher toutes les tâches";
  }

  afficher(){
    if(this.disp == 0){
      this.loadAllTaskDisp();
      this.disp = 1;
      this.tacheDate = "Masquer les anciennes tâches";

    }else{
      this.loadTask();
      this.disp = 0;
      this.tacheDate = "Afficher toutes les tâches";
    }

  }

  ionViewWillEnter() {
    this.loadTask();
    var today = new Date();
    var d = today.getDate();
    var m = today.getMonth()+1;
    var y = today.getFullYear();
    console.log('date : '+y +'-'+m+"-"+d);
  }

  createTask(){
  	this.navCtrl.push(CreateTaskPage, {});
  }

  loadTask(){
    if(this.filtre != null){
      this.database.getTasksByParams(this.type, this.date, this.titre).then((data: any) => {
        console.log(data);
        this.tasks = data;
      }, (error) => {
        console.log(error);
      })
    }else{
     this.database.GetAllTasks().then((data: any) => {
      console.log(data);
      this.tasks = data;
    }, (error) => {
      console.log(error);
    })
   }
  }

  loadAllTaskDisp(){
     this.database.GetAllTasksDisp().then((data: any) => {
      console.log(data);
      this.tasks = data;
    }, (error) => {
      console.log(error);
    })
  }

  deleteTask(id){
    this.database.deleteTask(id);
    this.navCtrl.setRoot(this.navCtrl.getActive().component);

  }

 
  viewTask(idTask){
    this.navCtrl.push(TaskDetailPage, {
      idTask: idTask
    });
  }

  chooseOptions(){
    this.navCtrl.push(OptionsPage, {});
  }

}
