import { inject, Injectable, signal } from '@angular/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, signOut, setPersistence, browserSessionPersistence, onAuthStateChanged } from '@angular/fire/auth';
import { SignupLoginForm } from '../../interfaces/signup-login-form';
import { LoginData } from '../../interfaces/login-data';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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

async login(loginData: LoginData) {
  return signInWithEmailAndPassword(this.auth, loginData.email, loginData.password)
    .then((userCredential) => {
      this.setPersistence();
      this.router.navigate(['/panel']);
    });
}

  logout() {
    signOut(this.auth).then(() => {
      console.log('User logged out');
    }).catch((error) => {
      console.error('Error during logout:', error);
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

  getCurrentUserUid() {
    return this.auth.currentUser?.uid;
  }

  async waitForUserUid(): Promise<string | null> {
    return new Promise((resolve) => {
      if (this.auth.currentUser) {
        resolve(this.auth.currentUser.uid);
      } else {
        const unsubscribe = onAuthStateChanged(this.auth, (user) => {
          unsubscribe();
          resolve(user?.uid || null);
        });
      }
    });
  }

  getAuthState(): Observable<any> {
    return new Observable((observer) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        observer.next(user);
      });
      return unsubscribe;
    });
  }
}
