import { Component } from '@angular/core';
import { DataService } from './filter/filter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  filterTerm: string = '';
  searchResults: any[] = [];
  galleryExpanded = false;

  constructor(private dataService: DataService) { }

  onSubmit(): void {
    this.dataService.search(this.filterTerm).subscribe(
      (results: any[] = []) => {
        this.searchResults = results;
      },
      (error: any[] = []) => {
        console.error(error);
      }
    );
  }

  onSearchResults(event: any) {
    this.searchResults = event;
  }

  expandGallery(): void {
    this.galleryExpanded = true;
  }

  collapseGallery(): void {
    this.galleryExpanded = false;
  }
}