import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Observable, Subscriber } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { contacts } from '../../interfaces/user-data';
import { SingleContactComponent } from './single-contact/single-contact.component';
import { NewContactComponent } from "./new-contact/new-contact.component";
import { ContactService } from '../../services/contacts/contact.service';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-contacts',
  imports: [AsyncPipe, SingleContactComponent, NewContactComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  firestoreService = inject(FirestoreService);
  contactService = inject(ContactService);
  authService = inject(AuthService);
  contacts$?: Observable<contacts[]>;
  selectedContact?: contacts;

  async ngOnInit() {
    const uid = await this.authService.waitForUserUid();
    this.contacts$ = this.firestoreService.getContacts(uid ?? '');
  }

  selectContact(contact: contacts) {
    this.contactService.selectedContact.set(contact);
    this.selectedContact = contact;
  }

  get newContactWindow() {
    return this.contactService.newContactWindow
  }
}
