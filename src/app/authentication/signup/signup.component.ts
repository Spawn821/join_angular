import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  loginForm!: FormGroup;
  private fb = inject(FormBuilder);
  authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      person: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService.createUserAccount(this.loginForm.value);
    this.loginForm.reset();
  }
}
