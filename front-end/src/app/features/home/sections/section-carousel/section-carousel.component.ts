import {Component, signal} from '@angular/core';
import { CarouselModule } from '@syncfusion/ej2-angular-navigations';

import {SectionCarouselCardComponent} from './section-carousel-card/section-carousel-card.component';

@Component({
  selector: 'app-section-carousel',
  imports: [
    SectionCarouselCardComponent,
    CarouselModule
  ],
  templateUrl: './section-carousel.component.html',
  styleUrl: './section-carousel.component.css'
})
export class SectionCarouselComponent {
  carouselCards = signal<{
    'title_line_1': string,
    'title_line_2': string,
    'title_line_3': string,
    'coupon_percentage': number,
    'img_path': string
  }[]>([{
    'title_line_1': 'Trade-In Offer',
    'title_line_2': 'Supper Value Deals',
    'title_line_3': 'On All Products',
    'coupon_percentage': 70,
    'img_path': 'images/banners/section-carousel/slider-2.png'
  }, {
    'title_line_1': 'Tech Promotions',
    'title_line_2': 'Tech Trending',
    'title_line_3': 'Great Collection',
    'coupon_percentage': 20,
    'img_path': 'images/banners/section-carousel/slider-1.png'
  }])
}
