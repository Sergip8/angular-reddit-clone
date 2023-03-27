import { Component, Input, OnInit } from "@angular/core";
import { CreateVote } from "src/app/models/create-vote";
import { VoteRequest } from "src/app/models/vote-request";
import { VoteService } from "src/app/services/vote.service";

@Component({
  selector: "app-vote",
  templateUrl: "./vote.component.html",
  styleUrls: ["./vote.component.css"],
})
export class VoteComponent implements OnInit {
  @Input() postId!: number;
  @Input() commentId!: number

  count!: number;
  voteUp = false;
  voteDown = false;
  id = 0;
  voteUser = false;
  vclass!: string
  vclassId = 0

  constructor(private voteService: VoteService) {}

  ngOnInit(): void {
    if(this.postId){
      this.vclass= "POST"
      this.vclassId = this.postId
    }
    if(this.commentId){
      this.vclass = "COMMENT"
      this.vclassId = this.commentId
    }
    this.getvotes();
  }

  getvotes() {
   
      this.voteService.getVotes(this.vclassId, this.vclass).subscribe({
        next: (votes) => {
          console.log(votes)
          this.count = votes.count;
          this.id = votes.id;
          this.voteUser = votes.voteByUser;
          this.voteUp = votes.voteByUser && votes.voteType === 1;
          this.voteDown = votes.voteByUser && votes.voteType === 0;
        },
      });
    
  }
  clickVoteUp() {
    

      if (this.voteUp)
        this.voteService.deleteVote(this.id).subscribe(
           () => this.getvotes(),
        );
      if (!this.voteUser)
        this.voteService
          .createVote({ voteType: 1, id: this.vclassId, voteClass: this.vclass })
          .subscribe(
             () => this.getvotes(),
          );
      if (this.voteDown)
        this.voteService
          .updateVote({ voteType: 1, id: this.id, entityId: this.vclassId, voteClass: this.vclass })
          .subscribe(
            () => this.getvotes(),
          );
      
    
  }
  clickVoteDown() {
    

      if (this.voteDown)
        this.voteService.deleteVote(this.id).subscribe(
         () => this.getvotes(),
        );
      if (!this.voteUser) {
        this.voteService
          .createVote({ voteType: 0, id: this.vclassId, voteClass: this.vclass})
          .subscribe(
            () => this.getvotes(),
          );
      }
      if (this.voteUp) {
        this.voteService
          .updateVote({ voteType: 0, id: this.id, entityId: this.vclassId, voteClass: this.vclass })
          .subscribe(
            () => this.getvotes(),
          );
      }
    }
    }

