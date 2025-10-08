import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { PanelComponent } from './panel/panel.component';
import { AuthGuard } from './guards/auth.guard';
import { ContactsComponent } from './panel/contacts/contacts.component';
import { SummaryComponent } from './panel/summary/summary.component';
import { SingleContactComponent } from './panel/contacts/single-contact/single-contact.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
    ],
  },
  { path: 'panel',
    component: PanelComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'summary',
        component: SummaryComponent,
      },
      {
        path: 'contacts',
        component: ContactsComponent,
    children: [
      {
        path: 'contact',
        component: SingleContactComponent,
      },
    ],
      }
    ]
  },

  { path: '**', redirectTo: '/login' }
];
