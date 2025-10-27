import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { IMAGES } from '../../shared/constants/image-path';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  IMAGES = IMAGES;
}
