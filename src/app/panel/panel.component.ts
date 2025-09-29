import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { NavsidebarComponent } from '../shared/navsidebar/navsidebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel',
  imports: [
    HeaderComponent,
    NavsidebarComponent,
    RouterOutlet,
    CommonModule
],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent {

  private router = inject(Router);

  currentRoute() {
    return this.router.url == '/panel/contacts';
  }
}
