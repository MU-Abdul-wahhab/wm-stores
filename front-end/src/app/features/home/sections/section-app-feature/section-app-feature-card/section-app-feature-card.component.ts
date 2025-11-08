import {Component, input} from '@angular/core';
import {NgClass} from '@angular/common';
import {AppFeature} from '../../../../../core/models/home-content.model';

@Component({
  selector: 'app-section-app-feature-card',
  templateUrl: './section-app-feature-card.component.html',
  styleUrl: './section-app-feature-card.component.css',
  host: {
    'class': 'border border-extra-light-green rounded bg-white flex flex-col items-center justify-around' +
      ' lg:justify-between' +
      ' cursor-pointer hover:scale-90 transition-all duration-500 shadow-md' +
      ' py-6 px-4 h-48'
  }
})
export class SectionAppFeatureCardComponent {
  appFeature = input.required<AppFeature>();
}
