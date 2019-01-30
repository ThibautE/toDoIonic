import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Data } from '../../providers/data/data';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { MapsPage } from '../maps/maps';
import { HomePage } from '../home/home';

declare let cordova: any;

@Component({
  selector: 'page-create-task',
  templateUrl: 'create-task.html',
})
export class CreateTaskPage {

  myphoto:any;

	date: string = '';
	heure: string = '';
	type: string = '';
	titre: string = '';
	contenu: string = '';
  lieu: string = '';
  importantBool : boolean = false;
  important: number;

  constructor(public navCtrl: NavController, public view: ViewController, private database: Data, private camera: Camera, public actionSheetCtrl: ActionSheetController, public params: NavParams) {  
    this.lieu = this.params.get('place');
    this.date = this.params.get('date');
    this.type = this.params.get('type');
    this.titre = this.params.get('titre');
    this.myphoto = this.params.get('photo');
    this.contenu = this.params.get('contenu');
    this.important = this.params.get('important');
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Ajouter une photo',
      buttons: [
        {
          text: 'Prendre une photo',
          handler: () => {
            this.takePhoto();
          }
        },{
          text: 'Importer une photo',
          handler: () => {
            this.getImage();
          }
        },{
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  getImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  saveTask() {
    if (this.importantBool == false) {
      this.important = 0;
    }else if(this.importantBool == true){
      this.important = 1;
      let maDate = new Date(this.date);
      let monHeure = new Date('October 13, 2014 ' + this.heure);
      let an = maDate.getFullYear();
      let mois = maDate.getMonth();
      let jour = maDate.getDate();
      let h = monHeure.getHours();
      let m = monHeure.getMinutes();
      console.log(an + ' ' + mois + ' ' + jour + ' ' + h + ' ' + m);
      if(this.type == "Sport"){
        cordova.plugins.notification.local.schedule({
          title: this.titre,
          text: "Cliquez ici si vous souhaitez démarrer votre activité sportive",
          at: new Date(an, mois, jour, h, m)
        });
      }else{
        cordova.plugins.notification.local.schedule({
          title: this.titre,
          text: this.contenu,
          at: new Date(an, mois, jour, h, m)
        });
      }
      
    }
    
    this.database.CreateTask(this.type, this.titre, this.contenu, this.date, this.heure, this.myphoto, this.lieu, this.important).then((data) => {
        console.log("info :" + data);
        this.navCtrl.push(HomePage, {});

      }, (error) => {
        console.log("erreur " + error);
      })
  }


  ionViewDidLoad() {
    
  }

  addPlaces(){
    this.navCtrl.push(MapsPage, {
      type: this.type,
      titre: this.titre,
      contenu: this.contenu,
      date: this.date,
      heure: this.heure,
      photo: this.myphoto,
      important: this.important
    });
  }

}