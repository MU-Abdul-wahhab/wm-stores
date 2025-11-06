import { Component } from '@angular/core';
import {SectionCarouselComponent} from './sections/section-carousel/section-carousel.component';
import {SectionAppFeatureComponent} from './sections/section-app-feature/section-app-feature.component';
import {SectionNewArrivalsComponent} from './sections/section-new-arrivals/section-new-arrivals.component';
import {SectionRepairServicesComponent} from './sections/section-repair-services/section-repair-services.component';
import {SectionPopularCategoriesComponent} from './sections/section-popular-categories/section-popular-categories.component';
import {
  SectionLoveDealsComponent
} from './sections/section-love-deals/section-love-deals.component';
import {SectionFeaturedBrandsComponent} from './sections/section-featured-brands/section-featured-brands.component';
import {SectionBlogComponent} from './sections/section-blog/section-blog.component';

@Component({
  selector: 'app-home',
  imports: [
    SectionCarouselComponent,
    SectionAppFeatureComponent,
    SectionNewArrivalsComponent,
    SectionRepairServicesComponent,
    SectionPopularCategoriesComponent,
    SectionLoveDealsComponent,
    SectionFeaturedBrandsComponent,
    SectionBlogComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
