import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, ActivationEnd, ActivationStart, NavigationEnd, Router } from "@angular/router";
import { distinctUntilChanged, map, take } from "rxjs";
import { SubredditService } from "src/app/services/subreddit.service";

@Component({
  selector: "app-subreddit-select",
  templateUrl: "./subreddit-select.component.html",
  styleUrls: ["./subreddit-select.component.css"],
})
export class SubredditSelectComponent implements OnInit {

  setSubreddit?: string 
  @Output() subreddit = new EventEmitter<string>();
  @Input() subredditName?: string
  subredditInput?: string = "";
  subredditUrl?: string[] = [];
  searchInput = new FormControl();
  result?: string[];
  res?: string;
  flag = true;
  flag1 = true
  placeHolder = "Escribe para buscar"
  displayName =true

  constructor(private subredditService: SubredditService, private router: Router) {
    
    this.searchInput.valueChanges.pipe(distinctUntilChanged()).subscribe((data) => {
      if(data =="")
      this.flag1 =true
      this.flag = true;
      if (data != "" && this.flag1) {
          
          
          subredditService.findSubredditByName(data).subscribe({
            
            next: (res) => {
              this.flag = false;
              if (res.length > 0) {
                this.result = res;
                this.flag = false;
                if (res[0] === this.res) {                 
                  this.flag = true;
                  return;
                }
                } else {
                  this.result = [];
                  this.flag = true;
                }
              },
            });
    }
      if (data == "") {
        this.result = [];
        this.flag = true;
      }
    });
  }
  ngOnInit(): void {
    this.router.events.subscribe({next: v => {if(v instanceof ActivationStart){
      this.hideName()
      this.setSubreddit = v.snapshot.params['name']
       console.log(this.setSubreddit)
      if(this.setSubreddit){
      this.placeHolder= `buscar en ${this.setSubreddit}`
      this.flag1 = false
      this.displayName = false;
      (<HTMLInputElement>document.getElementById("rFind")).style.textIndent = `${this.setSubreddit?.length*13}px`
      }
    }}}
    )
    
    if(this.subredditName){
      this.searchInput.patchValue(this.subredditName)
      this.flag1 = false
      this.subreddit.emit(this.subredditName)
    }
    console.log(this.subredditName)
  
  }

  subredditValue(data: string) {}
  showRes() {
    if (this.result?.length) this.flag = !this.flag;
  }
  getSubreddit(res: string) {
    this.searchInput.patchValue(res)
    this.flag1 = false
    this.result = []
    this.subreddit.emit(res);
    
  }
  hideName(){
    this.flag1 = true
    this.displayName = true;
    this.placeHolder= "Escribe para buscar";
    this.searchInput.patchValue("");
    (<HTMLInputElement>document.getElementById("rFind")).style.textIndent = '5px';
    (<HTMLInputElement>document.getElementById("rFind")).focus()
  }
}
