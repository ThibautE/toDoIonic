import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { Data } from '../../providers/data/data';
import { HomePage } from '../home/home';
import { MapsPage } from '../maps/maps';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';


declare let cordova: any;

@Component({
  selector: 'page-modify-task',
  templateUrl: 'modify-task.html',
})
export class ModifyTaskPage {

  id;
	type;
	titre;
	contenu;
	date;
  heure;
  photo;
  lieu;
  important;
	public task : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: Data, public alertCtrl : AlertController, public actionSheetCtrl: ActionSheetController, private camera: Camera) {
  }

  ionViewWillEnter() {
    this.id = this.navParams.get('idTask'); 
    this.type = this.navParams.get('typeTask'); 
    this.titre = this.navParams.get('titreTask'); 
    this.contenu = this.navParams.get('contenuTask'); 
    this.date = this.navParams.get('dateTask'); 
    this.heure = this.navParams.get('heureTask'); 
    this.photo = this.navParams.get('photoTask'); 
    this.lieu = this.navParams.get('lieuTask');
    this.important = this.navParams.get('importantTask'); 
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

  changeTask(){
    if (this.important == false) {
      this.important = 0;
    }else if(this.important == true){
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
    
    this.database.UpdateTask(this.type, this.titre, this.contenu, this.date, this.heure, this.photo, this.lieu, this.important, this.id).then((data) => {
        console.log("info :" + data);
        this.navCtrl.push(HomePage, {});
      }, (error) => {
        this.navCtrl.push(HomePage, {});
        console.log(error);
      })
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
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
      this.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }

  addPlaces(){
    this.navCtrl.push(MapsPage, {
      modify: 'modif',
      type: this.type,
      titre: this.titre,
      contenu: this.contenu,
      date: this.date,
      heure: this.heure,
      photo: this.photo,
      important: this.important
    });
  }
}
