import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../data.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']

})
export class CategoriesComponent implements OnInit {
  categories: Category[]=[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Category[]>('./assets/data.json').subscribe((data: Category[]) => {
      this.categories = data;
    });
  }
}