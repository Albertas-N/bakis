import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable, map } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  register(name: string, email: string, username: string, password: string): Observable<any> {
    const body = { name: name, email: email, username: username, password: password };
    return this.http.post('http://localhost:8000/userRegister/', body).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }

  loginUser(username: string, password: string): Observable<User> {
    const body = { username: username, password: password };
    return this.http.post<User>('http://localhost:8000/userRegister/login/', body).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`http://localhost:8000/userRegister/${userId}/`)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }
  
  getUserData(userId: string): Observable<User> {
    return this.http.get<User>(`http://localhost:8000/userRegister/${userId}/`)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }  

}