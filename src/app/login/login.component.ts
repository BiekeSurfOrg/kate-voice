import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule]
})
export class LoginComponent {
  constructor(private router:Router) {
  }

  loginForm = new FormGroup({
    loginId: new FormControl('')
  })

  public formSubmit():void {
    this.redirect(this.loginForm.get('loginId')?.value === "jf29771")
  }

  private redirect(shouldRoute:boolean){
    if(shouldRoute)
    this.router.navigate(['/voice'])
    else
      alert("incorrect user")
  }
}
