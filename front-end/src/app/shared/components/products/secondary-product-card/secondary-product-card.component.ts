import {Component, effect, input, OnDestroy, OnInit, signal} from '@angular/core';
import {TooltipComponent} from '../../tooltip/tooltip.component';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-secondary-product-card',
  imports: [TooltipComponent, DecimalPipe],
  templateUrl: './secondary-product-card.component.html',
  styleUrl: './secondary-product-card.component.css',
  host: {
    'class': 'flex flex-col items-center justify-around lg:justify-between cursor-pointer transition-all' +
      ' duration-300 group h-64 relative hover:-translate-y-1',
    '(click)': 'toggleMobileActions()',
    '(mouseenter)': 'onHover()',
    '(mouseleave)': 'onHoverOut()'
  }
})
export class SecondaryProductCardComponent implements OnInit, OnDestroy {
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
    const card = (event.target as HTMLElement).closest('app-secondary-product-card');
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
