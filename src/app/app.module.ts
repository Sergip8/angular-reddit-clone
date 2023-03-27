import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { QuillModule } from 'ngx-quill'

import { CommentViewComponent } from './components/comment-view/comment-view.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { PostCommentsViewComponent } from './components/post-comments-view/post-comments-view.component';
import { VoteComponent } from './components/common/vote/vote.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CreatePostComponent } from './components/common/create-post/create-post.component';
import { RichTextEditor } from './components/common/rich-text-editor/rich-text-editor.component';

export function tokenGetter() {
  return localStorage.getItem("authenticationToken");
}
@NgModule({
  declarations: [
    AppComponent,
    CommentViewComponent,
    PostViewComponent,
    PostCommentsViewComponent,
    VoteComponent,
    LoginComponent,
    HomeComponent,
    CreatePostComponent,
    RichTextEditor
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    QuillModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
