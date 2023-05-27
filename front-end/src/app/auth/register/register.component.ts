import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  errorMessage = '';
  isRegistered = false;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    const name = this.registerForm.value.name;
    const email = this.registerForm.value.email;
    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;


    this.registerService.register(name, email, username, password).subscribe(
      (registeredUser) => {
        // After successfully registering the user, automatically log them in.
        this.registerService.loginUser(username, password).subscribe(
          (loggedInUser) => {
            // If the login was successful, save the user's profile ID and navigate to another page.
            localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
            this.router.navigate(['/profile']);
          },
          (error) => {
            this.errorMessage = 'Error logging in: ' + (error.error.message || error.message);
          }
        );
      },
      (error) => {
        this.errorMessage = 'Error registering: ' + (error.error.message || error.message);
      }
    );
  }
}
