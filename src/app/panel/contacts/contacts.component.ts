import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Observable, Subscriber } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { contacts } from '../../interfaces/user-data';
import { SingleContactComponent } from './single-contact/single-contact.component';

@Component({
  selector: 'app-contacts',
  imports: [AsyncPipe, SingleContactComponent ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  firestoreService = inject(FirestoreService);
  contacts$?: Observable<contacts[]>;
  selectedContact?: contacts;

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

  getInitialsContact(contact: contacts) {
    let splitContact = contact.name.split(' ');
    let firstLetter = splitContact[0].charAt(0);
    let secondLetter = splitContact[1].charAt(0);
    return firstLetter + secondLetter;
  }

  // getContactColor(contact:contacts) {
  //   let contactColor = this.contactColors[Math.floor(Math.random()*this.contactColors.length)];
  //   return contactColor
  // }
}
