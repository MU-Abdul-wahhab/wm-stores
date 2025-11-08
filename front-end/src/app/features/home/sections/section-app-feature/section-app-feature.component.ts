import {Component, DestroyRef, inject, OnInit, signal, ViewChild} from '@angular/core';
import {CarouselComponent, CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';

import {IMAGES} from '../../../../shared/constants/image-path';
import {SectionAppFeatureCardComponent} from './section-app-feature-card/section-app-feature-card.component';
import {AppFeature} from '../../../../core/models/home-content.model';
import {HomeContentService} from '../../../../core/services/home-content.service';


@Component({
  selector: 'app-section-app-feature',
  imports: [
    SectionAppFeatureCardComponent,
    CarouselModule
  ],
  templateUrl: './section-app-feature.component.html',
  styleUrl: './section-app-feature.component.css',
})
export class SectionAppFeatureComponent implements OnInit{
  @ViewChild('owlCar') owlCar!: CarouselComponent;

  private IMAGES = signal(IMAGES);
  private homeContentService = inject(HomeContentService);
  private destroyRef = inject(DestroyRef);

  appFeatures = signal<AppFeature[]>([]);

  owlOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 1000,
    autoplayHoverPause: true,
    margin: 40,
    dots: false,
    nav: false,
    responsive: {
      0: {items: 2},
      768: {items: 4},
      992: {items: 6, autoplay: false, loop: false},
      1400: {items: 7, autoplay: false, loop: false}
    }
  };

  ngOnInit() {
    const subs = this.homeContentService.homeContents$.subscribe({
      next: homeContent => {
        if (homeContent && homeContent.appFeatures) {
          this.appFeatures.set(homeContent.appFeatures);
        }
      }
    });

    this.destroyRef.onDestroy(() => subs.unsubscribe());
  }

  onPreviousBtn() {
    this.owlCar.prev();
  }

  onNextBtn() {
    this.owlCar.next()
  }
}

