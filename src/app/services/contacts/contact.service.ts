import { inject, Injectable, signal } from '@angular/core';
import { addDoc, collection, Firestore, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { FirestoreService } from '../firestore/firestore.service';
import { contacts, newContact } from '../../interfaces/user-data';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  firestore = inject(Firestore);
  firestoreService = inject(FirestoreService);
  authService = inject(AuthService);

  selectedContact = signal<contacts | null>(null);
  newContactWindow: boolean = false;
  editingContact: contacts | null = null;

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

  constructor() { }

  addNewContactWindow() {
    this.newContactWindow = !this.newContactWindow;
    if (!this.newContactWindow) {
      this.editingContact = null;
    }
  }

  openEditContact(contact: contacts) {
    this.editingContact = contact;
    this.newContactWindow = true;
  }

  async addNewContact(newContact: newContact) {
    let contact = this.getNewContact(newContact)
    await addDoc(
      collection(
        this.firestoreService.getCollection('contacts'),
        `${this.authService.getCurrentUserUid()}`,
        'contacts',
      ),
      contact,
    );
    // this.selectedContact.set(contact)
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

  async deleteContact(contactId: string, uid:string) {
    const docRef = doc(
      collection(
        this.firestoreService.getCollection('contacts'),
        `${uid}`,
        'contacts'
      ),
      contactId
    );
    await deleteDoc(docRef);
  }

  async updateContact(contactId: string, updatedContact: newContact) {
    const docRef = doc(
      collection(
        this.firestoreService.getCollection('contacts'),
        `${this.authService.getCurrentUserUid()}`,
        'contacts'
      ),
      contactId
    );
    
    const contactData = {
      name: updatedContact.name,
      email: updatedContact.email,
      phoneNumber: updatedContact.phoneNumber,
      initials: this.getInitials(updatedContact.name)
    };
    
    await updateDoc(docRef, contactData);
  }
}
