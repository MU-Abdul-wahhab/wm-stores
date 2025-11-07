import { Component, signal } from '@angular/core';
import { CarouselModule } from '@syncfusion/ej2-angular-navigations';

import { SectionCarouselCardComponent } from './section-carousel-card/section-carousel-card.component';
import { IMAGES } from '../../../../shared/constants/image-path';

@Component({
  selector: 'app-section-carousel',
  imports: [
    SectionCarouselCardComponent,
    CarouselModule
  ],
  templateUrl: './section-carousel.component.html',
  styleUrl: './section-carousel.component.css',
})
export class SectionCarouselComponent {
  IMAGES = IMAGES

  carouselCards = signal<{
    'title_line_1': string,
    'title_line_2': string,
    'title_line_3': string,
    'coupon_percentage': number,
    'img_path': string
  }[]>([{
    'title_line_1': 'Tech Promotions',
    'title_line_2': 'Tech Trending',
    'title_line_3': 'Great Collection',
    'coupon_percentage': 20,
    'img_path': IMAGES.sections.sectionCarousel.SECTION_CAROUSEL_SLIDER_1
  }, {
    'title_line_1': 'Trade-In Offer',
    'title_line_2': 'Supper Value Deals',
    'title_line_3': 'On All Products',
    'coupon_percentage': 70,
    'img_path': IMAGES.sections.sectionCarousel.SECTION_CAROUSEL_SLIDER_2
  }])
}
