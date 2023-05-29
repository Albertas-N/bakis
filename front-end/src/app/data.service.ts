import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Category {
  id: number;
  title: string;
  image_src: string;
  date: string | null;
  address: string;
  content: string;
  email: string | null;
  phone_number: string | null;
  working_hours: string | null;
  category: string;
  rating: number | null;
}


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private categoriesUrl = 'http://16.171.43.32:7000/vilniusEvents/';

  constructor(private http: HttpClient) { }

  getItemDetails(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.categoriesUrl}${id}/`);
  }

  getItems(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  search(searchTerm: string): Observable<Category[]> {
    let params = new HttpParams().set('search', searchTerm);
    return this.http.get<Category[]>(this.categoriesUrl, { params });
  }

}
