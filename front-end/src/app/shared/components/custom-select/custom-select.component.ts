import { Component, output, ViewChild, HostListener, input, signal, ElementRef, viewChild, effect } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  imports: [NgClass, NgStyle, FormsModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.css'
})
export class CustomSelectComponent {
// Inputs
  _options = input<string[]>([]);
  options = signal<string[]>([]);
  filteredOptions = signal<string[]>([]);

  extraStyles = input<{ [key: string]: string } | null>(null);
  extraClasses = input<string[] | null>(null);
  placeholder = input<string>('Select an option');
  selected = input<string | null>(null);
  needAnSearchBar = input<boolean>(false);

  // Outputs
  selectionChange = output<string>();

  // Signals
  isOpen = signal(false);
  selectedValue = signal<string | null>(null);
  isMouseOver = signal(false);

  value = signal('');

  @ViewChild('selectContainer', { read: ElementRef })
  selectContainer!: ElementRef<HTMLDivElement>;

  constructor() {
    effect(() => {
      const allOptions = this._options();
      this.options.set(allOptions);
      this.filteredOptions.set(allOptions);
    });

    // Filter options based on search value
    effect(() => {
      const searchValue = this.value().toLowerCase();
      const allOptions = this.options();

      if (searchValue === '') {
        this.filteredOptions.set(allOptions);
      } else {
        const filtered = allOptions.filter(option =>
          option.toLowerCase().includes(searchValue)
        );
        this.filteredOptions.set(filtered);
      }
    });
  }

  ngOnInit() {
    const initialValue = this.selected();
    if (initialValue) {
      this.selectedValue.set(initialValue);
    } else if (this.filteredOptions().length > 0) {
      this.selectedValue.set(this.filteredOptions()[0]);
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

    setTimeout(() => {
      if (!this.isMouseOver()) {
        this.isOpen.set(false);
      }
    }, 150);
  }

  selectItem(item: string) {
    this.selectedValue.set(item);
    this.selectionChange.emit(item);
    this.value.set('');
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.selectContainer?.nativeElement.contains(event.target as Node)) {
      this.isOpen.set(false);
    }
  }
}
