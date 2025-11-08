import {Component, inject, input} from '@angular/core';
import {Cart} from '../../cart.model';
import {CartService} from '../../cart.service';

@Component({
  selector: 'app-cart-preview-item',
  imports: [],
  templateUrl: './cart-preview-item.component.html',
  styleUrl: './cart-preview-item.component.css',
})
export class CartPreviewItemComponent {
  cartItem = input.required<Cart>();

  private cartService = inject(CartService);

  onClose() {
    this.cartService.removeCartItem('userId1', this.cartItem().id);
  }
}
