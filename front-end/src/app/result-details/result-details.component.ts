import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService, Category, SearchResult } from '../data.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.css'],
})
export class ResultDetailsComponent implements OnInit {
  result!: SearchResult;

  constructor(
    public dialogRef: MatDialogRef<ResultDetailsComponent, { panelClass: 'dialog-container' }>,
    @Inject(MAT_DIALOG_DATA) public data: SearchResult
  ) {}
  

  ngOnInit(): void {
    // Add any necessary code here for initialization
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
