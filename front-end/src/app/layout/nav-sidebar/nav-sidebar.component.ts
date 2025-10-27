import {Component, HostListener, output, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';

import {DropdownComponent} from "../../shared/components/dropdown/dropdown.component";
import {CustomSelectComponent} from "../../shared/components/custom-select/custom-select.component";
import { IMAGES } from '../../shared/constants/image-path';
import { NAV_LINKS, NavLink } from '../../shared/constants/nav-links';

@Component({
  selector: 'app-nav-sidebar',
  imports: [DropdownComponent, CustomSelectComponent, RouterLink],
  templateUrl: './nav-sidebar.component.html',
  styleUrl: './nav-sidebar.component.css',
  host: {
    'class': 'bg-white rounded-tl-sm rounded-bl-sm block lg:hidden z-20 fixed top-0 bottom-0 right-0 min-h-screen shadow shadow-blue-100 max-w-96 sm:w-96',
    '@sidebarAnimation': ''
  }
})
export class NavSidebarComponent {
  APP_LOGO = IMAGES.APP_LOGO;
  NAV_LINKS = signal(NAV_LINKS);
  hamburgerClosed = output<void>();

   getSubNavLabels(subLinks?: NavLink[]): string[] {
    return subLinks ? subLinks.map(sub => sub.label) : [];
  }

  onHamburgerClose() {
    this.hamburgerClosed.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.onHamburgerClose();
  }
}
