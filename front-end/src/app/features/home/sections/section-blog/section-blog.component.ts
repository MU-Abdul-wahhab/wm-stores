import {Component, signal} from '@angular/core';
import {SectionBlogCardComponent} from './section-blog-card/section-blog-card.component';
import {IMAGES} from '../../../../shared/constants/image-path';

@Component({
  selector: 'app-section-blog',
  imports: [
    SectionBlogCardComponent
  ],
  templateUrl: './section-blog.component.html',
  styleUrl: './section-blog.component.css'
})
export class SectionBlogComponent {
  BLOGS_IMAGES = IMAGES.sections.sectionBlogs;

  blogs = signal<{
    imgPath: string,
    category: string,
    description: string,
    date: string,
    views: string
  }[]>([
    {
      imgPath: this.BLOGS_IMAGES.blog1.imgPath,
      category: 'Fashion',
      description: 'Qualcomm is developing a Nintendo Switch-like console, report says',
      date: '14 April 2022',
      views: '12M'
    },
    {
      imgPath: this.BLOGS_IMAGES.blog2.imgPath,
      category: 'Healthy',
      description: 'Not even the coronavirus can derail 5G\'s global momentum',
      date: '14 April 2022',
      views: '12M'
    },
    {
      imgPath: this.BLOGS_IMAGES.blog2.imgPath,
      category: 'Healthy',
      description: 'Not even the coronavirus can derail 5G\'s global momentum',
      date: '14 April 2022',
      views: '12M'
    },
    {
      imgPath: this.BLOGS_IMAGES.blog1.imgPath,
      category: 'Fashion',
      description: 'Qualcomm is developing a Nintendo Switch-like console, report says',
      date: '14 April 2022',
      views: '12M'
    },
  ]);
}
