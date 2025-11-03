import {Component, effect, input, OnDestroy, OnInit, signal} from '@angular/core';
import {TooltipComponent} from '../../tooltip/tooltip.component';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [TooltipComponent, DecimalPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  host: {
    class: 'border border-extra-light-green rounded-3xl bg-white flex flex-col items-center justify-around lg:justify-between cursor-pointer transition-all duration-300 group shadow-sm hover:shadow-lg p-3 h-96 sm:h-[376px] relative',
    '(click)': 'toggleMobileActions()',
    '(mouseenter)': 'onHover()',
    '(mouseleave)': 'onHoverOut()'
  }
})
export class ProductCardComponent implements OnInit, OnDestroy {
  product = input.required<{
    id: string;
    defaultImgPath: string;
    hoverImgPath: string;
    category: string;
    title: string;
    ratingPercentage: number;
    discountPercentage?: number;
    price: number;
  }>();

  currentImgPath = signal('');
  discountedPrice = signal(0);

  showCartTooltip = signal(false);
  showQuickTooltip = signal(false);
  showShareTooltip = signal(false);
  showWishListTooltip = signal(false);

  showMobileActions = signal(false);
  isZoomed = signal(false);

  constructor() {
    effect(() => {
      const product = this.product();

      this.currentImgPath.set(product.defaultImgPath);

      if (product.discountPercentage != null) {
        const percentage = product.discountPercentage;
        this.discountedPrice.set(((100 - percentage) / 100) * product.price);
      } else {
        this.discountedPrice.set(product.price);
      }
    });
  }

  ngOnInit() {
    document.addEventListener('click', this.onOutsideClick);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onOutsideClick);
  }

  onOutsideClick = (event: MouseEvent) => {
    const card = (event.target as HTMLElement).closest('app-product-card');
    if (!card) {
      this.showMobileActions.set(false);
      this.isZoomed.set(false);
      this.currentImgPath.set(this.product().defaultImgPath);
    }
  }

  toggleMobileActions(event ?: Event) {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      event?.stopPropagation();
      const currentlyOpen = this.showMobileActions();
      this.showMobileActions.set(!currentlyOpen);
      this.isZoomed.set(!currentlyOpen);
      this.currentImgPath.set(
        !currentlyOpen ? this.product().hoverImgPath : this.product().defaultImgPath
      );
    }
  }

  onHover() {
    this.isZoomed.set(true);
    this.currentImgPath.set(this.product().hoverImgPath);
  }

  onHoverOut() {
    this.isZoomed.set(false);
    this.currentImgPath.set(this.product().defaultImgPath);
  }
}
