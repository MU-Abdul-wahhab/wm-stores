import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DropdownService {
  /** Currently active dropdown ID */
  activeDropdown = signal<string | null>(null);

  /** Items for active dropdown */
  dropdownItems = signal<string[]>([]);

  /** Selected item */
  selectedItem = signal<string | null>(null);

  openDropdown(id: string, items: string[]) {
    this.activeDropdown.set(id);
    this.dropdownItems.set(items);
  }

  closeDropdown() {
    this.activeDropdown.set(null);
    this.dropdownItems.set([]);
  }

  selectItem(item: string) {
    this.selectedItem.set(item);
    this.closeDropdown();
  }

  isOpen(id: string): boolean {
    return this.activeDropdown() === id;
  }
}
