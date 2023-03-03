import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[]=[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('./assets/data.json').subscribe((data: any[]) => {
      this.categories = data;
    });
  }
}