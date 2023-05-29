import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService, User } from '../register/register.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  onSubmit(): void {
    this.errorMessage = '';
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.registerService.loginUser(username, password).subscribe(
      (user) => {
        if (user && user.password === password) {
          // If the login was successful, save the user's profile ID and navigate to another page.
          this.userService.setCurrentUser(user);  // update this line
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/profile']);
        } else {
          this.errorMessage = 'Invalid password';
        }
      },
      (error) => {
        this.errorMessage = 'Error logging in: ' + (error.error.message || error.message);
      }
    );
    
  }

}
