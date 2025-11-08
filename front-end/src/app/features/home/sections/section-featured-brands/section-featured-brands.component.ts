import {Component, inject, ViewChild} from '@angular/core';
import {CarouselComponent, CarouselModule, OwlOptions} from "ngx-owl-carousel-o";

import {BrandService} from '../../../../core/services/brand.service';

@Component({
  selector: 'app-section-featured-brands',
  imports: [
    CarouselModule,
  ],
  templateUrl: './section-featured-brands.component.html',
  styleUrl: './section-featured-brands.component.css'
})
export class SectionFeaturedBrandsComponent {
  @ViewChild('owlCar') owlCar!: CarouselComponent;

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

  private brandService = inject(BrandService);

  brands = this.brandService.brands

  onPreviousBtn() {
    this.owlCar.prev();
  }

  onNextBtn() {
    this.owlCar.next()
  }
}
