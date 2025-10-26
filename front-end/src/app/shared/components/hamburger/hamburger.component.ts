import { Component, signal } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { NavSidebarComponent } from '../../../layout/nav-sidebar/nav-sidebar.component';


@Component({
  selector: 'app-hamburger',
  standalone: true,
  imports: [NavSidebarComponent],
  templateUrl: './hamburger.component.html',
  styleUrl: './hamburger.component.css',
  animations: [
    trigger('sidebarAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms linear', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms linear', style({ transform: 'translateX(100%)', opacity: 0 })),
      ]),
    ]),
    trigger('overlayAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms linear', style({ opacity: 0.5 })),
      ]),
      transition(':leave', [
        animate('300ms linear', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class HamburgerComponent {
  isOpen = signal(false);

  onHamburgerOpen() {
    document.body.style.overflow = 'hidden';
    this.isOpen.set(true);
  }

  onHamburgerClose() {
    document.body.style.overflow = '';
    this.isOpen.set(false);
  }
}
