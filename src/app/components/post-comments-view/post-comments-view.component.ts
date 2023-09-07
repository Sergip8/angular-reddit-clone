import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { TimeCreated } from "src/app/helpers/time-created";
import { CommentRequest } from "src/app/models/comment-request";
import { CommentResponse } from "src/app/models/comment-response";
import { PostRequest } from "src/app/models/post-request";
import { AuthService } from "src/app/services/auth.service";
import { CommentService } from "src/app/services/comment.service";
import { PostService } from "src/app/services/post.service";

@Component({
  selector: "app-post-comments-view",
  templateUrl: "./post-comments-view.component.html",
  styleUrls: ["./post-comments-view.component.css"],
})
export class PostCommentsViewComponent implements OnInit {
  post!: PostRequest;
  comments!: CommentRequest[];
  postId = 0;
  maxPosition = 0;
  constructor(
    private commentsService: CommentService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.postId = this.activatedRoute.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.getCommentsByPostId();
    this.getPostById();
    console.log(this.post);
  }
  getCommentsByPostId() {
    this.commentsService.getCommentsByPostId(this.postId).subscribe({
      next: (data) => {
        console.log(data);
        
        this.comments = data;

     

        
        this.comments = this.orderComments()
        
      },
    });
  }

  getPostById() {
    this.postService.getPostById(this.postId).subscribe({
      next: (data) => {
        console.log(data);
        this.post = data;
        TimeCreated.getDateOfCreation(this.post.duration);
        this.post.duration = TimeCreated.getDateOfCreation(this.post.duration);
      },
    });
  }
  comment(commentReply: CommentResponse) {
    if(this.authService.getJwtToken()){
      commentReply.postId = this.post.id;
      console.log(commentReply);
      this.commentsService.createComment(commentReply).subscribe({
        next: data => { 
          this.getCommentsByPostId()
          
        }
      });

    }  else {
      this.router.navigateByUrl('/login')
    }
  }

  commentSubmit(commentPost: string) {
    if(this.authService.getJwtToken()){
    this.commentsService
      .createComment({
        text: commentPost,
        position: 0,
        commentReplyId: null,
        postId: this.post.id,
      })
      .subscribe({
        next: data => {console.log(data); this.comments.push(data)}
      });
  }else {
    this.router.navigateByUrl('/login')
  }
}
  showModal = false;

  ngAfterViewInit() {
    this.showModal = true;
  }

  onClose() {
    setTimeout(() => window.history.back(), 100);
  }

  onDialogClick(event: UIEvent) {
    // Capture click on dialog and prevent it from bubbling to the modal background.
    event.stopPropagation();
    event.cancelBubble = true;
  }
  orderComments(): CommentRequest[]{
    let index = 0;
    let arr = [];

    for (let j = 0; j < this.comments?.length - index; j++) {
      index = 0;
      if (this.comments[j].position === 0) {
        arr.push(this.comments[j]);

        this.comments.splice(j, 1);
        j--;
        index = 1;
      }
    }
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < this.comments?.length - index; j++) {
        index = 0;

        if (this.comments[j]?.commentReplyId === arr[i].id) {
          arr.splice(i + 1, 0, this.comments[j]);
          this.comments.splice(j, 1);
          if (j > 0) j--;
          index = 1;
        }
      }
    }

    for (let i = 0; i < arr.length; i++) {
      if (this.comments[0]?.commentReplyId === arr[i].id) {
        arr.splice(i + 1, 0, this.comments[0]);
      }
    }
    return arr
  }
}

/*getCommentsByPostId() {
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
              this.comments[j].position > this.maxPosition-1
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
}*/
