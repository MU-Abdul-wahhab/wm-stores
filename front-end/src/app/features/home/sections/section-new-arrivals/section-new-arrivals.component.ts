import {Component, inject, signal} from '@angular/core';

import {ProductCardComponent} from '../../../../shared/components/products/product-card/product-card.component';
import {NgClass} from '@angular/common';
import {IMAGES} from '../../../../shared/constants/image-path';
import {Product} from '../../../../shared/components/products/product.model';
import {ProductService} from '../../../../core/services/product.service';

@Component({
  selector: 'app-section-new-arrivals',
  imports: [
    ProductCardComponent,
    NgClass
  ],
  templateUrl: './section-new-arrivals.component.html',
  styleUrl: './section-new-arrivals.component.css'
})
export class SectionNewArrivalsComponent {
  private productService = inject(ProductService)

  products = this.productService.products;

  currentTab = signal<'Featured' | 'Popular' | 'New added'>('Featured');

  onTabBtnClick(activeTab: string) {
    if (activeTab.toLowerCase() === 'featured') {
      this.currentTab.set('Featured');
    } else if (activeTab.toLowerCase() === 'popular') {
      this.currentTab.set('Popular');
    } else if (activeTab.toLowerCase() === 'new added') {
      this.currentTab.set('New added');
    } else {
      this.currentTab.set('Featured');
    }
  }
}
