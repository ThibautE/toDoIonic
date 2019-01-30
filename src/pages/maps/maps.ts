import { Component, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController, ModalController, NavParams, NavController } from 'ionic-angular';
import { CreateTaskPage } from '../create-task/create-task';
import 'rxjs/add/operator/map';
import { ModifyTaskPage } from '../modify-task/modify-task';

@Component({
	selector: 'page-maps',
	templateUrl: 'maps.html'
})
export class MapsPage {

	map: any;
	markers: any;
	autocomplete: any;
	GoogleAutocomplete: any;
	GooglePlaces: any;
	autocompleteItems: any;
	loading: any;

	modif;

	lat : any;
	lng : any;
	place : any;
	place2 : any;

	date: string = '';
	heure: string = '';
	type: string = '';
	titre: string = '';
	contenu: string = '';
	lieu: string = '';
	important: number;
	photo: any;

	constructor(public navCtrl: NavController, public zone: NgZone, public geolocation: Geolocation, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public params: NavParams) {
		this.lieu = this.params.get('lieu');
		this.date = this.params.get('date');
		this.heure = this.params.get('heure');
		this.type = this.params.get('type');
		this.titre = this.params.get('titre');
		this.photo = this.params.get('photo');
		this.contenu = this.params.get('contenu');
		this.important = this.params.get('important');
		this.modif = this.params.get('modify');

		this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
		this.autocomplete = {
			input: ''
		};
		this.autocompleteItems = [];
		this.markers = [];
		this.loading = this.loadingCtrl.create();
	}

	ionViewDidEnter(){

	}

	updateSearchResults(){
		if (this.autocomplete.input == '') {
			this.autocompleteItems = [];
			return;
		}
		this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
			(predictions, status) => {
				this.autocompleteItems = [];
				if(predictions){
					this.zone.run(() => {
						predictions.forEach((prediction) => {
							this.autocompleteItems.push(prediction);
						});
					});
				}
			});
	}

	selectPlace(item){
		this.clearMarkers();
		let placeSelected = item;
		if(this.modif == 'modif'){
			this.navCtrl.push(ModifyTaskPage, {
				typeTask: this.type,
				titreTask: this.titre,
				contenuTask: this.contenu,
				dateTask: this.date,
				heureTask: this.heure,
				photoTask: this.photo,
				importantTask: this.important,
				lieuTask: placeSelected
			});
		}else{
			this.navCtrl.push(CreateTaskPage, {
				type: this.type,
				titre: this.titre,
				contenu: this.contenu,
				date: this.date,
				heure: this.heure,
				photo: this.photo,
				important: this.important,
				place: placeSelected
			});
		}
	}

	clearMarkers(){
		for (var i = 0; i < this.markers.length; i++) {
			console.log(this.markers[i])
			this.markers[i].setMap(null);
		}
		this.markers = [];
	}

}
