import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgSimpleSidebarService } from '../common/sidebar/ng-simple-sidebar.service';
import { SimpleSidebarItem, SimpleSidebarPosition } from 'src/app/models/sidebar-item';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isLoggedIn: boolean;
  username: string;
  subs: SimpleSidebarItem[]
  
  constructor(private authService: AuthService, private router: Router, private ngSimpleSidebarService: NgSimpleSidebarService) { }
  
  
  ngOnInit() {
    //this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
    if(this.isLoggedIn)
    this.getUserSubs()
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
  subreddit(name: string) {
    this.router.navigate(["/r/", name]);
  }
  getUserSubs() {
    this.authService.getSubscriptions().pipe(take(1)).subscribe({
      next: res => {
        this.subs = []
        for (let r of res){
          this.subs.push({name:r,  position: SimpleSidebarPosition.top, routerLink: [`/r/${r}`]})
        }
        console.log(this.subs)
      }
    })
  }

}
