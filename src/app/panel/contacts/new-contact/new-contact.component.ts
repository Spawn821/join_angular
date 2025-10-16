import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from '../../../services/contacts/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-contact',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.scss',
})
export class NewContactComponent {
  contactForm!: FormGroup;
  loginError = false;

  private fb = inject(FormBuilder);
  contactService = inject(ContactService);

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService.addNewContact(this.contactForm.value);
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
