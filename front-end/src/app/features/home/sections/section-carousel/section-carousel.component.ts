import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {CarouselModule} from '@syncfusion/ej2-angular-navigations';

import {SectionCarouselCardComponent} from './section-carousel-card/section-carousel-card.component';
import {IMAGES} from '../../../../shared/constants/image-path';
import {BannerCardComponent} from '../../../../shared/components/banner-card/banner-card.component';
import {Banner, Carousel} from '../../../../core/models/home-content.model';
import {HomeContentService} from '../../../../core/services/home-content.service';

@Component({
  selector: 'app-section-carousel',
  imports: [
    SectionCarouselCardComponent,
    CarouselModule,
    BannerCardComponent
  ],
  templateUrl: './section-carousel.component.html',
  styleUrl: './section-carousel.component.css',
})
export class SectionCarouselComponent implements OnInit {
  IMAGES = IMAGES
  private homeContentService = inject(HomeContentService);
  private destroyRef = inject(DestroyRef);

  carouselCards = signal<Carousel[]>([]);

  bannerCards = signal<Banner[]>([]);

  ngOnInit() {
    const subs = this.homeContentService.homeContents$.subscribe({
      next: homeContent => {
        if (homeContent && homeContent.banners) {
          this.bannerCards.set(homeContent.banners);
        }
        if (homeContent && homeContent.carousels) {
          this.carouselCards.set(homeContent.carousels);
        }
      }
    });

    this.destroyRef.onDestroy(() => subs.unsubscribe());
  }
}
