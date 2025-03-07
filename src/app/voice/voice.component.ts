import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {VoiceService} from "../voice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  standalone:true
})
export class VoiceComponent implements OnInit{
  @ViewChild("ratingHolder",{static:false}) ratingHolder?:ElementRef;
  constructor(private readonly _voiceService:VoiceService, private readonly _router:Router) {
    if (!_voiceService.getId()){
      this._router.navigate(['/login'])
    }
  }
  ngOnInit(): void {
    this.evaluateForm.get('userId')?.setValue(this._voiceService.getId())
    this.evaluateForm.get('textToEvaluate')?.setValue("sample text sample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample textsample text")
  }

  evaluateForm = new FormGroup({
    userId: new FormControl(''),
    textToEvaluate: new FormControl(''),
    rating: new FormControl(0),
    comment: new FormControl(''),

  })
  public formSubmit() {
    if (!this.evaluateForm.get('rating')?.value){
      alert('Please rate the text')
      return
    }
    console.log(this.evaluateForm.value);
  }

  public setRating(rating:number){
    const elementChildren:HTMLCollection = this.ratingHolder?.nativeElement.children;
    this.fillStars(elementChildren, rating)
    this.evaluateForm.get('rating')?.setValue(rating);
  }

  private fillStars(elementCollection:HTMLCollection, rating:number){
    for (let i = 0; i < 5; i++) {
      if (i < rating ){
        elementCollection[i].innerHTML = "★"
      }
      else
        elementCollection[i].innerHTML = "☆"
    }
  }
  public fillStartsOnMouseLeave():void{
    const elementChildren:HTMLCollection = this.ratingHolder?.nativeElement.children;
    this.fillStars(elementChildren, this.evaluateForm.get('rating')?.value!)

  }
 public getCoordinates(e:MouseEvent) {
    const elementChildren:HTMLCollection = this.ratingHolder?.nativeElement.children;
   const element = document.elementFromPoint(e.clientX, e.clientY)
    if (element){
      const elementId = Number(element.id)
      this.fillStars(elementChildren,elementId)
    }
  }

}
