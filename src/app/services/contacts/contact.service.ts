import { inject, Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot,
} from '@angular/fire/firestore';
import { FirestoreService } from '../firestore/firestore.service';
import { contacts } from '../../interfaces/user-data';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  firestore = inject(Firestore);
  firestoreService = inject(FirestoreService);
  authService = inject(AuthService);

  contacts = signal<contacts[]>([]);
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

  constructor() {}

  private createContactsQuery(uid: string) {
    return query(
      collection(this.firestore, `contacts/${uid}/contacts`),
      orderBy('name'),
    );
  }

  getContacts(uid: string) {
    const q = this.createContactsQuery(uid);
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const contacts = querySnapshot.docs.map((doc) =>
          this.getContactData(doc),
        );
        this.contacts.set(contacts);
      },
      (error) => console.error(error),
    );
    return () => unsubscribe();
  }

  getContactData(doc: any) {
    return {
      name: doc.data()['name'],
      id: doc.id,
      email: doc.data()['email'],
      color: doc.data()['color'],
      initials: doc.data()['initials'],
      phoneNumber: doc.data()['phoneNumber'],
      firstContactperLetter: doc.data()['firstContactperLetter'],
    };
  }

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

  async addNewContact(newContact: contacts) {
    const firstLetter = newContact.name.trim().charAt(0).toUpperCase();
    const contactsRef = collection(
      this.firestoreService.getCollection('contacts'),
      `${this.authService.getCurrentUserUid()}`,
      'contacts',
    );
    const q = query(contactsRef, where('firstLetter', '==', firstLetter));
    const querySnapshot = await getDocs(q);
    const isFirst = querySnapshot.empty;
    const contact = this.getNewContact(newContact, isFirst, firstLetter);
    const docRef = await addDoc(contactsRef, contact);
    await updateDoc(docRef, { id: docRef.id });
  }

  getNewContact(newContact: contacts, isFirst: boolean, firstLetter: string) {
    return {
      name: newContact.name,
      email: newContact.email,
      phoneNumber: newContact.phoneNumber,
      color: this.getColor(),
      initials: this.getInitials(newContact.name),
      firstLetter: firstLetter,
      firstContactperLetter: isFirst,
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

  async deleteContact(contactId: string, uid: string) {
    const docRef = doc(
      collection(
        this.firestoreService.getCollection('contacts'),
        `${uid}`,
        'contacts',
      ),
      contactId,
    );
    await deleteDoc(docRef);
  }

async updateContact(contactId: string, updatedContact: contacts) {
  const firstLetter = updatedContact.name.trim().charAt(0).toUpperCase();
  const contactsRef = collection(
    this.firestoreService.getCollection('contacts'),
    `${this.authService.getCurrentUserUid()}`,
    'contacts',
  );
  const q = query(contactsRef, where('firstLetter', '==', firstLetter));
  const querySnapshot = await getDocs(q);
  const isFirst = querySnapshot.empty;

  const docRef = this.getCollection(contactId);
  const contactData = this.getUpdateContact(updatedContact, isFirst, firstLetter);

  await updateDoc(docRef, contactData);
  this.selectedContact.set({ ...contactData, id: contactId });
}

getCollection(contactId: string) {
  return doc(
    collection(
      this.firestoreService.getCollection('contacts'),
      `${this.authService.getCurrentUserUid()}`,
      'contacts',
    ),
    contactId,
  );
}

getUpdateContact(updatedContact: contacts, isFirst: boolean, firstLetter: string) {
  return {
    name: updatedContact.name,
    email: updatedContact.email,
    phoneNumber: updatedContact.phoneNumber,
    initials: this.getInitials(updatedContact.name),
    color: this.selectedContact()?.color ?? this.getColor(),
    firstContactperLetter: isFirst,
    firstLetter: firstLetter,
  };
}

}
