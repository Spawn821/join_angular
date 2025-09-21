import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError = false;

  private fb = inject(FormBuilder);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

onSubmit(): void {
  console.log(this.loginForm.value);
  
  if (this.loginForm.valid) {
     this.authService.login(this.loginForm.value)
      .catch(() => {
        this.loginError = true;
        // this.loginForm.get('email');
        // this.loginForm.get('password');
      });
  }
}

  guestLogin(): void {
    this.loginForm.setValue({
      email: 'guest@example.com',
      password: 'guest'
    });
    console.log('Guest login selected');
  }

  setLoginError() {
    this.loginError = false;
  }
}
