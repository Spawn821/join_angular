import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Observable, Subscriber } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { contacts } from '../../interfaces/user-data';
import { SingleContactComponent } from './single-contact/single-contact.component';
import { NewContactComponent } from "./new-contact/new-contact.component";
import { ContactService } from '../../services/contacts/contact.service';

@Component({
  selector: 'app-contacts',
  imports: [AsyncPipe, SingleContactComponent, NewContactComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  firestoreService = inject(FirestoreService);
  contactService = inject(ContactService);
  contacts$?: Observable<contacts[]>;
  selectedContact?: contacts;

  ngOnInit() {
    console.log('Hallo Welt');
    this.contacts$ = this.firestoreService.getContacts();
    // this.contacts$.subscribe((name) => {
    //   console.log(name);
    // });
  }

  selectContact(contact: contacts) {
    this.selectedContact = contact;
  }

  get newContactWindow() {
    return this.contactService.newContactWindow
  }
}
