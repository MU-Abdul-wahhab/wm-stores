import {Component, input} from '@angular/core';
import {Carousel} from '../../../../../core/models/home-content.model';

@Component({
  selector: 'app-section-carousel-card',
  imports: [],
  templateUrl: './section-carousel-card.component.html',
  styleUrl: './section-carousel-card.component.css'
})
export class SectionCarouselCardComponent {
  carouselCard = input.required<Carousel>();
}
