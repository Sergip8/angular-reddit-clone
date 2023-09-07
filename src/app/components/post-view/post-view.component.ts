import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeCreated } from '../../helpers/time-created';
import { PostRequest } from '../../models/post-request';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  @Input() post!: PostRequest
  @Input() style!: string[]
  timeCreated?: string

  constructor(private postService: PostService, private router: Router,) { 
    //private activedRoute: ActivatedRoute, 
   // this.postId = activedRoute.snapshot.params['id']
    
  }

  ngOnInit(): void {
    this.timeCreated = TimeCreated.getDateOfCreation(this.post?.duration)
  }

  navigateTo(post: PostRequest) {
    this.router.navigate([`/r/${post.subredditName}/post`, post.id]);
  }

}
