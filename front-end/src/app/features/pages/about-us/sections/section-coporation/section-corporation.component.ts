import {Component, signal} from '@angular/core';
import {IMAGES} from '../../../../../shared/constants/image-path';

@Component({
  selector: 'app-section-corporation',
  imports: [],
  templateUrl: './section-corporation.component.html',
  styleUrl: './section-corporation.component.css'
})
export class SectionCorporationComponent {
  BRANCH_IMAGES = signal(IMAGES.pages.aboutUs.sections.sectionCorporation);

  branches = signal<{
    id: string,
    imgPath: string,
    location: string,
    address: string
  }[]>([
    {
      id: 'b1',
      imgPath: this.BRANCH_IMAGES().branch1Avatar,
      location: 'New York, USA',
      address: '27 Division St, New York NY 10002, USA',
    },
    {
      id: 'b2',
      imgPath: this.BRANCH_IMAGES().branch2Avatar,
      location: 'Paris, France',
      address: '22 Rue des Carmes 75005 Paris',
    },
    {
      id: 'b3',
      imgPath: this.BRANCH_IMAGES().branch3Avatar,
      location: 'Jakarta, Indonesia',
      address: '2476 Raya Yogyakarta, 89090 Indonesia',
    },
  ]);
}
