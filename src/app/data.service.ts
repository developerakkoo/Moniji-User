import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage: Storage) {
    this.create()
   }

   create(){
    this.storage.create();
   }

   get(key:any){
    return this.storage.get(key);
   }

   set(key: any, value: any){
    return this.storage.set(key, value);
   }

   remove(key:any){
    return this.storage.remove(key);
   }

   clearAll(){
    return this.storage.clear();
   }
}
