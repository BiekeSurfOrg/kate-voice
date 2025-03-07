import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoiceService {
   public id:string | null = '';
   getId():string | null{
     return this.id
   }

   setId(newId:string | null){
     this.id = newId
   }
  constructor() { }
}
