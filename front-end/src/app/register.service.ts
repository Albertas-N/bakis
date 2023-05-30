import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable, map, tap } from 'rxjs';
import { UserService } from 'src/app/user.service';

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, public userService: UserService) { }

  register(name: string, email: string, username: string, password: string): Observable<any> {
    const body = { name: name, email: email, username: username, password: password };
    return this.http.post<User>('http://16.171.43.32:7000/userRegister/', body).pipe(
      tap((user: User) => {
        this.userService.setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      }),
      catchError((error) => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }
  
  checkUsername(username: string): Observable<boolean> {
    return this.http.get<boolean>(`http://16.171.43.32:7000/checkUsername/${username}/`)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  loginUser(username: string, password: string): Observable<User> {
    const body = { username: username, password: password };
    return this.http.post<User>('http://16.171.43.32:7000/userRegister/login/', body).pipe(
      tap((user: User) => {
        this.userService.setCurrentUser(user);
      }),
      catchError((error) => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`http://16.171.43.32:7000/userRegister/${userId}/`)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  getUserData(userId: string): Observable<User> {
    return this.http.get<User>(`http://16.171.43.32:7000/userRegister/${userId}/`)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

}