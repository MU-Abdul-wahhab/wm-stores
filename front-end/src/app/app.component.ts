import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthService } from './core/services/auth.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';

  private authService = inject(AuthService);
  isAuthenticated = signal(false);

  ngOnInit() {
    this.authService.user$.subscribe({
      next: user => {
        this.isAuthenticated.set(!!user);
        this.authService.isAuthenticated.set(!!user);
      }
    });

    this.authService.setupStorageListener();

    const hasUserData = localStorage.getItem('wmStoreLoggedUserData');
    if (hasUserData && !this.authService.user$.value) {
      this.authService.autoSignin();
    }
  }
}
