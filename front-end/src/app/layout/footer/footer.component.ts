import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterLink } from "@angular/router";
import { IMAGES } from '../../shared/constants/image-path';
import {AppConfigService} from '../../core/services/app-config.service';
import {AppConfig} from '../../core/models/app-config.model';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  IMAGES = IMAGES;
  appCredentials = signal<AppConfig | null>(null);
  private appConfigService = inject(AppConfigService);

  ngOnInit() {
    this.appConfigService.config$.subscribe(cfg => {
      this.appCredentials.set(cfg);
    });
  }
}
