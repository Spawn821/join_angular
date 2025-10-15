import { Component, Input } from '@angular/core';
import { contacts } from '../../../interfaces/user-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-contact',
  imports: [CommonModule],
  templateUrl: './single-contact.component.html',
  styleUrl: './single-contact.component.scss',
})
export class SingleContactComponent {
  
  @Input() contact?: contacts;

}
