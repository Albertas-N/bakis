import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  entertainmentPlaces: any[] = [];
  filterForm: FormGroup;
  sortOptions: { value: string, label: string }[] = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'name', label: 'Name' },
    { value: 'rating', label: 'Rating' }
  ];

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      search: '',
      sortBy: ''
    });
  }

  ngOnInit() {
    this.http.get<any[]>('/api/entertainment-places').subscribe(
      (data: any[]) => {
        this.entertainmentPlaces = data;
      }
    );
  }
}
