import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {VoiceService} from "../voice.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {finalize, tap} from "rxjs";

// export interface AudioResponse {
//   inputStreamResource:string,
//
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, HttpClientModule]
})
export class LoginComponent {
   languages:string[] = [];
   shouldBeVisible = true;
  constructor(private router:Router, private readonly _voiceService:VoiceService, private readonly _http:HttpClient) {
  }

  loginForm = new FormGroup({
    loginId: new FormControl('')
  })

  public getLanguages():void {
    this._http.post<string[]>("https://kate-voice-backend-2ad12d55f690.herokuapp.com/languages/" + this.getLoginId(),{}).subscribe(value => {
      this.shouldBeVisible = false;
      this.languages = value;
    });
  }

  private getLoginId():string{
    return this.loginForm.get('loginId')?.value!;
  }

  private redirect(shouldRoute:boolean){
    if(shouldRoute){
      this._voiceService.setId(this.getLoginId().toLowerCase());
      this.router.navigate(['/voice']);
    }
    else{
      alert("incorrect user");
    }
  }

  getAudio(language:string) {
    this._http.post("https://kate-voice-backend-2ad12d55f690.herokuapp.com/audio/"  + this.getLoginId() + "/"+language,{},{responseType:"blob"}).pipe(
        tap((value)=> {
          const audioUrl = URL.createObjectURL(value)
          const audio = new Audio(audioUrl)
          audio.play();
        }),
        finalize(()=> console.log("fin"))
    ).subscribe();

  }
}
