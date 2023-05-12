import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSelectChange } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { DataService, Category, SearchResult } from '../data.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ResultDetailsComponent } from '../result-details/result-details.component';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  @Input() filterTerms: string[] = [];
  @Input() results: SearchResult[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  categories$: Observable<string[]> = of([]);
  selectedCategory: string = '';
  filteredResults: SearchResult[] = [];
  searchTerm: string = '';
  selectedCategories: string[] = [];
  selectedOption: string = '';
  dataSource = new MatTableDataSource<SearchResult>();
  displayedColumns: string[] = ['id', 'title', 'date', 'address', 'details'];
  filteredDataSource: SearchResult[] = [];

  @Output() searchResults = new EventEmitter<string[]>();

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit() {
    this.categories$ = this.dataService.getCategories().pipe(
      map(categories => categories.map(category => category.title))
    );
    this.updateDataSource();
  }

  add(category: string): void {
    if (category.trim() !== '') {
      this.selectedCategories.push(category.trim());
      this.updateDataSource();
    }
  }

  addSelectedCategories(): void {
    if (this.selectedOption) {
      const selectedOptions = this.selectedOption.split(',');
      selectedOptions.forEach(option => {
        if (!this.selectedCategories.includes(option)) {
          this.selectedCategories.push(option.trim());
        }
      });
      this.updateDataSource();
      this.selectedOption = '';
    }
  }

  remove(category: string): void {
    const index = this.selectedCategories.indexOf(category);
    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
      this.updateDataSource();
    }
  }

  search(): void {
    if (this.searchTerm.length === 0 && this.selectedCategory.length === 0) {
      this.dataService.search(this.searchTerm, this.selectedCategory).subscribe(
        (results: SearchResult[]) => {
          this.filteredDataSource = results;
          console.log('Results from search():', results);
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  updateDataSource(): void {
    const filterValues = {
      category: this.selectedCategories,
      searchTerm: this.searchTerm
    };

    this.dataService.applyFilter(filterValues).subscribe((results: SearchResult[]) => {
      this.filteredDataSource = results;
    });
  }

  onCategoryChange(event: MatSelectChange): void {
    this.selectedCategory = event.value;
  }

  openDetailsDialog(result: SearchResult): void {
    const dialogRef = this.dialog.open(ResultDetailsComponent, {
      width: '500px',
      data: result,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredDataSource = this.dataSource.data.filter(result => result.title.toLowerCase().includes(filterValue));
  }
}