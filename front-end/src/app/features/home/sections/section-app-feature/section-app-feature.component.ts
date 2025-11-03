import {Component, signal, ViewChild} from '@angular/core';
import {CarouselComponent, CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';

import {IMAGES} from '../../../../shared/constants/image-path';
import {SectionAppFeatureCardComponent} from './section-app-feature-card/section-app-feature-card.component';

@Component({
  selector: 'app-section-app-feature',
  imports: [
    SectionAppFeatureCardComponent,
    CarouselModule
  ],
  templateUrl: './section-app-feature.component.html',
  styleUrl: './section-app-feature.component.css',
})
export class SectionAppFeatureComponent {
  @ViewChild('owlCar') owlCar!: CarouselComponent;

  private IMAGES = signal(IMAGES);

  // @HostListener('window:resize')

  appFeatures = signal<{
    title: string,
    imgPath: string,
    bgColor: string
  }[]>([
    {
      title: 'Free Shipping',
      imgPath: IMAGES.sections.sectionAppFeature.FREE_SHIPPING,
      bgColor: '#FDDDE4'
    },
    {
      title: 'Online Order',
      imgPath: IMAGES.sections.sectionAppFeature.ONLINE_ORDER,
      bgColor: '#d1e8f2'
    },
    {
      title: 'Save Money',
      imgPath: IMAGES.sections.sectionAppFeature.SAVE_MONEY,
      bgColor: '#CDEBBC'
    },
    {
      title: 'Promotions',
      imgPath: IMAGES.sections.sectionAppFeature.PROMOTIONS,
      bgColor: '#CDD4F8'
    },
    {
      title: 'Happy Sell',
      imgPath: IMAGES.sections.sectionAppFeature.HAPPY_SELL,
      bgColor: '#F6DBF6'
    },
    {
      title: '24/7 Support',
      imgPath: IMAGES.sections.sectionAppFeature.DAILY_SUPPORT,
      bgColor: '#FFF2E5'
    },
  ]);

  owlOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
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

  onPreviousBtn() {
    this.owlCar.prev();
  }

  onNextBtn() {
    this.owlCar.next()
  }
}

