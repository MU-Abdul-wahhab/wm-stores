import { Component } from '@angular/core';
import {SectionCarouselComponent} from './sections/section-carousel/section-carousel.component';
import {SectionAppFeatureComponent} from './sections/section-app-feature/section-app-feature.component';

@Component({
  selector: 'app-home',
  imports: [
    SectionCarouselComponent,
    SectionAppFeatureComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
