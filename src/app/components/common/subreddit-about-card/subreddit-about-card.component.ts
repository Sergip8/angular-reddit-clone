import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeCreated } from 'src/app/helpers/time-created';
import { SubredditRequest } from 'src/app/models/subreddit-request';

@Component({
  selector: 'app-subreddit-about-card',
  templateUrl: './subreddit-about-card.component.html',
  styleUrls: ['./subreddit-about-card.component.css']
})
export class SubredditAboutCardComponent implements OnInit {
  
  created?: string
  @Input() subredditInfo?: SubredditRequest
 
  constructor(private router: Router, private activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void {
    this.created = TimeCreated.getDateOfCreation(this.subredditInfo?.createdDate)
    
  }
  goToCreatePost(){
    this.router.navigate(['/submit'], 
    { relativeTo: this.activatedRoute, state: { name: this.subredditInfo?.name } })
  }
}
