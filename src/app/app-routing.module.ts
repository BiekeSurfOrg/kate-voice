import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {VoiceComponent} from "./voice/voice.component";

const routes: Routes = [
  {path:'login', component:LoginComponent, pathMatch:'full'},
  {path:'voice', component:VoiceComponent},
  {path:'', redirectTo:'/login', pathMatch:"full"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
