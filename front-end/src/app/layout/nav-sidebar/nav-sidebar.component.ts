import {Component, computed, DestroyRef, HostListener, inject, OnInit, output, signal} from '@angular/core';
import {RouterLink} from '@angular/router';

import {DropdownComponent} from "../../shared/components/dropdown/dropdown.component";
import {CustomSelectComponent} from "../../shared/components/custom-select/custom-select.component";
import {IMAGES} from '../../shared/constants/image-path';
import {NAV_LINKS, NavLink} from '../../shared/constants/nav-links';
import {AuthService} from '../../core/services/auth.service';
import {CategoryService} from '../../core/services/category.service';
import {AppConfig} from '../../core/models/app-config.model';
import {AppConfigService} from '../../core/services/app-config.service';

@Component({
  selector: 'app-nav-sidebar',
  imports: [DropdownComponent, CustomSelectComponent, RouterLink],
  templateUrl: './nav-sidebar.component.html',
  styleUrl: './nav-sidebar.component.css',
  host: {
    'class': 'bg-white rounded-tl-sm rounded-bl-sm block lg:hidden z-20 fixed top-0 bottom-0 right-0 min-h-screen shadow shadow-blue-100 max-w-96 sm:w-96',
    '@sidebarAnimation': ''
  }
})
export class NavSidebarComponent implements OnInit{
  APP_LOGO = IMAGES.APP_LOGO;
  NAV_LINKS = signal(NAV_LINKS);
  hamburgerClosed = output<void>();
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private categoryService = inject(CategoryService);
  private appConfigService = inject(AppConfigService);

  appCredentials = signal<AppConfig | null>(null);

  isAuthenticated = signal(this.authService.isAuthenticated());

  categories = this.categoryService.categories;
  categoryOptions = computed(() => this.categories().map(c => c.title));

  ngOnInit(){
    const subs = this.appConfigService.config$.subscribe(cfg => {
      this.appCredentials.set(cfg);
    });

    this.destroyRef.onDestroy(() => subs.unsubscribe());
  }

  getSubNavLabels(subLinks?: NavLink[]): string[] {
    return subLinks ? subLinks.map(sub => sub.label) : [];
  }

  onHamburgerClose() {
    this.hamburgerClosed.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.onHamburgerClose();
  }
}
