import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { NavsidebarComponent } from '../shared/navsidebar/navsidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-panel',
  imports: [
    HeaderComponent,
    NavsidebarComponent,
    RouterOutlet
],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent { }
