import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-preview-item',
  imports: [],
  templateUrl: './preview-item.component.html',
  styleUrl: './preview-item.component.css',
})
export class PreviewItemComponent {
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
