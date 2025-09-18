import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/authentication/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'join_angular';

  private auth = inject(AuthService);

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Prüfe, ob der Benutzer zur Login-Seite navigiert
        if (event.url === '/') {
          this.logout(); // Benutzer ausloggen
        }
      }
    });
  }

  private async logout() {
    await this.auth.logout(); // Firebase-Logout
    console.log('User logged out automatically');
  }
}
