import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  firestore = inject(Firestore);
  firestoreService = inject(FirestoreService);

  newContactWindow: boolean = false;

  constructor() {}

  addNewContactWindow() {
    this.newContactWindow =
      !this.newContactWindow;
  }

  async addNewContact(contactData: any) {
    await addDoc(
      collection(
        this.firestoreService.getCollection('contacts'),
        'DO7MD4HsU3RzCGbZyQDReZLrQFn2',
        'contacts',
      ),
      {
        name: contactData.name,
        email: contactData.email,
        color: '00BEE8',
        phoneNumber: contactData.phoneNumber,
      },
    );
  }
}
