import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
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
  private Route = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        person: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        acceptPolicy: [false, Validators.requiredTrue]
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  };

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.createUserAccount(this.loginForm.value);
      this.loginForm.reset();
      this.Route.navigate(['/']);
    }
  }
}
