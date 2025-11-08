import {Component, inject, signal, ViewChild} from '@angular/core';
import {CarouselComponent, CarouselModule, OwlOptions} from "ngx-owl-carousel-o";

import {IMAGES} from '../../../../shared/constants/image-path';
import {
  SecondaryProductCardComponent
} from '../../../../shared/components/products/secondary-product-card/secondary-product-card.component';
import {Product} from '../../../../shared/components/products/product.model';
import {ProductService} from '../../../../core/services/product.service';

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
  private productService = inject(ProductService)

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

  products = this.productService.products;

  onPreviousBtn() {
    this.owlCar.prev();
  }

  onNextBtn() {
    this.owlCar.next()
  }
}
