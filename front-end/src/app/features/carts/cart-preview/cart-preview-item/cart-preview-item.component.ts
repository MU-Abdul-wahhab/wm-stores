import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-cart-preview-item',
  imports: [],
  templateUrl: './cart-preview-item.component.html',
  styleUrl: './cart-preview-item.component.css',
})
export class CartPreviewItemComponent {
  cartItem = input.required<{
    id: string,
    name: string,
    qty: number,
    price: number,
    avatar: string
  }>();

  cartRemove = output<string>();

  onClose() {
    this.cartRemove.emit(this.cartItem().id);
  }
}
