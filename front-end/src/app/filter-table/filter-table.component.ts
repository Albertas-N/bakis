import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  template: `
    <table mat-table [dataSource]="dataSource">
      <!-- Define the table columns here -->
    </table>
  `,
  styleUrls: ['./filter-table.component.css']
})
export class FilterTableComponent {
  @Input() dataSource!: MatTableDataSource<any>;
}