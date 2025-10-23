import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { RouterLink } from "@angular/router";

import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';

@Component({
  selector: 'app-header',
  imports: [DropdownComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

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
