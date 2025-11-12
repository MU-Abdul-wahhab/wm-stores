import {Component, signal} from '@angular/core';
import {IMAGES} from '../../../../../shared/constants/image-path';

@Component({
  selector: 'app-section-our-team',
  imports: [],
  templateUrl: './section-our-team.component.html',
  styleUrl: './section-our-team.component.css'
})
export class SectionOurTeamComponent {
  TEAMMATES_AVATARS = signal(IMAGES.pages.aboutUs.sections.sectionOurTeam.teammates)

  teammates = signal<{
    id: string,
    imgPath: string,
    name: string,
    role: string,
    social: {
      facebook: string,
      twitter: string,
      instagram: string,
      youtube: string,
    }
  }[]>([
    {
      id: 't1',
      imgPath: this.TEAMMATES_AVATARS().teammate1Avatar,
      name: 'Patric Adams',
      role: 'CEO & Co-Founder',
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        youtube: '#',
      }
    },
    {
      id: 't2',
      imgPath: this.TEAMMATES_AVATARS().teammate2Avatar,
      name: 'Dilan Specter',
      role: 'Head Engineer',
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        youtube: '#',
      }
    },
    {
      id: 't3',
      imgPath: this.TEAMMATES_AVATARS().teammate3Avatar,
      name: 'Tomas Baker',
      role: 'Senior Planner',
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        youtube: '#',
      }
    },
    {
      id: 't4',
      imgPath: this.TEAMMATES_AVATARS().teammate4Avatar,
      name: 'Norton Mendos',
      role: 'Project Manager',
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        youtube: '#',
      }
    },
  ]);
}
