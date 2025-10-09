import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-contacts',
  imports: [ RouterOutlet ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  currentLetter:string = 'b';
  contacts = ['Beata', 'Bertram', 'Harald', 'Axel', 'Doro', 'Tatjana'];

  checkSameLetter(letterIndex:number) {
    return this.currentLetter == (letterIndex + 10).toString(36);
  }

  setCurrentLetter(letterIndex:number) {
    this.currentLetter = (letterIndex + 10).toString(36);
  }

}
