import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from '../../../services/contacts/contact.service';
import { CommonModule } from '@angular/common';
import { contacts } from '../../../interfaces/user-data';

@Component({
  selector: 'app-new-contact',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.scss',
})
export class NewContactComponent implements OnInit {
  contactForm!: FormGroup;
  loginError = false;
  isEditing = false;
  editingContact: contacts | null = null;

  private fb = inject(FormBuilder);
  contactService = inject(ContactService);

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
    });

    // Prüfen ob ein Kontakt bearbeitet wird
    this.editingContact = this.contactService.editingContact;
    this.isEditing = !!this.editingContact;
    
    if (this.isEditing && this.editingContact) {
      this.contactForm.patchValue({
        name: this.editingContact.name,
        email: this.editingContact.email,
        phoneNumber: this.editingContact.phoneNumber
      });
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      if (this.isEditing && this.editingContact?.id) {
        // Kontakt aktualisieren
        this.contactService.updateContact(this.editingContact.id, this.contactForm.value);
      } else {
        // Neuen Kontakt erstellen
        this.contactService.addNewContact(this.contactForm.value);
      }
      
      this.contactService.addNewContactWindow();
      this.contactForm.reset();
      this.loginError = false;
    } else {
      this.loginError = true;
    }
  }

  setLoginError(): void {
    this.loginError = false;
  }

  formDelete() {
    this.contactForm.reset();
  }

  closeNewContact() {
    this.contactService.addNewContactWindow();
  }
}
