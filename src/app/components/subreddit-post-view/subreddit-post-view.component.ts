import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Params,
  Router,
} from "@angular/router";
import { PostRequest } from "src/app/models/post-request";
import { SubredditRequest } from "src/app/models/subreddit-request";
import { AuthService } from "src/app/services/auth.service";
import { PostService } from "src/app/services/post.service";
import { SubredditService } from "src/app/services/subreddit.service";

@Component({
  selector: "app-subreddit-post-view",
  templateUrl: "./subreddit-post-view.component.html",
  styleUrls: ["./subreddit-post-view.component.css"],
})
export class SubredditPostViewComponent implements OnInit, OnDestroy {
  posts!: PostRequest[];
  style = [
    "post-body-home",
    "post-vote-home",
    "post-container-home",
    "post-comment-btn",
  ];
  subredditName?: string;
  subredditInfo?: SubredditRequest

  constructor(
    private postService: PostService,
    private subredditService: SubredditService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: AuthService
  ) {
    this.subredditName = this.activatedRoute.snapshot.params["name"];

  }
  ngOnDestroy(): void {}
  ngOnInit(): void {
    console.log(this.subredditName);

    this.getSubredditPost();
    this.subredditService.getSubredditByName(this.subredditName).subscribe({
      next: data => {this.subredditInfo = data
      console.log(data)}
    })
  }

  navigateTo(post: PostRequest) {
    this.router.navigate([`/r/${post.subredditName}/post`, post.id]);
  }
  getSubredditPost() {
    this.postService.getAllSubredditPost(this.subredditName!).subscribe({
      next: (data) => {
        
        (this.posts = data)
       
      }
    });
  }
  subreddit(name: string) {
    this.router.navigate(["r/", name]);
  }
  suscribeSubreddit(){
    this.userService.subscribeSubreddit(this.subredditName).subscribe({
      next: res => console.log(res)
    })
  }
}
