import { Component } from '@angular/core';
import {SectionCarouselComponent} from './sections/section-carousel/section-carousel.component';
import {SectionAppFeatureComponent} from './sections/section-app-feature/section-app-feature.component';
import {SectionNewArrivalsComponent} from './sections/section-new-arrivals/section-new-arrivals.component';
import {SectionRepairServicesComponent} from './sections/section-repair-services/section-repair-services.component';

@Component({
  selector: 'app-home',
  imports: [
    SectionCarouselComponent,
    SectionAppFeatureComponent,
    SectionNewArrivalsComponent,
    SectionRepairServicesComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
