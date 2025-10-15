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
    this.authService.autoSignin();
  }
}
