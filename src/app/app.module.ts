import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

//pages
import { CreateTaskPage } from '../pages/create-task/create-task';
import { HomePage } from '../pages/home/home';
import { TaskDetailPage } from '../pages/task-detail/task-detail';
import { MapsPage } from '../pages/maps/maps';
import { SportPage } from '../pages/sport/sport';
import { OptionsPage } from '../pages/options/options';
import { ModifyTaskPage } from '../pages/modify-task/modify-task';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Data } from '../providers/data/data';

import { Pedometer } from '@ionic-native/pedometer';
import { Stepcounter } from '@ionic-native/stepcounter';
import { SQLite } from '@ionic-native/sqlite';
import { Camera } from '@ionic-native/camera';
//maps
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';


@NgModule({
  declarations: [
    MyApp,
    CreateTaskPage,
    HomePage,
    TaskDetailPage,
    MapsPage,
    SportPage,
    OptionsPage,
    ModifyTaskPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CreateTaskPage,
    HomePage,
    TaskDetailPage,
    MapsPage,
    SportPage,
    OptionsPage,
    ModifyTaskPage
  ],
  providers: [
    StatusBar,
    Camera,
    SQLite,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    NativeGeocoder,
    Data,
    Pedometer,
    Stepcounter 
  ]
})
export class AppModule {}
