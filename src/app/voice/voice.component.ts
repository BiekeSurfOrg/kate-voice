import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {VoiceService} from "../voice.service";
import {Router} from "@angular/router";
import {finalize, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  standalone:true
})
export class VoiceComponent implements OnInit{
  @ViewChild("ratingHolder",{static:false}) ratingHolder?:ElementRef;
  @ViewChild("wordCounterHolder",{static:false}) wordCounterHolder?:ElementRef;

  public wordCounter:number = 0;
  public maxWordCount:number =500;
  private audio!:HTMLAudioElement;
  constructor(private readonly _voiceService:VoiceService, private readonly _router:Router, private readonly _http:HttpClient) {
    if (!_voiceService.getId()){
      this._router.navigate(['/login'])
    }
  }
  ngOnInit(): void {
  this.getAudio();
    this.evaluateForm.get('userId')?.setValue(this._voiceService.getId())
    this.evaluateForm.get('comment')!.valueChanges.subscribe(value => value !== null ? this.wordCounter = value!.length: this.wordCounter = 0)
  }

  evaluateForm = new FormGroup({
    userId: new FormControl(''),
    textToEvaluate: new FormControl(''),
    rating: new FormControl(0),
    comment: new FormControl(''),

  });

  private getAudio(){
    this._http.post<{audio:string,text:string}>("https://kate-voice-backend-2ad12d55f690.herokuapp.com/audio/"  + this._voiceService.getId() + "/"+this._voiceService.getSelectedLanguage(),{}).pipe(
      tap((value)=> {
        this.evaluateForm.get('textToEvaluate')?.setValue(value.text);
        this.audio = new Audio("data:audio/wav;base64," + value.audio);
      }),
      finalize(()=> console.log("fin"))
    ).subscribe();

  }

  public formSubmit() {
    if (!this.evaluateForm.get('rating')?.value){
      alert('Please rate the text')
      return
    }
    this.evaluateForm.reset();
    const elementChildren:HTMLCollection = this.ratingHolder?.nativeElement.children;
    this.fillStars(elementChildren, 0);
    this.getAudio();
    console.log(this.evaluateForm.value);
  }

  public setRating(rating:number){
    const elementChildren:HTMLCollection = this.ratingHolder?.nativeElement.children;
    this.fillStars(elementChildren, rating)
    this.evaluateForm.get('rating')?.setValue(rating);
  }

  private fillStars(elementCollection:HTMLCollection, rating:number):void{
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

  playAudio():void {
    this.audio.play();
  }
}
