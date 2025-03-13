import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoiceService {
    private id:string | null = '';
    private selectedLanguage:string | null = '';

    getSelectedLanguage():string | null{
        return this.selectedLanguage;
}

setSelectedLanguage(newLanguage:string){
        this.selectedLanguage = newLanguage;
}
    getId():string | null{
     return this.id
   }

   setId(newId:string | null){
     this.id = newId
   }
  constructor() { }
}
