import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { contacts } from '../../interfaces/user-data';

@Component({
  selector: 'app-contacts',
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  firestoreService = inject(FirestoreService);
  contacts$!: Observable<contacts[]>;

  ngOnInit() {
    console.log('Hallo Welt');
    this.contacts$ = this.firestoreService.getContacts();
    this.contacts$.subscribe((name) => {
      console.log(name);
    });
  }
}
