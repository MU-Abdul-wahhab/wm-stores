import {Component, signal, ViewChild} from '@angular/core';
import {CarouselComponent, CarouselModule, OwlOptions} from "ngx-owl-carousel-o";

import {IMAGES} from '../../../../shared/constants/image-path';

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

  private IMAGES = signal(IMAGES);

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

  brands = signal<{
    brandName: string,
    imgPath: string
  }[]>([
    {
      brandName: 'Design Hub',
      imgPath: this.IMAGES().brands.brand1.logo
    },
    {
      brandName: 'Travel',
      imgPath: this.IMAGES().brands.brand2.logo
    },
    {
      brandName: 'Mockup',
      imgPath: this.IMAGES().brands.brand3.logo
    },
    {
      brandName: 'The Back Yard',
      imgPath: this.IMAGES().brands.brand4.logo
    },
    {
      brandName: 'Shutter Speed',
      imgPath: this.IMAGES().brands.brand5.logo
    },
    {
      brandName: 'The Retro Studio',
      imgPath: this.IMAGES().brands.brand6.logo
    },
  ]);

  onPreviousBtn() {
    this.owlCar.prev();
  }

  onNextBtn() {
    this.owlCar.next()
  }
}
