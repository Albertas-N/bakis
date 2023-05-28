import { Component, OnInit, Inject, Input, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../data.service';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.css'],
})
export class ResultDetailsComponent implements OnInit {
  currentUser: any = null;
  @Input() item!: Category;


  constructor(
    @Optional() public dialogRef: MatDialogRef<ResultDetailsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    public userService: UserService,
    private dialog: MatDialog
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

  openDetailsDialog(category: Category): void {
    const dialogRef = this.dialog.open(ResultDetailsComponent, {
      data: { id: category.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  onLike(itemId: number): void {
    if (!this.currentUser) {
      console.log('Only logged in users can like items.');
      return;
    }
    console.log('User ID:', this.currentUser.id);
    console.log('Item ID:', itemId);
    this.userService.addLike(this.currentUser.id, itemId).subscribe(
      () => console.log('Item liked!'),
      (error) => console.log('Error liking item:', error)
    );
}


  

  onClose(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
