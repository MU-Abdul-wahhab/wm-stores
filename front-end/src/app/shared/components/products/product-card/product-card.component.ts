import {Component, signal} from '@angular/core';
import {TooltipComponent} from '../../tooltip/tooltip.component';

@Component({
  selector: 'app-product-card',
  imports: [
    TooltipComponent
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  showCartTooltip = signal(false);
  showQuickTooltip = signal(false);
  showShareTooltip = signal(false);
  showWishListTooltip = signal(false);
}
