import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

interface Category {
  ID: number;
  Name: string;
  Address: string;
  Phone: string;
  Email: string;
  WorkingHours: string;
  Description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/Categories';

  constructor(private http: HttpClient) { }

  search(searchTerm: string): Observable<any[]> {
    const params = new HttpParams().set('Name_like', searchTerm);
    return this.http.get<any[]>(this.apiUrl, { params });
  }
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  filterTerm: string = ' ';
  results: Category[] = [];
  dataSource: MatTableDataSource<Category>;

  isExpanded: boolean = false;
  displayedColumns: string[] = ['Name', 'Address', 'Phone', 'Email', 'WorkingHours', 'Description'];

  constructor(private dataService: DataService) { 
    this.dataSource = new MatTableDataSource<Category>([]);
  }

  onSubmit() {
    this.dataService.search(this.filterTerm).subscribe(
      (results) => {
        this.results = results;
        this.dataSource = new MatTableDataSource(this.results);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
