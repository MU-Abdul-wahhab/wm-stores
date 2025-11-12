import {Component, input} from '@angular/core';

@Component({
  selector: 'app-review-card',
  imports: [],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {
  review = input.required<{
    id: string,
    avatar: string,
    name: string,
    title: string,
    description: string,
  }>();
}
