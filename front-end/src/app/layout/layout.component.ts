import { Component, computed, inject, OnInit } from '@angular/core';

import { AuthService } from '../core/services/auth.service';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  private authService = inject(AuthService);
  isAuthenticated = computed(() => {
    return this.authService.isAuthenticated();
  });

}
