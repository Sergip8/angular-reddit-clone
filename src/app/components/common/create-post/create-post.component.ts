import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { map, take } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { PostService } from "src/app/services/post.service";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"],
})
export class CreatePostComponent implements OnInit {
  postTitle: FormGroup;
  desc = ["toolbar-top", "bar", "Ingrese una descripción"];
  descriptionInput?: string;
  subredditInput?: string;
  subredditName?: string;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.postTitle = fb.group({
      title: ["", Validators.required],
    });
    this.activatedRoute.paramMap
      .pipe(
        take(1),
        map(() => window.history.state)
      )
      .subscribe((res) => {
        this.subredditName = res.name;
      });
  }

  ngOnInit(): void {}
  description(descRes: string) {
    console.log(descRes);
    this.descriptionInput = descRes;
  }
  subreddit(subredditName: string) {
    this.subredditInput = subredditName;
  }
  savePost() {
    if (this.authService.getJwtToken())
      this.postService
        .createPost({
          subredditName: this.subredditInput,
          postName: this.postTitle.controls["title"].value,
          description: this.descriptionInput,
        })
        .subscribe({});
    else {
      this.router.navigateByUrl('/login')
    }
  }
}
