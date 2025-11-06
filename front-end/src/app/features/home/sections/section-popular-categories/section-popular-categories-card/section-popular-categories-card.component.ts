import {Component, input} from '@angular/core';

@Component({
  selector: 'app-section-popular-categories-card',
  imports: [],
  templateUrl: './section-popular-categories-card.component.html',
  styleUrl: './section-popular-categories-card.component.css',
  host: {
    'class': 'border border-extra-light-green rounded-3xl space-y-4 bg-white flex flex-col items-center' +
      ' cursor-pointer shadow-sm p-3 h-[215px] group'
  }
})
export class SectionPopularCategoriesCardComponent {
  category = input.required<{
    title: string,
    imgPath: string,
    productsCount: number
  }>();
}
