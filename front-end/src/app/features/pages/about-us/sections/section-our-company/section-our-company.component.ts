import {Component, signal} from '@angular/core';
import {IMAGES} from '../../../../../shared/constants/image-path';

@Component({
  selector: 'app-section-our-company',
  imports: [],
  templateUrl: './section-our-company.component.html',
  styleUrl: './section-our-company.component.css'
})
export class SectionOurCompanyComponent {
  THUMBNAIL = signal(IMAGES.pages.aboutUs.sections.sectionOurCompany.thumbnail);
}
