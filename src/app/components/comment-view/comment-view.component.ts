import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormControl } from "@angular/forms";
import { CommentRequest } from "src/app/models/comment-request";
import { CommentResponse } from "src/app/models/comment-response";
import { CommentService } from "src/app/services/comment.service";

@Component({
  selector: "app-comment-view",
  templateUrl: "./comment-view.component.html",
  styleUrls: ["./comment-view.component.css"],
})
export class CommentViewComponent implements OnInit {
  @Input() comments!: CommentRequest[];
  @Output() commentRes = new EventEmitter<CommentResponse>();

  comment?: CommentResponse;
  flag = true;
  id = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    this.comments = changes["comments"].currentValue
  }

  ngOnInit(): void {}

  // foo(){
  //   let maxPosition =0
  //   let a = 0
  //   for( let pos of this.comments){
  //     if(pos.position >maxPosition )
  //     maxPosition= pos.position
  //   }
  //   while(a <= maxPosition)
  //   for (let i = 0; i < this.comments.length; i++) {
  //     if(a == )
  //   }
  // }

  showCommentBox(id: number) {
    if (document.getElementById("reply" + id)!.style.display == "none")
      document.getElementById("reply" + id)!.style.display = "block";
    else document.getElementById("reply" + id)!.style.display = "none";
  }
  commentReq(text: string, replyId: number, position: number) {
    this.comment = {
      text: text,
      position: position,
      commentReplyId: replyId,
      postId: 0,
    };
    this.commentRes.emit(this.comment);

    //console.log(this.comment)
  }
  hideComments(indexI: number, indexJ: number) {
    //console.log(this.comments[0].position)
    let arr = [];
    for (let i = indexI; i < this.comments.length; i++) {
   
      if (this.comments[indexI].position == this.comments[i].position) {
        if (document.getElementById('hide-head'+i+this.comments[i].position)!.style.display == "none") {
          document.getElementById('hide-head'+i+this.comments[i].position)!.style.display = "block";
          
        } else {
          document.getElementById('hide-head'+i+this.comments[i].position)!.style.display = "none";
        }
      }
      if (this.comments[indexI].position < this.comments[i].position) {
        arr.push(i);
        if (document.getElementById("hide" + i)!.style.display == "none") {
          document.getElementById("hide" + i)!.style.display = "block";
          
        } else {
          document.getElementById("hide" + i)!.style.display = "none";
        }
       
      }
      if(i ==  this.comments.length-1)
      break;
      if (this.comments[indexI].position === this.comments[i+1].position) {
        break;
      }
     
    }
    console.log(arr);
  }
  hoverThread(){
   let elements = document.getElementsByClassName("path0")

   for(let i = 0; i<elements.length; i++){
    elements[i].setAttribute("stroke","red")
    elements[i].setAttribute("stroke-width","3")

   }
    
   
  }
}
