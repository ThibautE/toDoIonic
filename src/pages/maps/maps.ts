import { Component, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController, ModalController, NavParams, NavController } from 'ionic-angular';
import { CreateTaskPage } from '../create-task/create-task';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import 'rxjs/add/operator/map';

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

	constructor(public navCtrl: NavController, public zone: NgZone, public geolocation: Geolocation, public loadingCtrl: LoadingController, public modalCtrl: ModalController, private nativeGeocoder: NativeGeocoder, public params: NavParams) {
		this.lieu = this.params.get('lieu');
		this.date = this.params.get('date');
		this.type = this.params.get('type');
		this.titre = this.params.get('titre');
		this.photo = this.params.get('photo');
		this.contenu = this.params.get('contenu');
		this.important = this.params.get('important');

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

	tryGeolocation(){
		this.loading.present();
	    this.clearMarkers();//remove previous markers

	    this.geolocation.getCurrentPosition().then((resp) => {
	    	this.lat = resp.coords.latitude;
	    	this.lng = resp.coords.longitude;
	    	this.loading.dismiss();

	    }).catch((error) => {
	    	this.place2 = 'erreur';
	    	this.loading.dismiss();
	    });

	    this.reverseGeocoder(52.5072095, 13.1452818);
	}

	reverseGeocoder(lat : number, lng : number) : Promise<any>{
   		return new Promise((resolve, reject) =>{
      		this.nativeGeocoder.reverseGeocode(lat, lng)
      			.then((result : NativeGeocoderReverseResult[]) =>{
         			let str : string   = 'The reverseGeocode address is ${result.street} in ${result.countryCode}';
         			console.log(str);
         			resolve(str);
      			})
      			.catch((error: any) =>{
         			reject(error);
      			});
   		});
	}

	selectPlace(item){
		this.clearMarkers();
		let placeSelected = item;
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

	clearMarkers(){
		for (var i = 0; i < this.markers.length; i++) {
			console.log(this.markers[i])
			this.markers[i].setMap(null);
		}
		this.markers = [];
	}

}