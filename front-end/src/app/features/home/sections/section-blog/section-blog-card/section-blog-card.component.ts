import {Component, input} from '@angular/core';

@Component({
  selector: 'app-section-blog-card',
  imports: [],
  templateUrl: './section-blog-card.component.html',
  styleUrl: './section-blog-card.component.css'
})
export class SectionBlogCardComponent {
  blog = input.required<{
    imgPath: string,
    category: string,
    description: string,
    date: string,
    views: string
  }>();
}
