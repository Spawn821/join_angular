import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authentication',
  imports: [ RouterOutlet, RouterLink],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {
  private router = inject(Router);

  get Router() {
    return this.router;
  }
}
