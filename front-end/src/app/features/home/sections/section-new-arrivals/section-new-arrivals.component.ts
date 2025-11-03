import {Component, signal} from '@angular/core';

import {ProductCardComponent} from '../../../../shared/components/products/product-card/product-card.component';
import {NgClass} from '@angular/common';
import {IMAGES} from '../../../../shared/constants/image-path';

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
  private IMAGES = signal(IMAGES);

  products = signal<{
    id: string,
    defaultImgPath: string,
    hoverImgPath: string,
    category: string,
    title: string,
    ratingPercentage: number,
    discountPercentage?: number,
    price: number
  }[]>([
    {
      id: Math.random().toString(),
      defaultImgPath: IMAGES.products.product1.defaultImgPath,
      hoverImgPath: IMAGES.products.product1.hoverImgPath,
      category: 'Clothing',
      title: 'Colorful Pattern Shirts',
      ratingPercentage: 90,
      discountPercentage: 2.827502034174131,
      price: 245.8
    },
    {
      id: Math.random().toString(),
      defaultImgPath: IMAGES.products.product2.defaultImgPath,
      hoverImgPath: IMAGES.products.product2.hoverImgPath,
      category: 'Clothing',
      title: 'Plain Color Pocket Shirts',
      ratingPercentage: 50,
      discountPercentage: 45.719311962470684,
      price: 255.8
    },
    {
      id: Math.random().toString(),
      defaultImgPath: IMAGES.products.product3.defaultImgPath,
      hoverImgPath: IMAGES.products.product3.hoverImgPath,
      category: 'Shirts',
      title: 'Vintage Floral Oil Shirts',
      ratingPercentage: 95,
      discountPercentage: 23.990578734858687,
      price: 445.8
    },
    {
      id: Math.random().toString(),
      defaultImgPath: IMAGES.products.product4.defaultImgPath,
      hoverImgPath: IMAGES.products.product4.hoverImgPath,
      category: 'Clothing',
      title: 'Colorful Hawaiian Shirts',
      ratingPercentage: 70,
      discountPercentage: 47.47667514843088,
      price: 235.8
    },
    {
      id: Math.random().toString(),
      defaultImgPath: IMAGES.products.product5.defaultImgPath,
      hoverImgPath: IMAGES.products.product5.hoverImgPath,
      category: 'Shirts',
      title: 'Flowers Sleeve Lapel Shirt',
      ratingPercentage: 70,
      discountPercentage: 37.008733624454145,
      price: 45.8
    },
    {
      id: Math.random().toString(),
      defaultImgPath: IMAGES.products.product6.defaultImgPath,
      hoverImgPath: IMAGES.products.product6.hoverImgPath,
      category: 'Shirts',
      title: 'Ethnic Floral Casual Shirts',
      ratingPercentage: 70,
      discountPercentage: 2.827502034174131,
      price: 245.8
    },
    {
      id: Math.random().toString(),
      defaultImgPath: IMAGES.products.product7.defaultImgPath,
      hoverImgPath: IMAGES.products.product7.hoverImgPath,
      category: 'Shoes',
      title: 'Stitching Hole Sandals',
      ratingPercentage: 98,
      price: 1275.85
    },
    {
      id: Math.random().toString(),
      defaultImgPath: IMAGES.products.product8.defaultImgPath,
      hoverImgPath: IMAGES.products.product8.hoverImgPath,
      category: 'Shirts',
      title: 'Mens Porcelain Shirt',
      ratingPercentage: 70,
      discountPercentage: 2.827502034174131,
      price: 245.8
    },
  ])

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
