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
  results: any[] = [];
  galleryExpanded = false;

  constructor(private dataService: DataService) { }

  onSubmit(): void {
    this.dataService.search(this.filterTerm).subscribe(
      (results: any[] = []) => {
        this.results = results;
      },
      (error: any[] = []) => {
        console.error(error);
      }
    );
  }

  onSearchResults(results: any[] = []): void {
    this.results = results;
  }

  expandGallery(): void {
    this.galleryExpanded = true;
  }

  collapseGallery(): void {
    this.galleryExpanded = false;
  }
}
