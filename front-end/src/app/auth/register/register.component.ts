import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService) {
    this.registerForm = this.formBuilder.group({
      // Add form controls here
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const newUser = {
      // Get values from the form
    };

    this.registerService.register(newUser).subscribe(
      response => {
        console.log('User registered successfully', response);
      },
      error => {
        console.error('Error registering user', error);
      }
    );
  }
}
