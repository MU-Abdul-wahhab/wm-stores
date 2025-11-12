import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {SectionOurCompanyComponent} from './sections/section-our-company/section-our-company.component';
import {SectionOurTeamComponent} from './sections/section-our-team/section-our-team.component';
import {SectionCorporationComponent} from './sections/section-coporation/section-corporation.component';
import {
  SectionFeaturedBrandsComponent
} from '../../home/sections/section-featured-brands/section-featured-brands.component';
import {SectionReviewsComponent} from './sections/section-reviews/section-reviews.component';

@Component({
  selector: 'app-about-us',
  imports: [
    RouterLink,
    SectionOurCompanyComponent,
    SectionOurTeamComponent,
    SectionCorporationComponent,
    SectionFeaturedBrandsComponent,
    SectionReviewsComponent
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

}
