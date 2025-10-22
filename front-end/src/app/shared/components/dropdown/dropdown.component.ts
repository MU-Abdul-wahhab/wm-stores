import { Component, computed, inject, signal } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { DropdownService } from '../../../core/services/dropdown.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  animations: [
    trigger('list', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px) scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(10px) scale(0.95)' })),
      ]),
    ]),
  ],
})
export class DropdownComponent {
  private dropdownService = inject(DropdownService);
  dropdownItems = computed(() => this.dropdownService.dropdownItems());

  /** Tracks whether mouse is inside dropdown */
  private _isMouseOver = signal(false);

  isMouseOver(): boolean {
    return this._isMouseOver();
  }

  onMouseEnter() {
    this._isMouseOver.set(true);
  }

  onMouseLeave() {
    this._isMouseOver.set(false);
  }

  selectItem(item: string) {
    this.dropdownService.selectItem(item);
  }
}
