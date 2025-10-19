import { Component, computed, inject, OnInit } from '@angular/core';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  private authService = inject(AuthService);
  isAuthenticated = computed(() => {
    return this.authService.isAuthenticated();
  });

}
