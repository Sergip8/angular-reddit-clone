import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SubredditService } from "src/app/services/subreddit.service";



const ramdomR = Math.floor(Math.random() * (255 - 0) + 0);
const ramdomG = Math.floor(Math.random() * (255 - 0) + 0);
const ramdomB = Math.floor(Math.random() * (255 - 0) + 0);
@Component({
    selector: 'app-subreddit-create-form',
    templateUrl: './subreddit-create-form.component.html',
    styleUrls: ["./subreddit-create-form.component.css"]
  })
  export class SubredditCreate implements OnInit{

  readonly setColor = `rgba(${ramdomR}, ${ramdomG}, ${ramdomB}, 1)`

  selectedColor = this.setColor
  subredditForm: FormGroup
  contentType = false
  
  constructor(private subredditService: SubredditService, private fb: FormBuilder){
    this.subredditForm = fb.group({
      name: ["", Validators.required],
      title: ["", Validators.required],
      description: ["", Validators.required],
      nsfw: false
    })
  }
  ngOnInit(): void {
  }

  color(color: string){
    console.log(color)
    this.selectedColor = color
   
  }
  saveSubreddit(){
    this.subredditService.createSubreddit(Object.assign(this.subredditForm.value, {style: this.selectedColor})).subscribe({
      next: data => console.log(data)
    })
  }
  
    

  
}