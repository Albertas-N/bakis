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
      (user: User) => {
        console.log('User:', user);  // <-- Add this
  
        if (user) {
          this.userService.updateCurrentUser(user);
          this.router.navigate(['/profile']);
        } else {
          // login was unsuccessful, display an error message
          this.errorMessage = 'Invalid username or password.';
        }
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'An error occurred while trying to log in.';
      }
    );
  }
  
}
