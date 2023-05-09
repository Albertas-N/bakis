// data.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';



export interface Category {
  ID: number;
  Name: string;
  Address: string;
  Phone: string;
  Email: string;
  WorkingHours: string;
  Description: string;
}

export interface Event {
  id: number;
  title: string;
  image_src: string;
  date: string;
  address: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private eventsUrl = 'http://localhost:8000/vilniusEvents/';
  private museumsUrl = 'http://localhost:8000/pamatykLietuvoje/';

  constructor(private http: HttpClient) {}

  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.eventsUrl}${id}/`);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.museumsUrl}${id}/`);
  }

  getMuseum(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.museumsUrl}${id}/`);
  }
  

  search(query: string): Observable<[Category[], Event[]]> {
    const params = new HttpParams().set('q', query);
    const searchEvents = this.searchEvents(query);
    const searchCategories = this.searchCategories(query);
    return forkJoin([searchCategories, searchEvents]);
  }

  private searchCategories(query: string): Observable<Category[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<Category[]>(this.museumsUrl, { params });
  }

  private searchEvents(query: string): Observable<Event[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<Event[]>(this.eventsUrl, { params });
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.museumsUrl}`);
  }

  applyFilter(filterValues: { category: string[]; searchTerm: string }): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}`).pipe(
      map((events) =>
        events.filter((event) =>
          filterValues.category.some((category) => event.title.includes(category)) &&
          event.title.toLowerCase().includes(filterValues.searchTerm.toLowerCase())
        )
      )
    );
  }
}
