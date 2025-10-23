import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
  effect,
} from '@angular/core';
import { RouterLink } from "@angular/router";

import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';

@Component({
  selector: 'app-header',
  imports: [DropdownComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  // @ViewChild('currencySelect') currencySelect!: ElementRef<HTMLParagraphElement>;
  // @ViewChild('dropdownContainer') dropdownContainer!: ElementRef<HTMLDivElement>;
  // @ViewChild(DropdownComponent) dropdownComponent?: DropdownComponent;

  // // @HostListener('document:click', ['$event'])
  // // onDocumentClick(event: MouseEvent) {
  // //   if (this.dropdownService.isOpen('currency') &&
  // //     !this.dropdownContainer?.nativeElement.contains(event.target as Node)) {
  // //     this.dropdownService.closeDropdown();
  // //   }
  // // }

  // private dropdownService = inject(DropdownService);
  private destroyRef = inject(DestroyRef);

  // dropdownItems = ['$ Dollar', '₨ LKR', '€ Euro', '¥ Yen'];
  // selectedCurrency = '$ Dollar';

  currentIndex = 0;
  leavingIndex = -1;
  messages: string[] = [
    'Get great devices up to 50% off View details',
    'Supper Value Deals - Save more with coupons',
    'Trendy 25silver jewelry, save up 35% off today Shop now',
  ];

  // constructor() {
  //   // Reactively update selected currency when signal changes
  //   effect(() => {
  //     const selected = this.dropdownService.selectedItem();
  //     if (selected) {
  //       this.selectedCurrency = selected;
  //       this.setSelectValue(selected);
  //     }
  //   });
  // }

  ngOnInit() {
    this.startRotation();
  }

  // ngAfterViewInit() {
  //   this.setSelectValue(this.dropdownItems[0]);
  // }

  // onDropdownEnter() {
  //   this.dropdownService.openDropdown('currency', this.dropdownItems);
  // }

  // onDropdownMouseLeave() {
  //   setTimeout(() => {
  //     if (!this.isMouseOverDropdown()) {
  //       this.dropdownService.closeDropdown();
  //     }
  //   }, 100);
  // }

  // get showDropdown() {
  //   return this.dropdownService.isOpen('currency');
  // }

  // private isMouseOverDropdown(): boolean {
  //   return this.dropdownComponent?.isMouseOver() || false;
  // }

  // private setSelectValue(value: string) {
  //   if (this.currencySelect) {
  //     this.currencySelect.nativeElement.textContent = value;
  //   }
  // }

  private startRotation() {
    const interval = setInterval(() => {
      this.leavingIndex = this.currentIndex;
      this.currentIndex = (this.currentIndex + 1) % this.messages.length;

      setTimeout(() => {
        this.leavingIndex = -1;
      }, 500);
    }, 3000);

    this.destroyRef.onDestroy(() => clearInterval(interval));
  }

  currencies = ['$ Dollar', '₨ LKR', '€ Euro', '¥ Yen'];
  categories = ['All Categories','Women\'s', 'Men\'s', 'Cellphones', 'Computer', 'Electronics', 'Accessories', 'Home & Garden', 'Luggage', 'Shoes', 'Mother & Kids'];

  selectedCurrency = this.currencies[0];
  selectedCategory = this.categories[0];

  onCurrencyChange(currency: string) {
    this.selectedCurrency = currency;
    console.log('Currency changed to:', currency);
  }
}
