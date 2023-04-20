import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

export interface Category {
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

  search(searchTerm: string): Observable<Category[]> {
    const params = new HttpParams().set('Name_like', searchTerm);
    return this.http.get<Category[]>(this.apiUrl, { params });
  }
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() categories: Category[] = [];
  filterTerms: string[] = [];
  results: Category[] = [];
  dataSource: MatTableDataSource<Category>;

  isExpanded: boolean = false;
  displayedColumns: string[] = ['Name', 'Address', 'Phone', 'Email', 'WorkingHours', 'Description'];
  separatorKeyCodes = { ENTER, COMMA };

  constructor(private dataService: DataService) {
    this.dataSource = new MatTableDataSource<Category>([]);
  }

  ngOnInit(): void {
    // Add any initialization logic here if needed
  }

  onSubmit(): void {
    this.dataService.search(this.filterTerms.join(' ')).subscribe(
      (results) => {
        this.results = results;
        this.dataSource.data = this.results;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.filterTerms.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(term: string): void {
    const index = this.filterTerms.indexOf(term);

    if (index >= 0) {
      this.filterTerms.splice(index, 1);
    }
  }
}
