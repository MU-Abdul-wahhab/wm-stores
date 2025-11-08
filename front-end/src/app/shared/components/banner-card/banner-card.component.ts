import {Component, input} from '@angular/core';
import {NgClass} from '@angular/common';
import {Banner} from '../../../core/models/home-content.model';

@Component({
  selector: 'app-banner-card',
  imports: [
    NgClass
  ],
  templateUrl: './banner-card.component.html',
  styleUrl: './banner-card.component.css',
  host: {
    'class': 'rounded-lg overflow-hidden relative group'
  }
})
export class BannerCardComponent {
  bannerCredentials = input.required<Banner>();

  position = input<'left' | 'right' | 'middle'>('left');
}
