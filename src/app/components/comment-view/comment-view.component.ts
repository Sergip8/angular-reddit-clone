import { Component, Input, OnInit } from "@angular/core";
import { CommentRequest } from "src/app/models/comment-request";
import { CommentService } from "src/app/services/comment.service";

@Component({
  selector: "app-comment-view",
  templateUrl: "./comment-view.component.html",
  styleUrls: ["./comment-view.component.css"],
})
export class CommentViewComponent implements OnInit {
  @Input() comments!: CommentRequest[];
  
  flag = false;

  constructor() {}

  ngOnInit(): void {
    
  }

 
  hide(id: number) {
    if (this.flag) document.getElementById("" + id)!.style.display = "none";
  }
}
