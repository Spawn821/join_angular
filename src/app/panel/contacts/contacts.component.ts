import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Observable, Subscriber } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { contacts } from '../../interfaces/user-data';
import { SingleContactComponent } from './single-contact/single-contact.component';

@Component({
  selector: 'app-contacts',
  imports: [ AsyncPipe, SingleContactComponent ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  firestoreService = inject(FirestoreService);
  contacts$?: Observable<contacts[]>;
  selectedContact?: contacts;

  ngOnInit() {
    console.log('Hallo Welt');
    this.contacts$ = this.firestoreService.getContacts();
    this.contacts$.subscribe((name) => {
      console.log(name);
    });
  }

  selectContact(contact: contacts) {
    this.selectedContact = contact;
    console.log(this.selectedContact);
  }
}
