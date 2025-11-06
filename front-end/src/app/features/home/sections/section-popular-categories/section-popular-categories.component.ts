import {Component, signal, ViewChild} from '@angular/core';
import {CarouselComponent, CarouselModule, OwlOptions} from "ngx-owl-carousel-o";
import {IMAGES} from '../../../../shared/constants/image-path';
import {SectionPopularCategoriesCardComponent} from './section-popular-categories-card/section-popular-categories-card.component';

@Component({
  selector: 'app-section-popular-categories',
  imports: [
    CarouselModule,
    SectionPopularCategoriesCardComponent
  ],
  templateUrl: './section-popular-categories.component.html',
  styleUrl: './section-popular-categories.component.css'
})
export class SectionPopularCategoriesComponent {
  @ViewChild('owlCar') owlCar!: CarouselComponent;

  private IMAGES = signal(IMAGES);

  categories = signal<{
    title: string,
    imgPath: string,
    productsCount: number
  }[]>([
    {
      title: 'Shoes',
      imgPath: IMAGES.sections.sectionPopularBrands.SHOES,
      productsCount: 1000,
    },
    {
      title: 'Pillowcase',
      imgPath: IMAGES.sections.sectionPopularBrands.PILLOWCASE,
      productsCount: 1000,
    },
    {
      title: 'Jumpsuits',
      imgPath: IMAGES.sections.sectionPopularBrands.JUMP,
      productsCount: 1000,
    },
    {
      title: 'Hats',
      imgPath: IMAGES.sections.sectionPopularBrands.HATS,
      productsCount: 1000,
    },
    {
      title: 'T-Shirt',
      imgPath: IMAGES.products.product1.defaultImgPath,
      productsCount: 1000,
    },
    {
      title: 'Bags',
      imgPath: IMAGES.sections.sectionPopularBrands.BAGS,
      productsCount: 1000,
    },
    {
      title: 'Sandan',
      imgPath: IMAGES.products.product7.hoverImgPath,
      productsCount: 1000,
    },
    {
      title: 'Scarf Cap',
      imgPath: IMAGES.sections.sectionPopularBrands.SCARF,
      productsCount: 1000,
    },
  ]);

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
