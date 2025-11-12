import {Component, signal} from '@angular/core';
import {RouterLink} from '@angular/router';

import {IMAGES} from '../../../constants/image-path';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  NOT_FOUND = signal(IMAGES.NOT_FOUND);
}
