import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConst } from '../global-const';
import { CreateVote } from '../models/create-vote';
import { UpdateVote } from '../models/update-vote';
import { Vote } from '../models/vote';

import { VotePost } from '../models/vote-post';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''})
};
@Injectable({
  providedIn: 'root'
})
export class VoteService {
  updateVote(vote: UpdateVote) {
   return this.http.put(GlobalConst.baseUrl +"/votes/comment", vote)
  }
  createVote(vote: CreateVote) {
    console.log(vote)
   return this.http.post(GlobalConst.baseUrl +"/votes/comment", vote)
    
  }

  constructor(private http: HttpClient) { }


  getVotes(commentId: number, vclass: string){
   return this.http.get<Vote>(GlobalConst.baseUrl +"/votes/comment/"+commentId+ "/"+vclass)
  }

  deleteVote(voteId: number){
    console.log(voteId)
   return this.http.delete(GlobalConst.baseUrl +"/votes/comment/"+voteId)
  }
}
