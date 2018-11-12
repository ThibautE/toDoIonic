import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class Data {

  private db: SQLiteObject;
  params: any;

  constructor(public http: Http, public sqlite: SQLite) {
    this.createDatabaseFile();
  }

  private createDatabaseFile(): void{
      this.sqlite.create({
        name: "dba1.db",
        location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log("bdd created");
        this.db = db;
        this.createTable();
      })
      
      .catch(e => console.log(e));
  }

  private createTable(): void{
    this.db.executeSql('CREATE TABLE IF NOT EXISTS tache(id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, titre TEXT, contenu TEXT, date TEXT, heure TEXT, photo TEXT, lieu TEXT, important INTEGER)', [])
      .then(() => console.log('Executed SQL, table tache created'))
      .catch(e => console.log(e));
  }

  CreateTask(type: string, titre: string, contenu: string, date: string, heure: string, photo: string, lieu: string, important: number){
    return new Promise ((resolve, reject) => {
      let sql = "INSERT INTO tache (type, titre, contenu, date, heure, photo, lieu, important) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      this.db.executeSql(sql, [type, titre, contenu, date, heure, photo, lieu, important]).then((data) =>{
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  GetAllTasks(){
    var today = new Date();
    var d = today.getDate();
    var m = today.getMonth()+1; 
    var y = today.getFullYear();
    var ymd = y+"-"+m+"-"+d;
    console.log('date : '+y +'-'+m+"-"+d);
    return new Promise ((resolve, reject) => {
      this.db.executeSql('SELECT * FROM tache WHERE date>=? ORDER BY date', [ymd]).then((data) => {
        let arrayTasks = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayTasks.push({
              id: data.rows.item(i).id,
              type: data.rows.item(i).type,
              titre: data.rows.item(i).titre,
              contenu: data.rows.item(i).contenu,
              date: data.rows.item(i).date,
              heure: data.rows.item(i).heure,
              photo: data.rows.item(i).photo,
              lieu: data.rows.item(i).lieu,
              important : data.rows.item(i).important,
            });            
          }          
        }
        resolve(arrayTasks);
      }, (error) => {
        reject(error);
      })
    })
  }

  GetAllTasksDisp(){
    return new Promise ((resolve, reject) => {
      this.db.executeSql('SELECT * FROM tache ORDER BY date', []).then((data) => {
        let arrayTasks = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayTasks.push({
              id: data.rows.item(i).id,
              type: data.rows.item(i).type,
              titre: data.rows.item(i).titre,
              contenu: data.rows.item(i).contenu,
              date: data.rows.item(i).date,
              heure: data.rows.item(i).heure,
              photo: data.rows.item(i).photo,
              lieu: data.rows.item(i).lieu,
              important : data.rows.item(i).important,
            });            
          }          
        }
        resolve(arrayTasks);
      }, (error) => {
        reject(error);
      })
    })
  }

  getTaskById(idTask: number){
    return new Promise ((resolve, reject) => {
      let query = "SELECT * FROM tache WHERE id=?";
      this.db.executeSql(query, [idTask]).then( res => {
        let arrayTask = [];
        if (res.rows.length > 0) {
          arrayTask.push({
            type : res.rows.item(0).type,
            titre : res.rows.item(0).titre,
            contenu : res.rows.item(0).contenu,
            date: res.rows.item(0).date,
            heure: res.rows.item(0).heure, 
            photo: res.rows.item(0).photo, 
            lieu: res.rows.item(0).lieu, 
            important: res.rows.item(0).important,
          });                     
        }
        resolve(arrayTask);
      }, (error) => {
        reject(error);
      })
    })
  }

    getTasksByParams(type: string, date: string, titre: string){
      return new Promise ((resolve, reject) => {
        let req = '';
        if(type != null && titre == null && date == null){
          req = 'SELECT * FROM tache WHERE type=? ORDER BY date';
          this.params = type;
        }
        if (date != null && type == null && titre == null){
          req = 'SELECT * FROM tache WHERE date=? ORDER BY date';
          this.params = date;
        }
        if (titre != null && date == null && type == null){
          req = 'SELECT * FROM tache WHERE titre=? ORDER BY date';
          this.params = titre;
        }
        this.db.executeSql(req, [this.params]).then((data) => {
          let arrayTasks = [];
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              arrayTasks.push({
                id: data.rows.item(i).id,
                type: data.rows.item(i).type,
                titre: data.rows.item(i).titre,
                contenu: data.rows.item(i).contenu,
                date: data.rows.item(i).date,
                heure: data.rows.item(i).heure,
                photo: data.rows.item(i).photo,
                lieu: data.rows.item(i).lieu,
                important : data.rows.item(i).important,
              });            
                        console.log('data date' + data.rows.item(i).date)          

            }
          }
          resolve(arrayTasks);
        }, (error) => {
          reject(error);
        })
      })
    }

  deleteTask(idTask){
    return new Promise ((resolve, reject) => {
      this.db.executeSql('DELETE FROM tache WHERE id=?', [idTask])
      .then(res => {
        console.log(res);
        resolve(res);
      }, (error) => {
        reject(error);
      })
    })
  }
}