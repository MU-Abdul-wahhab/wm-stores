import {Component, inject, signal, ViewChild} from '@angular/core';
import {CarouselComponent, CarouselModule, OwlOptions} from "ngx-owl-carousel-o";

import {
  SectionPopularCategoriesCardComponent
} from './section-popular-categories-card/section-popular-categories-card.component';
import {CategoryService} from '../../../../core/services/category.service';

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

  private categoryService = inject(CategoryService);

  categories = this.categoryService.popularCategories;

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
