import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConst } from '../global-const';
import { SubredditRequest } from '../models/subreddit-request';
import { CreateSubreddit } from '../models/create-subreddit';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private http: HttpClient) { }


  getSubredditByName(subredditName: string | undefined) {
    return this.http.get<SubredditRequest>(GlobalConst.baseUrl + "/subreddit/r/"+ subredditName)
  }
  findSubredditByName(name: string) {
      return this.http.get<string[]>(GlobalConst.baseUrl + "/subreddit/search/"+ name)
  }
  createSubreddit(subreddit: CreateSubreddit){
    console.log(subreddit)
    return this.http.post<string>(GlobalConst.baseUrl + "/subreddit", subreddit)
  }
}
