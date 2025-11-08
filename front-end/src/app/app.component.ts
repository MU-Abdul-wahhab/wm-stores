import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {AuthService} from './core/services/auth.service';
import {AppConfigService} from './core/services/app-config.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Evara';

  private authService = inject(AuthService);
  private configService = inject(AppConfigService);
  isAuthenticated = signal(false);

  async ngOnInit() {
    await this.configService.loadConfig();
    let appName = this.configService.getSnapshot()?.appName;
    this.title = appName ? appName : 'Evara';

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
