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
  keywords: string[] = [];
  results: SearchResult[] = [];
  filteredResults: SearchResult[] = [];
  filteredDataSource: SearchResult[] = [];
  searchTerm: string = '';
  dataSource: MatTableDataSource<SearchResult>;

  isExpanded: boolean = false;

  constructor(private dataService: DataService) {
    this.dataSource = new MatTableDataSource<SearchResult>([]),
    this.fetchResults();
  }

  fetchResults(): void {
    this.dataService.getAllData().subscribe(results => {
      this.results = results;
      this.filteredResults = [...results];
    });
  }

  onKeywordsChanged(keywords: string[]): void {
    this.keywords = keywords;
    this.search();
  }

  onSearchKeywordChanged(searchKeyword: string): void {
    this.searchTerm = searchKeyword;
    this.search();
  }

  search(): void {
    if (this.searchTerm.length === 0 && this.selectedCategory.length === 0) {
      this.dataService.search(this.searchTerm, this.selectedCategory).subscribe(
        (results: SearchResult[]) => {
          this.filteredDataSource = this.filterResultsByKeywords(results);
          console.log('Results from search():', this.filteredDataSource);
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  filterResultsByKeywords(results: SearchResult[]): SearchResult[] {
    return results.filter(result => 
      this.keywords.every(keyword => result.title.toLowerCase().includes(keyword.toLowerCase()))
    );
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
