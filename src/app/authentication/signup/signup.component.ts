import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  loginForm!: FormGroup;

  passwordFields = [
    {
      controlName: 'password',
      placeholder: 'Password',
      show: false,
      hasValue: false,
    },
    {
      controlName: 'confirmPassword',
      placeholder: 'Confirm Password',
      show: false,
      hasValue: false,
    },
  ];

  private fb = inject(FormBuilder);
  authService = inject(AuthService);
  firestoreService = inject(FirestoreService);
  private Route = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        person: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        acceptPolicy: [false, Validators.requiredTrue],
      },
      { validators: this.passwordsMatchValidator },
    );
  }

  passwordsMatchValidator: ValidatorFn = (
    form: AbstractControl,
  ): ValidationErrors | null => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  };

  async onSubmit() {
    debugger;
    if (this.loginForm.valid) {
      try {
        const userID = await this.authService.createUserAccount(
          this.loginForm.value,
        );
        const userData = this.getUserData(userID);
        this.firestoreService.addUserToCollection(userData);
        this.loginForm.reset();
        this.Route.navigate(['/']);
      } catch (error) {
        console.error('Registrierung fehlgeschlagen:', error);
      }
    }
  }

  getUserData(userID: string) {
    return {
      name: this.loginForm.value.person,
      email: this.loginForm.value.email,
      uid: userID,
    };
  }

  togglePassword(index: number) {
    this.passwordFields[index].show = !this.passwordFields[index].show;
  }

  updateValue(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.passwordFields[index].hasValue = input.value.length > 0;
  }

  togglePolicy() {
  const control = this.loginForm.get('acceptPolicy');
  if (control) {
    control.setValue(!control.value);
  }
}
}
