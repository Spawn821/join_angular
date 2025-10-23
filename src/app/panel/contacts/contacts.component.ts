import { Component, inject } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Observable } from 'rxjs';
import { contacts } from '../../interfaces/user-data';
import { SingleContactComponent } from './single-contact/single-contact.component';
import { NewContactComponent } from "./new-contact/new-contact.component";
import { ContactService } from '../../services/contacts/contact.service';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-contacts',
  imports: [SingleContactComponent, NewContactComponent],
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
    this.contactService.getContacts(uid ?? '');
  }

  get contacts() {
    return this.contactService.contacts();
  }

  selectContact(contact: contacts) {
    console.log(contact);
    
    this.contactService.selectedContact.set(contact);
    // this.selectedContact = contact;
  }

  get newContactWindow() {
    return this.contactService.newContactWindow
  }
}
