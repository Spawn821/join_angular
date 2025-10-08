import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-contacts',
  imports: [ RouterOutlet ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  contacts = ['Beata', 'Harald', 'Axel', 'Doro'];

  test(contact:any, $index:number) {
    let number = contact.charAt(0).toLowerCase() == ($index+10).toString(36);
    console.log(contact.charAt(0).toLowerCase(), ($index+10).toString(36));
    
    return number;
  }

}
