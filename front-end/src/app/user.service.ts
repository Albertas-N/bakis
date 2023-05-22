import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<any>(null);
  currentUser = this.userSubject.asObservable();

  constructor() { }

  updateCurrentUser(user: any) {
    this.userSubject.next(user);
  }

  login() {
    this.userSubject.next(true);
  }

  logout() {
    this.userSubject.next(false);
  }
}
