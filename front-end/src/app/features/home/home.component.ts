import { Component } from '@angular/core';
import {SectionCarouselComponent} from './sections/section-carousel/section-carousel.component';

@Component({
  selector: 'app-home',
  imports: [
    SectionCarouselComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
