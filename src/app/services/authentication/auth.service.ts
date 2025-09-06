import { Injectable, signal } from '@angular/core';
import { Auth, getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { SignupLoginForm } from '../../interfaces/signup-login-form';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = getAuth();
  registratedUserID = signal('');

  constructor(private firebaseAuth: Auth) { }

  async createUserAccount(loginForm:SignupLoginForm) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        loginForm.email,
        loginForm.password
      );
      return userCredential.user.uid;
    } catch (error) {
      console.error('Fehler beim Registrieren:', error);
      throw error;
    }
  }
}
