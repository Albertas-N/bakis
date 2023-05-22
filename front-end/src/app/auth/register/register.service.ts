import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(name: string, email: string, username: string, password: string): Observable<any> {
    const body = { name: name, email: email, username: username, password: password };
    return this.http.post("http://localhost:8000/userRegister/", body).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }

  registerLogin(username: string, password: string): Observable<any> {
    const body = { username: username, password: password };
    return this.http.post("http://localhost:8000/userLogin/", body).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }

  getUsers(): Observable<any> {
    return this.http.get("http://localhost:8000/userLogin/");
  }    
}