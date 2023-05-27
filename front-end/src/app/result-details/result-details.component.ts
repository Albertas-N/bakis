import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../data.service';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.css'],
})
export class ResultDetailsComponent implements OnInit {
  currentUser: any = null;
  @Input() item!: Category;
  

  constructor(
    public dialogRef: MatDialogRef<ResultDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private userService: UserService,
  ) {
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    this.dataService.getItemDetails(this.data.id).subscribe(
      (item: Category) => {
        this.item = item;
      },
      (error: any) => {
        console.error('Error fetching item details:', error);
      }
    );
}

  onLike(itemId: number): void {
    if (!this.currentUser) {
      console.log('Only logged in users can like items.');
      return;
    }
    this.userService.addLike(this.currentUser.id, itemId).subscribe(
      () => console.log('Item liked!'),
      (error) => console.log('Error liking item:', error)
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
