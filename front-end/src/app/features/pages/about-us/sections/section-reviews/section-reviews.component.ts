import {Component, signal} from '@angular/core';
import {IMAGES} from '../../../../../shared/constants/image-path';
import {ReviewCardComponent} from './review-card/review-card.component';

@Component({
  selector: 'app-section-reviews',
  imports: [
    ReviewCardComponent
  ],
  templateUrl: './section-reviews.component.html',
  styleUrl: './section-reviews.component.css'
})
export class SectionReviewsComponent {
  CLIENT_IMAGES = signal(IMAGES.pages.aboutUs.sections.sectionReviews.clients);

  reviews = signal<{
    id: string,
    avatar: string,
    name: string,
    title: string,
    description: string,
  }[]>([
    {
      id: 'c1',
      avatar: this.CLIENT_IMAGES().client1Avatar,
      name: 'J. Bezos',
      title: 'Adobe Jsc',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta' +
        ' reprehenderit accusamus voluptatibus voluptas.',
    },
    {
      id: 'c2',
      avatar: this.CLIENT_IMAGES().client2Avatar,
      name: 'B.Gates',
      title: 'Adobe Jsc',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta' +
        ' reprehenderit accusamus voluptatibus voluptas.',
    },
    {
      id: 'c3',
      avatar: this.CLIENT_IMAGES().client3Avatar,
      name: 'B. Meyers',
      title: 'Adobe Jsc',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta' +
        ' reprehenderit accusamus voluptatibus voluptas.',
    },
    {
      id: 'c4',
      avatar: this.CLIENT_IMAGES().client4Avatar,
      name: 'J. Bezos',
      title: 'Adobe Jsc',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta' +
        ' reprehenderit accusamus voluptatibus voluptas.',
    },
    {
      id: 'c5',
      avatar: this.CLIENT_IMAGES().client5Avatar,
      name: 'B.Gates',
      title: 'Adobe Jsc',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta' +
        ' reprehenderit accusamus voluptatibus voluptas.',
    },
    {
      id: 'c6',
      avatar: this.CLIENT_IMAGES().client6Avatar,
      name: 'B. Meyers',
      title: 'Adobe Jsc',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta' +
        ' reprehenderit accusamus voluptatibus voluptas.',
    },
  ]);
}
