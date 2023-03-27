import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalConst } from '../global-const';
import { PostRequest } from '../models/post-request';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  
  constructor(private http: HttpClient) { 
    
  }
  
  getAllPost() {
    return this.http.get<PostRequest[]>(GlobalConst.baseUrl + "/posts")
  }

  getPostById(id: number){
    return this.http.get<PostRequest>(GlobalConst.baseUrl + "/posts/"+ id)
  }
}
