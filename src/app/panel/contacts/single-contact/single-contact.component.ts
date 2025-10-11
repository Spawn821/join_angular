import { Component, Input } from '@angular/core';
import { contacts } from '../../../interfaces/user-data';

@Component({
  selector: 'app-single-contact',
  imports: [],
  templateUrl: './single-contact.component.html',
  styleUrl: './single-contact.component.scss',
})
export class SingleContactComponent {
  
  @Input() contact?: contacts;

}
