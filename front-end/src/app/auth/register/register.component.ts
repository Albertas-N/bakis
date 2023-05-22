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
      () => {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        this.registerService.registerLogin(username, password).subscribe(
          () => {
            this.isRegistered = true;
          },
          (error) => {
            this.errorMessage = error.error.message;
          }
        );
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }
}