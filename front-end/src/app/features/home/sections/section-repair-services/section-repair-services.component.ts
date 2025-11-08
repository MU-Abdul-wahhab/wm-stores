import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {Banner} from '../../../../core/models/home-content.model';
import {HomeContentService} from '../../../../core/services/home-content.service';

@Component({
  selector: 'app-section-repair-services',
  imports: [],
  templateUrl: './section-repair-services.component.html',
  styleUrl: './section-repair-services.component.css',
})
export class SectionRepairServicesComponent implements OnInit {
  private homeContentService = inject(HomeContentService);
  private destroyRef = inject(DestroyRef);

  bannerCard = signal<Banner | null>(null);

  ngOnInit() {
    const subs = this.homeContentService.homeContents$.subscribe({
      next: homeContent => {
        if (homeContent && homeContent.banners) {
          const banner = homeContent.banners.find(banner => banner.id === 'b3');
          if (banner) {
            this.bannerCard.set(banner);
          }
        }
      }
    });

    this.destroyRef.onDestroy(() => subs.unsubscribe());
  }
}
