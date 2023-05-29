import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService, User } from './register.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  errorMessage = '';
  isRegistered = false;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isUsernameUnique(username: string): Observable<boolean> {
    return this.registerService.checkUsername(username).pipe(
      map((response: boolean) => {
        return response; // the username is unique if the response is true
      }),
      catchError((error) => {
        console.error('Error checking username:', error);
        return of(false); // default to not unique if there's an error
      })
    );
  }

  onSubmit(): void {
    this.errorMessage = '';
    const name = this.registerForm.value.name;
    const email = this.registerForm.value.email;
    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;

    this.isUsernameUnique(username).subscribe(isUnique => {
      if (!isUnique) {
        this.errorMessage = 'Username is already in use.';
        return;
      }

      this.registerService.register(name, email, username, password).subscribe(
        (response: User) => {
          console.log('Registration response:', response);
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.error('Registration error:', error);
          this.errorMessage = 'Registration error. Please try again.';
        }
      );
    }, (error) => {
      console.error('Error checking username uniqueness:', error);
      this.errorMessage = 'Error checking username uniqueness. Please try again.';
    });
  }


}