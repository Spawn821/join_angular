import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
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

  private firstLastNameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.trim();
    if (!value) {
      return { required: true };
    }
    
    const nameParts = value.split(' ').filter((part: string) => part.length > 0);
    if (nameParts.length < 2) {
      return { firstLastNameRequired: true };
    }
    if (nameParts.length > 2) {
      return { tooManyNames: true };
    }
    
    return null;
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [this.firstLastNameValidator.bind(this)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
    });

    this.contactEdit()
  }

  contactEdit() {
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
        this.contactService.updateContact(this.editingContact.id, this.contactForm.value);
      } else {
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
