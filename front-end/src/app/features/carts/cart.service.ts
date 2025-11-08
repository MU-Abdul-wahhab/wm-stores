import {Injectable, signal} from '@angular/core';
import {Cart} from './cart.model';

@Injectable({providedIn: 'root'})
export class CartService {
  private _cartItems = signal<Cart[]>([
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

  public cartItems = this._cartItems.asReadonly();

  calculateTotal(userId: string) {
    let total = 0;
    this.cartItems().forEach(item => {
      total += (item.price * item.qty);
    });
    return total;
  }

  removeCartItem(userId: string, itemId: string) {
    this._cartItems.update((cart => cart.filter((item) => item.id !== itemId)))
  }
}
