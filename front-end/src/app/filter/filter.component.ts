import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  filterTerm: string = ' ';
  results: any[]=[];

  constructor(private dataService: DataService) { }

  onSubmit() {
    this.dataService.search(this.filterTerm).subscribe(
      (results) => {
        this.results = results;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/Categories';

  constructor(private http: HttpClient) {}

  search(searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?q=${searchTerm}`);
  }
}

