import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResultDetailsComponent } from '../result-details/result-details.component';


@Component({
  selector: 'app-open-result-details',
  templateUrl: './open-result-details.component.html',
  styleUrls: ['./open-result-details.component.css'],
})
export class OpenResultDetailsComponent {
  constructor(private dialog: MatDialog) {}
}