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

  currentLetter: string = '';
  contacts = ['Beata', 'Bertram', 'Harald', 'Axel', 'Doro', 'Tatjana'];
  contacts$!: Observable<contacts[]>;

  ngOnInit() {
    console.log('Hallo Welt');
    this.contacts$ = this.firestoreService.getContacts();
    this.contacts$.subscribe((name) => {
      console.log(name);
    });
  }

  checkSameLetter(letterIndex: number) {
    return this.currentLetter == (letterIndex + 10).toString(36);
  }

  setCurrentLetter(letterIndex: number) {
    this.currentLetter = (letterIndex + 10).toString(36);
  }
}
