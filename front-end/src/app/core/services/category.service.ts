import {Injectable, signal} from '@angular/core';
import {Category} from '../models/category.model';
import {IMAGES} from '../../shared/constants/image-path';

@Injectable({providedIn: 'root'})
export class CategoryService {
  private IMAGES = signal(IMAGES);

  private _categories = signal<Category[]>([
    {
      id: 'c1',
      title: 'Women\'s',
      imgPath: '',
      productsCount: 0,
    },
    {
      id: 'c2',
      title: 'Men\'s',
      imgPath: '',
      productsCount: 0,
    },
    {
      id: 'c3',
      title: 'Cellphones',
      imgPath: '',
      productsCount: 0,
    },
    {
      id: 'c4',
      title: 'Computer',
      imgPath: '',
      productsCount: 0,
    },
    {
      id: 'c5',
      title: 'Electronics',
      imgPath: '',
      productsCount: 0,
    },
    {
      id: 'c6',
      title: 'Accessories',
      imgPath: '',
      productsCount: 0,
    },
    {
      id: 'c7',
      title: 'Home & Garden',
      imgPath: '',
      productsCount: 0,
    },
    {
      id: 'c8',
      title: 'Luggage',
      imgPath: '',
      productsCount: 0,
    },
    {
      id: 'c9',
      title: 'Shoes',
      imgPath: '',
      productsCount: 0,
    },
    {
      id: 'c10',
      title: 'Mother & Kids',
      imgPath: '',
      productsCount: 0,
    },
  ]);

  public categories = this._categories.asReadonly();

  private _popularCategories = signal<Category[]>([
    {
      id: 'c1',
      title: 'Shoes',
      imgPath: this.IMAGES().sections.sectionPopularBrands.SHOES,
      productsCount: 1000,
    },
    {
      id: 'c2',
      title: 'Pillowcase',
      imgPath: this.IMAGES().sections.sectionPopularBrands.PILLOWCASE,
      productsCount: 1000,
    },
    {
      id: 'c3',
      title: 'Jumpsuits',
      imgPath: this.IMAGES().sections.sectionPopularBrands.JUMP,
      productsCount: 1000,
    },
    {
      id: 'c4',
      title: 'Hats',
      imgPath: this.IMAGES().sections.sectionPopularBrands.HATS,
      productsCount: 1000,
    },
    {
      id: 'c5',
      title: 'T-Shirt',
      imgPath: this.IMAGES().products.product1.defaultImgPath,
      productsCount: 1000,
    },
    {
      id: 'c6',
      title: 'Bags',
      imgPath: this.IMAGES().sections.sectionPopularBrands.BAGS,
      productsCount: 1000,
    },
    {
      id: 'c7',
      title: 'Sandan',
      imgPath: this.IMAGES().products.product7.hoverImgPath,
      productsCount: 1000,
    },
    {
      id: 'c8',
      title: 'Scarf Cap',
      imgPath: this.IMAGES().sections.sectionPopularBrands.SCARF,
      productsCount: 1000,
    },
  ]);

  public popularCategories = this._popularCategories.asReadonly();

  getCategoryByTitle(catTitle: string) {
    return this._categories().find(category => category.title === catTitle);
  }
}
