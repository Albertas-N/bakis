import { Component } from '@angular/core';
import { DataService, SearchResult } from './data.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'front-end';
  filterTerm: string = '';
  selectedCategory: string = '';
  searchResults: any[] = [];
  dataSource: MatTableDataSource<SearchResult>;

  isExpanded: boolean = false;

  constructor(private dataService: DataService) {
    this.dataSource = new MatTableDataSource<SearchResult>([]);
  }

  onSubmit(): void {
    this.dataService.search(this.filterTerm, this.selectedCategory).subscribe(
      (results: SearchResult[] = []) => {
        this.searchResults = results;
        this.dataSource = new MatTableDataSource<SearchResult>(this.searchResults);
      },
      (error: any[] = []) => {
        console.error(error);
      }
    );
  }

  onSearchResults(event: any) {
    this.searchResults = event;
    this.dataSource = new MatTableDataSource<SearchResult>(this.searchResults);
  }

  expandGallery(): void {
    this.isExpanded = true;
  }

  collapseGallery(): void {
    this.isExpanded = false;
  }
}
