import { Component, OnInit } from '@angular/core';
import { UserService, UserLiked } from '../user.service';
import { RegisterService, User } from '../auth/register/register.service';
import { DataService } from '../data.service';
import { Category } from '../data.service';
import { ResultDetailsComponent } from '../result-details/result-details.component';
import { tap, map, switchMap } from 'rxjs';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: User | null = null;
  currentUser: any;
  likedItems: Category[] = [];
  errorMessage: string = '';

  constructor(public userService: UserService, private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();
    if (user && user.id) {
      this.userService.getUserData(user.id)
        .subscribe(
          user => this.userData = user,
          error => this.errorMessage = error
        );

        this.userService.getLikes(user.id)
        .subscribe(
          likedItems => {
            const entertainmentIds = likedItems.map(item => item.entertainment);
            
            forkJoin(entertainmentIds.map(id => this.dataService.getItemDetails(id)))
              .subscribe(
                entertainments => this.likedItems = entertainments,
                error => this.errorMessage = error
              );
          },
          error => this.errorMessage = error
        );
    }
  }

  openDetailsDialog(entertainment: Category): void {
    const dialogRef = this.dialog.open(ResultDetailsComponent, {
      width: '500px',
      data: { id: entertainment.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
