import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimeCreated } from 'src/app/helpers/time-created';
import { CommentRequest } from 'src/app/models/comment-request';
import { PostRequest } from 'src/app/models/post-request';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-comments-view',
  templateUrl: './post-comments-view.component.html',
  styleUrls: ['./post-comments-view.component.css']
})
export class PostCommentsViewComponent implements OnInit {

post!: PostRequest
comments!: CommentRequest[]
postId = 0
maxPosition = 0;
  constructor(private commentsService: CommentService, private postService: PostService, private activatedRoute: ActivatedRoute) { 
    this.postId =  this.activatedRoute.snapshot.params['id']

  }

  ngOnInit(): void {
    this.getCommentsByPostId()
    this.getPostById()
    console.log(this.post)
  }
  getCommentsByPostId() {
    this.commentsService.getCommentsByPostId(this.postId).subscribe({
      next: (data) => {
        console.log(data);
        let index = 0;
        this.comments = data;
        this.comments.forEach((c) => {
          if (c.position > this.maxPosition) this.maxPosition = c.position;
        });

        while (this.maxPosition >= 0) {
          for (let i = 0; i < this.comments.length - index; i++) {
            for (let j = 0; j < this.comments.length - index; j++) {
              index = 0;
              if (
                this.comments[j].commentReplyId === this.comments[i].id &&
                this.comments[i].position > this.maxPosition - 1
              ) {
                this.comments[i].reply.push(this.comments[j]);
                this.comments = this.comments.filter(
                  (x) => x !== this.comments[j]
                );
                index = 1;
              }
            }
          }
          --this.maxPosition;
        }
        console.log(this.comments);
      },
    });
  }

  getPostById(){
    this.postService.getPostById(this.postId).subscribe({
      next: data => {console.log(data)
      this.post = data
      TimeCreated.getDateOfCreation(this.post.duration)
      this.post.duration = TimeCreated.getDateOfCreation(this.post.duration)
      }
    })
  }
}
