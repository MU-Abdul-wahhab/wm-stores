import { Component } from '@angular/core';
import {IMAGES} from '../../../../shared/constants/image-path';

@Component({
  selector: 'app-section-repair-services',
  imports: [],
  templateUrl: './section-repair-services.component.html',
  styleUrl: './section-repair-services.component.css',
})
export class SectionRepairServicesComponent {
  bannerImg = IMAGES.sections.sectionRepairServices.bannerImg;
}
