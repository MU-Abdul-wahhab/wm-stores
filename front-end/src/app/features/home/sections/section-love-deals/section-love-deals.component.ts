import {Component, signal, ViewChild} from '@angular/core';
import {CarouselComponent, CarouselModule, OwlOptions} from "ngx-owl-carousel-o";

import {IMAGES} from '../../../../shared/constants/image-path';
import {
  SecondaryProductCardComponent
} from '../../../../shared/components/products/secondary-product-card/secondary-product-card.component';

@Component({
  selector: 'app-section-love-deals',
  imports: [
    CarouselModule,
        SecondaryProductCardComponent
  ],
  templateUrl: './section-love-deals.component.html',
  styleUrl: './section-love-deals.component.css'
})
export class SectionLoveDealsComponent {
  @ViewChild('owlCar') owlCar!: CarouselComponent;

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

  owlOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    smartSpeed: 1000,
    margin: 40,
    dots: false,
    nav: false,
    responsive: {
      0: {items: 2},
      768: {items: 4},
      992: {items: 6},
      1400: {items: 7}
    }
  };

  onPreviousBtn() {
    this.owlCar.prev();
  }

  onNextBtn() {
    this.owlCar.next()
  }
}
