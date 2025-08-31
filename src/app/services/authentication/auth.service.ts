import { Injectable } from '@angular/core';
import { Auth, getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = getAuth();

  constructor(private firebaseAuth: Auth) { }

  createUserAccount(loginForm:any) {
    createUserWithEmailAndPassword(this.auth, loginForm.email, loginForm.password);
  }
}
