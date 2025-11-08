import {Component, input} from '@angular/core';
import {Blog} from '../../../../../core/models/home-content.model';

@Component({
  selector: 'app-section-blog-card',
  imports: [],
  templateUrl: './section-blog-card.component.html',
  styleUrl: './section-blog-card.component.css'
})
export class SectionBlogCardComponent {
  blog = input.required<Blog>();
}
