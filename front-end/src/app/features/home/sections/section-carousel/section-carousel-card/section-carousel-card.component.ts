import {Component, input} from '@angular/core';

@Component({
  selector: 'app-section-carousel-card',
  imports: [],
  templateUrl: './section-carousel-card.component.html',
  styleUrl: './section-carousel-card.component.css'
})
export class SectionCarouselCardComponent {
  carouselCard = input.required<{
    'title_line_1': string,
    'title_line_2': string,
    'title_line_3': string,
    'coupon_percentage': number,
    'img_path': string
  }>();
}
