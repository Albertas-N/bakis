import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Category, Event } from '../data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.css'],
})
export class ResultDetailsComponent implements OnInit {
  result!: Category | Event;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const type = this.route.snapshot.paramMap.get('type');
    if (id && type) {
      this.getResultDetails(id, type);
    }
  }


  getResultDetails(id: number, type: string): void {
    if (type === 'event') {
      this.dataService.getEvent(id).subscribe(
        (event: Event) => {
          this.result = event;
        },
        (error: any) => {
          console.error(error);
        }
      );
    } else if (type === 'category') {
      this.dataService.getCategory(id).subscribe(
        (category: Category) => {
          this.result = category;
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  openDialog(id: number, type: string): void {
    const dialogRef = this.dialog.open(ResultDetailsComponent, {
      data: { id, type },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog closed: ${result}`);
    });
  }
}
