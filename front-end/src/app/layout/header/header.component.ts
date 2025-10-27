import { Component, DestroyRef, OnInit, inject, HostListener, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { CustomSelectComponent } from "../../shared/components/custom-select/custom-select.component";
import { PreviewComponent } from "../../features/cart/preview/preview.component";
import { HamburgerComponent } from '../../shared/components/hamburger/hamburger.component';

@Component({
  selector: 'app-header',
  imports: [DropdownComponent, RouterLink, CustomSelectComponent, PreviewComponent, HamburgerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  // host: {
  //   'class': 'sticky top-0 z-50'
  // }
})
export class HeaderComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  screenWidth = signal<number>(window.innerWidth);
  isSticky = signal(false);

  currentIndex = 0;
  leavingIndex = -1;
  messages: string[] = [
    'Get great devices up to 50% off View details',
    'Supper Value Deals - Save more with coupons',
    'Trendy 25silver jewelry, save up 35% off today Shop now',
  ];

  currencies = ['$ Dollar', '₨ LKR', '€ Euro', '¥ Yen'];
  categories = ['All Categories', 'Women\'s', 'Men\'s', 'Cellphones', 'Computer', 'Electronics', 'Accessories', 'Home & Garden', 'Luggage', 'Shoes', 'Mother & Kids'];

  selectedCurrency = this.currencies[0];
  selectedCategory = this.categories[0];

  ngOnInit() {
    this.startRotation();
  }

  onCurrencyChange(currency: string) {
    this.selectedCurrency = currency;
    console.log('Currency changed to:', currency);
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    console.log('Category changed to:', category);
  }

  onScreenScroll() {
    console.log("scrolling");
  }

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.scrollY;
    this.isSticky.set(offset > 125);
  }

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
}
