import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../../services/contacts/contact.service';

@Component({
  selector: 'app-new-contact',
  imports: [FormsModule],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.scss',
})
export class NewContactComponent {

  contactService = inject(ContactService)

  name: string = '';
  email: string = '';
  phoneNumber: number = 0;

  onSubmit() {
    // console.log('Username:', this.name);
    // console.log('Password:', this.email);
    // console.log('Password:', this.phoneNumber);
    let contactData = {
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
    }

    this.contactService.addNewContact(contactData)
  }
}
