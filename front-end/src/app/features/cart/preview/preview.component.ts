import { Component, computed, signal } from '@angular/core';
import { PreviewItemComponent } from "./preview-item/preview-item.component";

@Component({
  selector: 'app-preview',
  imports: [PreviewItemComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
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
    }
  ]);

  total = computed(() => {
    let t = 0;
    this.cartItems().forEach(item => {
      t += item.price;
    });
    return t;
  });

  onClose(itemId: string) {
    this.cartItems.set(this.cartItems().filter((item) => item.id !== itemId));
  }
}
