import { Component, input, signal, ElementRef, ViewChild, HostListener, output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  host: {
    'class': 'flex items-center'
  },
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scaleY(0)' }),
        animate('350ms ease-out', style({ opacity: 1, transform: 'scaleY(1)' })),
      ]),
      transition(':leave', [
        animate('350ms ease-in', style({ opacity: 0, transform: 'scaleY(0)' })),
      ]),
    ]),
  ],
  imports: [
    NgClass
  ]
})
export class DropdownComponent {
  // Inputs
  triggerElement = input<'hover' | 'click'>('hover');
  position = input<'left' | 'right' | 'center'>('left');
  width = input<string>('min-w-56');
  noneAbsoluteSelect = input<boolean>(false);

  options = input<string[]>([]);

  // Outputs
  closeDropdown = output<void>();

  // Signals
  public isOpen = signal(false);
  isMouseOver = signal(false);

  extraStyles = input<{ [key: string]: string } | null>(null);
  extraClasses = input<string[] | null>(null);
  placeholder = input<string>('Select an option');
  selected = input<string | null>(null);
  needAnSearchBar = input<boolean>(false);

  @ViewChild('dropdownContainer', { read: ElementRef })
  dropdownContainer!: ElementRef<HTMLDivElement>;

  onMouseEnter() {
    this.isMouseOver.set(true);
    if (this.triggerElement() === 'hover') {
      this.isOpen.set(true);
    }
  }

  onMouseLeave() {
    this.isMouseOver.set(false);

    if (this.triggerElement() === 'hover') {
      setTimeout(() => {
        if (!this.isMouseOver()) {
          this.close();
        }
      }, 150);
    }
  }

  toggleDropdown() {
    if (this.triggerElement() === 'click') {
      this.isOpen.set(!this.isOpen());
    }
  }

  // Add this method to close dropdown
  close() {
    this.isOpen.set(false);
  }

  // Listen for close events from child components
  onCloseRequest() {
    this.close();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.triggerElement() === 'click' &&
      !this.dropdownContainer?.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }
}
