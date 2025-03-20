import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {VoiceService} from "../voice.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, HttpClientModule]
})
export class LoginComponent {
   languages: string[] | undefined;
   shouldBeVisible = true;
  constructor(private router:Router, private readonly _voiceService:VoiceService, private readonly _http:HttpClient) {
  }

  loginForm = new FormGroup({
    loginId: new FormControl('')
  })

  public getLanguages():void {
    this._http.get<string[]>("https://kate-voice-backend-2ad12d55f690.herokuapp.com/languages/" + this.getLoginId().toUpperCase(),{}).subscribe((value:string[])  => {
      // if (!this.checkForUser(value)){
      //   alert("incorrect user")
      //   this.loginForm.reset()
      //   return;
      // }
      this.shouldBeVisible = false;
      this.languages = value;
    });
  }

  // private checkForUser(array:string[]):boolean{
  //   return !array.includes("User not found");
  // }
  private getLoginId():string{
    return this.loginForm.get('loginId')?.value!;
  }

  private redirect(shouldRoute:boolean){
    if(shouldRoute){
      this._voiceService.setId(this.getLoginId().toUpperCase());
      this.router.navigate(['/voice']);
    }
    else{
      alert("incorrect user");
    }
  }

  selectLanguage(language:string) {
    this._voiceService.setSelectedLanguage(language);
    this.redirect(true)
  }
}
