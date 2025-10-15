import {Component, inject} from '@angular/core';
import {AuthService} from '../core/services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  private authService = inject(AuthService);
  isAuthenticated = false;

  ngOnInit(){
    this.authService.user$.subscribe({
      next: user => {
        this.isAuthenticated=!!user;
      }
    });

    window.addEventListener('storage', (event) => {
      if (event.key === 'wmStoreLoggedUserData' && event.newValue === null) {
        this.authService.logout();
      }
    });

    const hasUserData = localStorage.getItem('wmStoreLoggedUserData');
    if (hasUserData && !this.authService.user$.value) {
      this.authService.autoSignin();
    }
  }
}
