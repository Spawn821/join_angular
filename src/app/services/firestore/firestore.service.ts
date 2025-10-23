import { inject, Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { UserData } from '../../interfaces/user-data';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  firestore = inject(Firestore);

  constructor() {}

  getCollection(collectionName: string) {
    return collection(this.firestore, collectionName);
  }

  async addUserToCollection(userData: UserData) {
    await setDoc(doc(this.getCollection('users'), userData.uid), {
      name: userData.name,
      email: userData.email,
      uid: userData.uid,
    });
  }
}
