import {Component, inject, OnInit} from '@angular/core';
import {SectionCarouselComponent} from './sections/section-carousel/section-carousel.component';
import {SectionAppFeatureComponent} from './sections/section-app-feature/section-app-feature.component';
import {SectionNewArrivalsComponent} from './sections/section-new-arrivals/section-new-arrivals.component';
import {SectionRepairServicesComponent} from './sections/section-repair-services/section-repair-services.component';
import {
  SectionPopularCategoriesComponent
} from './sections/section-popular-categories/section-popular-categories.component';
import {SectionLoveDealsComponent} from './sections/section-love-deals/section-love-deals.component';
import {SectionFeaturedBrandsComponent} from './sections/section-featured-brands/section-featured-brands.component';
import {SectionBlogComponent} from './sections/section-blog/section-blog.component';
import {SectionBannersComponent} from './sections/section-banners/section-banners.component';
import {HomeContentService} from '../../core/services/home-content.service';


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
    SectionBannersComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private homeContentService = inject(HomeContentService);

  ngOnInit() {
    this.homeContentService.load();
  }
}
