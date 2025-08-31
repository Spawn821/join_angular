import { Injectable } from '@angular/core';
import { Auth, getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { SignupLoginForm } from '../../interfaces/signup-login-form';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = getAuth();

  constructor(private firebaseAuth: Auth) { }

  createUserAccount(loginForm:SignupLoginForm) {
    createUserWithEmailAndPassword(this.auth, loginForm.email, loginForm.password);
  }
}
