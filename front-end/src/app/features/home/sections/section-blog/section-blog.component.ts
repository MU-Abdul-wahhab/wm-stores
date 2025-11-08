import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';

import {SectionBlogCardComponent} from './section-blog-card/section-blog-card.component';
import {Blog} from '../../../../core/models/home-content.model';
import {HomeContentService} from '../../../../core/services/home-content.service';

@Component({
  selector: 'app-section-blog',
  imports: [
    SectionBlogCardComponent
  ],
  templateUrl: './section-blog.component.html',
  styleUrl: './section-blog.component.css'
})
export class SectionBlogComponent implements OnInit {
  private homeContentService = inject(HomeContentService);
  private destroyRef = inject(DestroyRef);

  blogs = signal<Blog[]>([]);

  ngOnInit() {
    const subs = this.homeContentService.homeContents$.subscribe({
      next: homeContent => {
        if (homeContent && homeContent.blogs) {
          this.blogs.set(homeContent.blogs);
        }
      }
    });

    this.destroyRef.onDestroy(() => subs.unsubscribe());
  }
}
