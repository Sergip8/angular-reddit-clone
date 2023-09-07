import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConst } from '../global-const';
import { CommentRequest } from '../models/comment-request';
import { CommentResponse } from '../models/comment-response';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  createComment(comment: CommentResponse) {
    return this.http.post<CommentRequest>(GlobalConst.baseUrl +"/comment/reply", comment)
  }

  constructor(private http: HttpClient) { }

getCommentsByPostId(postId: number){
  return this.http.get<CommentRequest[]>(GlobalConst.baseUrl +"/comment/post/" + postId)
}
}
