import {Injectable, signal} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {HomeContent} from '../models/home-content.model';
import {IMAGES} from '../../shared/constants/image-path';

@Injectable({providedIn: 'root'})
export class HomeContentService {
  private _homeContents$ = new BehaviorSubject<HomeContent | null>(null);
  public homeContents$ = this._homeContents$.asObservable();

  private IMAGES = IMAGES;

  private _homeContents = signal<HomeContent>({
    banners: [
      {
        id: 'b1',
        imgPath: IMAGES.sections.sectionCarousel.SECTION_CAROUSEL_SLIDER_SUB_IMAGE_1,
        miniTitle: 'Accessories',
        description: 'Save 17% on Autumn Hat'
      },
      {
        id: 'b2',
        imgPath: IMAGES.sections.sectionCarousel.SECTION_CAROUSEL_SLIDER_SUB_IMAGE_2,
        miniTitle: 'Smart Offer',
        description: 'Save 20% on Eardrop'
      },
      {
        id: 'b3',
        imgPath: this.IMAGES.sections.sectionRepairServices.bannerImg,
        miniTitle: 'Repair Services',
        description: 'We\'re an Apple <br/> Authorised Service Provider'
      },
      {
        id: 'b4',
        imgPath: this.IMAGES.sections.sectionBanners.banner1.imgPath,
        miniTitle: 'Smart Offer',
        description: 'Save 20% on Woman Bag'
      },
      {
        id: 'b5',
        imgPath: this.IMAGES.sections.sectionBanners.banner2.imgPath,
        miniTitle: 'Sale off',
        description: 'Great Summer Collection'
      },
      {
        id: 'b6',
        imgPath: this.IMAGES.sections.sectionBanners.banner3.imgPath,
        miniTitle: 'New Arrivals',
        description: 'Shop Today’s Deals & Offers'
      }
    ],
    appFeatures: [
      {
        id: 'f1',
        title: 'Free Shipping',
        imgPath: IMAGES.sections.sectionAppFeature.FREE_SHIPPING,
        bgColor: '#FDDDE4'
      },
      {
        id: 'f2',
        title: 'Online Order',
        imgPath: IMAGES.sections.sectionAppFeature.ONLINE_ORDER,
        bgColor: '#d1e8f2'
      },
      {
        id: 'f3',
        title: 'Save Money',
        imgPath: IMAGES.sections.sectionAppFeature.SAVE_MONEY,
        bgColor: '#CDEBBC'
      },
      {
        id: 'f4',
        title: 'Promotions',
        imgPath: IMAGES.sections.sectionAppFeature.PROMOTIONS,
        bgColor: '#CDD4F8'
      },
      {
        id: 'f5',
        title: 'Happy Sell',
        imgPath: IMAGES.sections.sectionAppFeature.HAPPY_SELL,
        bgColor: '#F6DBF6'
      },
      {
        id: 'f6',
        title: '24/7 Support',
        imgPath: IMAGES.sections.sectionAppFeature.DAILY_SUPPORT,
        bgColor: '#FFF2E5'
      },
    ],
    blogs: [
      {
        id: 'b1',
        imgPath: this.IMAGES.sections.sectionBlogs.blog1.imgPath,
        category: 'Fashion',
        description: 'Qualcomm is developing a Nintendo Switch-like console, report says',
        date: '14 April 2022',
        views: '12M'
      },
      {
        id: 'b2',
        imgPath: this.IMAGES.sections.sectionBlogs.blog2.imgPath,
        category: 'Healthy',
        description: 'Not even the coronavirus can derail 5G\'s global momentum',
        date: '14 April 2022',
        views: '12M'
      },
      {
        id: 'b3',
        imgPath: this.IMAGES.sections.sectionBlogs.blog2.imgPath,
        category: 'Healthy',
        description: 'Not even the coronavirus can derail 5G\'s global momentum',
        date: '14 April 2022',
        views: '12M'
      },
      {
        id: 'b4',
        imgPath: this.IMAGES.sections.sectionBlogs.blog1.imgPath,
        category: 'Fashion',
        description: 'Qualcomm is developing a Nintendo Switch-like console, report says',
        date: '14 April 2022',
        views: '12M'
      },
    ],
    carousels: [
      {
        'title_line_1': 'Tech Promotions',
        'title_line_2': 'Tech Trending',
        'title_line_3': 'Great Collection',
        'coupon_percentage': 20,
        'img_path': IMAGES.sections.sectionCarousel.SECTION_CAROUSEL_SLIDER_1
      },
      {
        'title_line_1': 'Trade-In Offer',
        'title_line_2': 'Supper Value Deals',
        'title_line_3': 'On All Products',
        'coupon_percentage': 70,
        'img_path': IMAGES.sections.sectionCarousel.SECTION_CAROUSEL_SLIDER_2
      }
    ]
  })

  constructor(private http: HttpClient) {
  }

  load() {
    // return this.http.get<Banner[]>('/api/v1/banners').pipe(tap(b => this._homeContents$.next(b)));
    this._homeContents$.next(this._homeContents());
  }
}
