import { Component, output, ViewChild, HostListener, input, signal, ElementRef, viewChild } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgClass, NgStyle } from '@angular/common';


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
  imports: [NgClass, NgStyle],
})
export class DropdownComponent {
  // Inputs
  options = input<string[]>([]);
  extraStyles = input.required<{ [key: string]: string }>();
  extraClasses = input.required<string[]>();
  placeholder = input<string>('Select an option');
  selected = input<string | null>(null);

  // Outputs
  selectionChange = output<string>();

  // Signals
  isOpen = signal(false);
  selectedValue = signal<string | null>(null);
  isMouseOver = signal(false);

  @ViewChild('selectContainer', { read: ElementRef })
  selectContainer!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    // Initialize with selected value if provided
    const initialValue = this.selected();
    if (initialValue) {
      this.selectedValue.set(initialValue);
    } else if (this.options().length > 0) {
      // Optionally select first item by default
      // this.selectedValue.set(this.options()[0]);
    }
  }

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
  }

  onMouseEnter() {
    this.isMouseOver.set(true);
  }

  onMouseLeave() {
    this.isMouseOver.set(false);
    // Close dropdown after a short delay if mouse leaves
    setTimeout(() => {
      if (!this.isMouseOver()) {
        this.isOpen.set(false);
      }
    }, 150);
  }

  selectItem(item: string) {
    this.selectedValue.set(item);
    this.selectionChange.emit(item);
    this.isOpen.set(false);
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.selectContainer?.nativeElement.contains(event.target as Node)) {
      this.isOpen.set(false);
    }
  }
}
