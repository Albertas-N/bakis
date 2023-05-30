import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn!: boolean;
  subscription!: Subscription;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }  

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  logout() {
    this.userService.logout();
  }
}