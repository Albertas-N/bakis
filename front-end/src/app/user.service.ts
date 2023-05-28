import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Category } from './data.service';
import { RegisterService, User } from './auth/register/register.service';


export interface UserLiked {
  id: number;
  user: number;
  entertainment: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private likesUrl = 'http://localhost:8000/userLiked/';
  private userUrl = 'http://localhost:8000/userRegister/';
  private userSubject = new BehaviorSubject<User | null>(null);
  currentUser = this.userSubject.asObservable();
  private loginStatusSubject = new BehaviorSubject<boolean>(false);
  loginStatus = this.loginStatusSubject.asObservable();

  setCurrentUser(user: User): void {
    this.userSubject.next(user);
  }

  getCurrentUser() {
    return this.userSubject.value;
  }

  constructor(private http: HttpClient) { }

  getUserData(userId: number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}${userId}/`);
  }

  getLikes(userId: number): Observable<UserLiked[]> {
    let params = new HttpParams().set('user_id', userId.toString());
    return this.http.get<UserLiked[]>(this.likesUrl, { params });
  }

  getCategoriesByIds(ids: number[]): Observable<Category[]> {
    let params = new HttpParams();
    ids.forEach(id => params = params.append('ids', id.toString()));
    return this.http.get<Category[]>(`http://localhost:8000/categories/byIds/`, { params: params });
  }


  getEntertainmentsByIds(ids: number[]): Observable<Category[]> {
    let params = new HttpParams();
    ids.forEach(id => params = params.append('ids', id.toString()));
    return this.http.get<Category[]>(`http://localhost:8000/vilniusevents/`, { params: params });
  }

  addLike(userId: number, itemId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      user: userId,
      entertainment: itemId
    };
    return this.http.post(`${this.likesUrl}add_like/`, body, { headers });
  }

  
  private getToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser && currentUser.token;
  }

  updateCurrentUser(user: any) {
    this.userSubject.next(user);
  }

  login(user: User) {
    this.setCurrentUser(user);
    this.loginStatusSubject.next(true);
  }

  logout() {
    this.userSubject.next(null);
    this.loginStatusSubject.next(false);
  }
}