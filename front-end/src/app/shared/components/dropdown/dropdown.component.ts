import { Component, input, signal, ElementRef, ViewChild, HostListener, output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px) scale(0.95)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0, transform: 'translateY(20px) scale(0.95)' })),
      ]),
    ]),
  ],
})
export class DropdownComponent {
  // Inputs
  triggerElement = input<'hover' | 'click'>('hover');
  position = input<'left' | 'right' | 'center'>('left');
  width = input<string>('min-w-56');

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