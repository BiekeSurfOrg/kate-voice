import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  standalone:true
})
export class VoiceComponent implements OnInit{
  @ViewChild("ratingHolder",{static:false}) ratingHolder?:ElementRef;
  ngOnInit(): void {
    this.evaluateForm.get('textToEvaluate')?.setValue("sample text")
  }

  evaluateForm = new FormGroup({
    textToEvaluate: new FormControl(''),
    rating: new FormControl(1),
    comment: new FormControl(''),

  })
  public formSubmit() {
    console.log(this.evaluateForm.value);
  }

  public setRating(rating:number){
    const elementChildren:HTMLCollection = this.ratingHolder?.nativeElement.children;
    for (let i = 0; i < 5; i++) {
      if (i < rating ){
      elementChildren[i].innerHTML = "★"
      }
      else
        elementChildren[i].innerHTML = "☆"
    }
    this.evaluateForm.get('rating')?.setValue(rating);
  }
}
