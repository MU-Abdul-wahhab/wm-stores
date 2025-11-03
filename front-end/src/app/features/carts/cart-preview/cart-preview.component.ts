import {Component, computed, input, output, signal} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { CartPreviewItemComponent } from "././cart-preview-item/cart-preview-item.component";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-preview',
  imports: [CartPreviewItemComponent, RouterLink],
  templateUrl: './cart-preview.component.html',
  styleUrl: './cart-preview.component.css',
  animations: [
    trigger('itemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(25px) scale(0.95)' }),
        animate('200ms ease-in', style({ opacity: 1, transform: 'translateX(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(25px) scale(0.95)' }))
      ])
    ])
  ]
})
export class CartPreviewComponent {
  cartItems = signal([
    {
      id: 'c1',
      name: 'Daisy Casual Bag',
      qty: 1,
      price: 800.00,
      avatar: 'https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/shop/thumbnail-3.jpg'
    },
    {
      id: 'c2',
      name: 'Corduroy Shirts',
      qty: 1,
      price: 3200.00,
      avatar: 'https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/shop/thumbnail-2.jpg'
    },
    {
      id: 'c3',
      name: 'Colorful Pattern Shirts',
      qty: 2,
      price: 200.00,
      avatar: 'https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/shop/product-1-2.jpg'
    },
  ]);
  closeRequest = output<void>();

  total = computed(() => {
    let t = 0;
    this.cartItems().forEach(item => {
      t += (item.price * item.qty);
    });
    return t;
  });

  cartItemCount = computed(() => this.cartItems().length);

  isDropdownOpen = input.required<boolean>();

  onCartItemClose(itemId: string) {
    this.cartItems.set(this.cartItems().filter((item) => item.id !== itemId));
  }

  onBtnClick(){
    this.closeRequest.emit();
  }
}
