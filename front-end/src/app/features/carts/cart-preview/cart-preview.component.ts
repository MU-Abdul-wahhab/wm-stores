import {Component, computed, inject, input, output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

import {CartPreviewItemComponent} from "./cart-preview-item/cart-preview-item.component";
import {RouterLink} from '@angular/router';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-preview',
  imports: [CartPreviewItemComponent, RouterLink],
  templateUrl: './cart-preview.component.html',
  styleUrl: './cart-preview.component.css',
  animations: [
    trigger('itemAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(25px) scale(0.95)'}),
        animate('200ms ease-in', style({opacity: 1, transform: 'translateX(0) scale(1)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({opacity: 0, transform: 'translateX(25px) scale(0.95)'}))
      ])
    ])
  ]
})
export class CartPreviewComponent {
  private cartService = inject(CartService);
  cartItems = this.cartService.cartItems;
  closeRequest = output<void>();

  total = computed(() => this.cartService.calculateTotal('userId1'));

  cartItemCount = computed(() => this.cartItems().length);

  isDropdownOpen = input.required<boolean>();

  onBtnClick() {
    this.closeRequest.emit();
  }
}
