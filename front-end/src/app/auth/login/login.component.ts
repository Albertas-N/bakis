import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register/register.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
  
    this.registerService.getUsers().subscribe(
      (users: any[]) => {
        const user = users.find(user => user.username === username && user.password === password);
        if(user) {
          this.userService.updateCurrentUser(user);
          this.router.navigate(['/']);
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