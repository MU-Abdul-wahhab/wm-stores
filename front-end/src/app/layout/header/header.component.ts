import {Component, computed, DestroyRef, HostListener, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from "@angular/router";

import {DropdownComponent} from '../../shared/components/dropdown/dropdown.component';
import {CustomSelectComponent} from "../../shared/components/custom-select/custom-select.component";
import {CartPreviewComponent} from "../../features/carts/cart-preview/cart-preview.component";
import {HamburgerComponent} from '../../shared/components/hamburger/hamburger.component';
import {IMAGES} from '../../shared/constants/image-path';
import {NAV_LINKS, NavLink} from '../../shared/constants/nav-links';
import {NgClass} from '@angular/common';
import {AuthService} from '../../core/services/auth.service';
import {AppConfigService} from '../../core/services/app-config.service';
import {AppConfig} from '../../core/models/app-config.model';
import {Category} from '../../core/models/category.model';
import {CategoryService} from '../../core/services/category.service';

@Component({
  selector: 'app-header',
  imports: [DropdownComponent, RouterLink, CustomSelectComponent, CartPreviewComponent, HamburgerComponent, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private appConfigService = inject(AppConfigService);
  private categoryService = inject(CategoryService);

  isAuthenticated = signal(this.authService.isAuthenticated());
  APP_LOGO = IMAGES.APP_LOGO;
  NAV_LINKS = signal(NAV_LINKS);

  screenWidth = signal<number>(window.innerWidth);
  isSticky = signal(false);

  appCredentials = signal<AppConfig | null>(null);

  private userName = computed(
    () => {
      const user = this.authService.user$.value;
      return user ? `${user.firstName} ${user.lastName}` : '';
    });

  currentIndex = 0;
  leavingIndex = -1;
  messages: string[] = [
    'Get great devices up to 50% off View details',
    'Supper Value Deals - Save more with coupons',
    'Trendy 25silver jewelry, save up 35% off today Shop now',
  ];

  currencies = signal<string[]>([]);
  categories = signal<Category[]>([
    {
      id: 'c0',
      title: 'All Categories',
      productsCount: 0,
      imgPath: ''
    }
  ]);

  selectedCurrency = signal('');
  selectedCategory = signal(this.categories()[0]);
  categoryOptions = computed(() => this.categories().map(c => c.title));
  selectedCategoryTitle = computed(() => this.selectedCategory().title);

  getSubNavLabels(subLinks?: NavLink[]): string[] {
    return subLinks ? subLinks.map(sub => sub.label) : [];
  }

  ngOnInit() {
    this.startRotation();
    if (this.isAuthenticated()) {
      this.messages.unshift(`Hi ${this.userName()}, Welcome to Evara!`);
    }

    const subs = this.appConfigService.config$.subscribe(cfg => {
      this.appCredentials.set(cfg);
      if (cfg && cfg.appCurrencies) {
        this.currencies.set(cfg.appCurrencies);
        this.selectedCurrency.set(cfg.appCurrencies[0]);
      }
    });

    this.categories.update(oldCategories => [...oldCategories, ...this.categoryService.categories()])

    this.destroyRef.onDestroy(() => subs.unsubscribe());
  }

  onCurrencyChange(currency: string) {
    this.selectedCurrency.set(currency);
  }

  onCategoryChange(categoryTitle: string) {
    const selectedCat = this.categoryService.getCategoryByTitle(categoryTitle);
    if (selectedCat) {
      this.selectedCategory.set(selectedCat);
    } else {
      this.selectedCategory.set(this.categories()[0]);
    }
  }

  onLogout() {
    this.authService.logout();
  }

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.scrollY;
    this.isSticky.set(offset > 125);
  }

  private startRotation() {
    const interval = setInterval(() => {
      this.leavingIndex = this.currentIndex;
      this.currentIndex = (this.currentIndex + 1) % this.messages.length;

      setTimeout(() => {
        this.leavingIndex = -1;
      }, 500);
    }, 3000);

    this.destroyRef.onDestroy(() => clearInterval(interval));
  }
}
