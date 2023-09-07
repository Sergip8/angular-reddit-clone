import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { PostCommentsViewComponent } from './components/post-comments-view/post-comments-view.component';
import { HomeComponent } from './components/home/home.component';
import { CreatePostComponent } from './components/common/create-post/create-post.component';
import { SubredditPostViewComponent } from './components/subreddit-post-view/subreddit-post-view.component';
import { SubredditCreate } from './components/subreddit-create-form/subreddit-create-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'submit', component: CreatePostComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'create-subreddit', component: SubredditCreate },

  { path: 'r/:name/post/:id', component: PostCommentsViewComponent },
  { path: '', component: HomeComponent },
  { path: '*', component: HomeComponent },
  { path: 'r/:name', component: SubredditPostViewComponent}


]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
