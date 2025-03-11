import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
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
  constructor(private router:Router, private readonly _voiceService:VoiceService, private readonly _http:HttpClient) {
  }

  loginForm = new FormGroup({
    loginId: new FormControl('')
  })

  public formSubmit():void {
    this._http.put("https://kate-voice-backend-2ad12d55f690.herokuapp.com/",{}).subscribe(value => console.log(value))
    this.redirect(this.loginForm.get('loginId')?.value?.toLowerCase() === "jf29771")
  }

  private redirect(shouldRoute:boolean){
    if(shouldRoute){

      this._voiceService.setId(this.loginForm.get('loginId')!.value!.toLowerCase())
    this.router.navigate(['/voice'])
    }
    else{
      alert("incorrect user")
    }
  }
}
