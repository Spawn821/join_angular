import { Component, inject, Input } from '@angular/core';
import { contacts } from '../../../interfaces/user-data';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { ContactService } from '../../../services/contacts/contact.service';
import { AuthService } from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-single-contact',
  imports: [CommonModule],
  templateUrl: './single-contact.component.html',
  styleUrl: './single-contact.component.scss',
})
export class SingleContactComponent {

  firestoreService = inject(FirestoreService);
  contactService = inject(ContactService);
  authService = inject(AuthService);
  
  @Input() contact?: contacts;

  async deleteContact(contact: any) {
    let uid = await this.authService.waitForUserUid();
    try {
      await this.contactService.deleteContact(contact.id, uid ?? '');
      this.contact = undefined;
    } catch (error) {
      console.error('Fehler beim Löschen des Kontakts:', error);
    }
  }

  editContact() {
    if (this.singleContact) {
      this.contactService.openEditContact(this.singleContact);
    }
  }

  get singleContact() {
    return this.contactService.selectedContact();
  }
}
