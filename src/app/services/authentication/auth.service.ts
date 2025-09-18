import { inject, Injectable, signal } from '@angular/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, signOut, setPersistence, browserSessionPersistence } from '@angular/fire/auth';
import { SignupLoginForm } from '../../interfaces/signup-login-form';
import { LoginData } from '../../interfaces/login-data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);
  router = inject(Router);
  registratedUserID = signal('');

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

  login(loginData: LoginData) {
    signInWithEmailAndPassword(this.auth, loginData.email, loginData.password)
    .then((userCredential) => {
      this.setPersistence();
      this.router.navigate(['/panel']);
      // Signed in 
      // console.log('User logged in');
      // const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  logout() {
    signOut(this.auth).then(() => {
      console.log('User logged out');
    }).catch((error) => {
      // An error happened.
    });
  }

  setPersistence() {
    setPersistence(this.auth, browserSessionPersistence)
      .then(() => {
        console.log('Persistence set to session');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
}
