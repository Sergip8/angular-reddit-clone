import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { QuillModule } from 'ngx-quill'
import { FormsModule } from '@angular/forms';
import {AutosizeModule} from 'ngx-autosize';

import { CommentViewComponent } from './components/comment-view/comment-view.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { PostCommentsViewComponent } from './components/post-comments-view/post-comments-view.component';
import { VoteComponent } from './components/common/vote/vote.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CreatePostComponent } from './components/common/create-post/create-post.component';
import { RichTextEditor } from './components/common/rich-text-editor/rich-text-editor.component';
import { SubredditSelectComponent } from './components/common/subreddit-select/subreddit-select.component';
import { SubredditPostViewComponent } from './components/subreddit-post-view/subreddit-post-view.component';
import { ReuseRouteStrategyService } from './services/reuse-route-strategy.service';
import { SubredditAboutCardComponent } from './components/common/subreddit-about-card/subreddit-about-card.component';
import { SubredditCreate } from './components/subreddit-create-form/subreddit-create-form.component';
import { ChromePickerComponent } from './components/common/color-picker/chrome-picker/chrome-picker.component';
import { HexComponent } from './components/common/color-picker/parts/inputs/hex-input/hex-input.component';
import { HslaComponent } from './components/common/color-picker/parts/inputs/hsla-input/hsla-input.component';
import { RgbaComponent } from './components/common/color-picker/parts/inputs/rgba-input/rgba-input.component';
import { HueComponent } from './components/common/color-picker/parts/hue/hue.component';
import { AlphaComponent } from './components/common/color-picker/parts/alpha/alpha.component';
import { IndicatorComponent } from './components/common/color-picker/parts/indicator/indicator.component';
import { SaturationComponent } from './components/common/color-picker/parts/saturation/saturation.component';
import { ColorPresetSublist } from './components/common/color-picker/parts/color-preset-sublist/color-preset-sublist.component';
import { ColorPresetComponent } from './components/common/color-picker/parts/color-preset/color-preset.component';
import { ReversePipe } from './components/common/color-picker/pipes/reverse.pipe';
import { ChunksPipe } from './components/common/color-picker/pipes/chunks.pipe';
import { ColorPresetsComponent } from './components/common/color-picker/parts/color-presets/color-presets.component';
import { ColorPickerConfig } from './components/common/color-picker/chrome-picker/services/color-picker.service';
import { SidebarItemComponent } from './components/common/sidebar/sidebar-item.component';
import { SidebarItemIconComponent } from './components/common/sidebar/sidebar-item-icon.component';
import { SidebarContainerComponent } from './components/common/sidebar/sidebar-container.component';
import { SidebarComponent } from './components/common/sidebar/ng-simple-sidebar.component';
import { SideBarComponent } from './components/common/side-bar/side-bar.component';
import { HeaderComponent } from './components/header/header.component';



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
    RichTextEditor,
    SubredditSelectComponent,
    SubredditPostViewComponent,
    SubredditAboutCardComponent,
    SubredditCreate,
    ChromePickerComponent,
    HexComponent,
    HslaComponent,
    RgbaComponent,
    HueComponent,
    AlphaComponent,
    IndicatorComponent,
    SaturationComponent,
    ColorPresetSublist,
    ColorPresetComponent,
    ReversePipe,
    ChunksPipe,
    ColorPresetsComponent,
    SideBarComponent,
    HeaderComponent,

    SidebarItemComponent,
    SidebarItemIconComponent,
    SidebarContainerComponent,
    SidebarComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    AutosizeModule,
    QuillModule.forRoot(),
    
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [
    ColorPickerConfig,
    {
      provide: RouteReuseStrategy,
      useClass: ReuseRouteStrategyService,
    },{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true},
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
