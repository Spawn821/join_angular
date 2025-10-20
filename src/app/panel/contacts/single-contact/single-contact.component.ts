import { Component, inject, Input } from '@angular/core';
import { contacts } from '../../../interfaces/user-data';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { ContactService } from '../../../services/contacts/contact.service';

@Component({
  selector: 'app-single-contact',
  imports: [CommonModule],
  templateUrl: './single-contact.component.html',
  styleUrl: './single-contact.component.scss',
})
export class SingleContactComponent {

  firestoreService = inject(FirestoreService);
  contactService = inject(ContactService);
  
  @Input() contact?: contacts;

  async deleteContact(contact: any) {
    try {
      await this.contactService.deleteContact(contact.id);
      this.contact = undefined;
    } catch (error) {
      console.error('Fehler beim Löschen des Kontakts:', error);
    }
  }
}
