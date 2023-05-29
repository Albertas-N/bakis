import { Component, EventEmitter, Output, Input, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { DataService, Category } from '../data.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ResultDetailsComponent } from '../result-details/result-details.component';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserService, Recommendation } from '../user.service';

type CategoryOrRecommendation = Category | Recommendation;


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  searchTerm: string = '';
  newResults: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  searchTerm$ = new Subject<string>();
  @ViewChild('searchInput') searchInput!: ElementRef;
  recommendations: Recommendation[] = [];
  originalRecommendations: Recommendation[] = [];
  showRecommendations: boolean = false;



  constructor(private dataService: DataService, private dialog: MatDialog, private userService: UserService) { }  // Add userService to constructor

  ngOnInit(): void {
    this.loadRecommendations();
    this.userService.likedCategoriesUpdated.subscribe(() => this.loadRecommendations());

    this.searchTerm$
      .pipe(
        debounceTime(300),
        switchMap(term => this.dataService.search(term))
      )
      .subscribe(
        (results: Category[]) => {
          this.newResults.next(results);
          console.log('Results from search():', results);
        },
        (error: any) => {
          console.error('Error fetching search results:', error);
        }
      );
  }

  loadRecommendations(): void {
    const user = this.userService.getCurrentUser();
    if (user) {
      this.userService.getRecommendations(user.id)
        .subscribe(data => {
          this.recommendations = data;
          this.originalRecommendations = [...data];
          this.showRecommendations = data.length > 0;
        });
    }
  }

  search(): void {
    if (this.showRecommendations) {
      this.recommendations = this.recommendations.filter(item => item.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else {
      this.searchTerm$.next(this.searchTerm);
    }
  }

  openDetailsDialog(result: CategoryOrRecommendation): void {
    const dialogRef = this.dialog.open(ResultDetailsComponent, {
      width: '1000px',
      panelClass: 'dialog-container',
      data: { id: result.id },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  onSearchTermChange(): void {
    if (this.searchTerm.length === 0) {
      this.recommendations = [...this.originalRecommendations]; // <--- new
    }
    this.search();
  }
}
