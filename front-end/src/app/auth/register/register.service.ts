import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<any> {
    const body = { username: username, password: password };
    return this.http.post("http://localhost:8000/userLogin/", body);
  }
}