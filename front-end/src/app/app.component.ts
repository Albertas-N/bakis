import { Component } from '@angular/core';
import { DataService } from './filter/filter.component';
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  filterTerm: string = '';
  searchResults: any[] = [];
  dataSource: MatTableDataSource<Category>;

  isExpanded: boolean = false;

  constructor(private dataService: DataService) {
    this.dataSource = new MatTableDataSource<Category>([]);
  }

  onSubmit(): void {
    this.dataService.search(this.filterTerm).subscribe(
      (results: Category[] = []) => {
        this.searchResults = results;
        this.dataSource = new MatTableDataSource<Category>(this.searchResults);
      },
      (error: any[] = []) => {
        console.error(error);
      }
    );
  }

  onSearchResults(event: any) {
    this.searchResults = event;
    this.dataSource = new MatTableDataSource<Category>(this.searchResults);
  }

  expandGallery(): void {
    this.isExpanded = true;
  }

  collapseGallery(): void {
    this.isExpanded = false;
  }
}
