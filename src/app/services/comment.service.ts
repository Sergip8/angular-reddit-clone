import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConst } from '../global-const';
import { CommentRequest } from '../models/comment-request';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

getCommentsByPostId(postId: number){
  return this.http.get<CommentRequest[]>(GlobalConst.baseUrl +"/comment/post/" + postId)
}
}
