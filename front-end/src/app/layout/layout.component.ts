import {Component, computed, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {AuthService} from '../core/services/auth.service';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {MoveTopBtnComponent} from '../shared/components/move-top-btn/move-top-btn.component';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FooterComponent, MoveTopBtnComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  private authService = inject(AuthService);

  isAuthenticated = computed(() => {
    return this.authService.isAuthenticated();
  });
}
