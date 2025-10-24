import { Component, HostListener, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

import { DropdownComponent } from "../../shared/components/dropdown/dropdown.component";
import { CustomSelectComponent } from "../../shared/components/custom-select/custom-select.component";

@Component({
  selector: 'app-nav-sidebar',
  imports: [DropdownComponent, CustomSelectComponent, RouterLink],
  templateUrl: './nav-sidebar.component.html',
  styleUrl: './nav-sidebar.component.css',
})
export class NavSidebarComponent {
  hamburgerClosed = output<void>();

  onHamburgerClose() {
    this.hamburgerClosed.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.onHamburgerClose();
  }
}
