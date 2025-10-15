import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { FirestoreService } from '../firestore/firestore.service';
import { contacts, newContact } from '../../interfaces/user-data';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  firestore = inject(Firestore);
  firestoreService = inject(FirestoreService);

  newContactWindow: boolean = false;

  contactColors = [
    '#FF7A00',
    '#FF5EB3',
    '#6E52FF',
    '#9327FF',
    '#00BEE8',
    '#1FD7C1',
    '#FF745E',
    '#FC71EE',
    '#FFC701',
    '#0038FF',
    '#C3FF2B',
    '#FFE62B',
    '#FF4646',
    '#FFBB2B',
  ];

  constructor() {}

  addNewContactWindow() {
    this.newContactWindow = !this.newContactWindow;
  }

  async addNewContact(newContact: newContact) {
    await addDoc(
      collection(
        this.firestoreService.getCollection('contacts'),
        'DO7MD4HsU3RzCGbZyQDReZLrQFn2',
        'contacts',
      ), this.getNewContact(newContact)
    );
  }

getNewContact(newContact: newContact) {
  return {
    name: newContact.name,
    email: newContact.email,
    phoneNumber: newContact.phoneNumber,
    color: this.getColor(),
    initials: this.getInitials(newContact.name),
  };
}

  getColor() {
    let color =
      this.contactColors[Math.floor(Math.random() * this.contactColors.length)];
    return color;
  }

  getInitials(contact: string) {
    let splitContact = contact.split(' ');
    let firstLetter = splitContact[0].charAt(0);
    let secondLetter = splitContact[1].charAt(0);
    return firstLetter + secondLetter;
  }
}
