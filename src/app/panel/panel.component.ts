import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { NavsidebarComponent } from '../shared/navsidebar/navsidebar.component';

@Component({
  selector: 'app-panel',
  imports: [
    HeaderComponent,
    NavsidebarComponent
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent { }
