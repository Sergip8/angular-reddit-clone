import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostRequest } from 'src/app/models/post-request';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts!: PostRequest[]
  style = ["post-body-home", "post-vote-home", "post-container-home", "post-comment-btn"] 

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPost()
  }

  getAllPost(){
    this.postService.getAllPost().subscribe({
      next: data => this.posts = data
    })
  }
  navigateTo(postId: number){
    this.router.navigate(['/post', postId])
  }

}
