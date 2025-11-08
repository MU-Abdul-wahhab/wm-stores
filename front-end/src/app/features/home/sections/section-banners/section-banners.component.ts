import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {BannerCardComponent} from '../../../../shared/components/banner-card/banner-card.component';
import {IMAGES} from '../../../../shared/constants/image-path';
import {HomeContentService} from '../../../../core/services/home-content.service';
import {Banner} from '../../../../core/models/home-content.model';


@Component({
  selector: 'app-section-banners',
  imports: [
    BannerCardComponent
  ],
  templateUrl: './section-banners.component.html',
  styleUrl: './section-banners.component.css'
})
export class SectionBannersComponent implements OnInit {
  IMAGES = signal(IMAGES);
  private homeContentService = inject(HomeContentService);
  private destroyRef = inject(DestroyRef);

  banners = signal<Banner[]>([]);

  ngOnInit() {
    const subs = this.homeContentService.homeContents$.subscribe({
      next: homeContent => {
        if (homeContent && homeContent.banners) {
          this.banners.set(homeContent.banners);
        }
      }
    });

    this.destroyRef.onDestroy(() => subs.unsubscribe());
  }
}
