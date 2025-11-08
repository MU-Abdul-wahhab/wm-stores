import {Injectable, signal} from '@angular/core';
import {IMAGES} from '../../shared/constants/image-path';
import {Brand} from '../models/brand.model';

@Injectable({providedIn: 'root'})
export class BrandService {
  private IMAGES = signal(IMAGES);

  private _brands = signal<Brand[]>([
    {
      id: 'b1',
      brandName: 'Design Hub',
      imgPath: this.IMAGES().brands.brand1.logo
    },
    {
      id: 'b2',
      brandName: 'Travel',
      imgPath: this.IMAGES().brands.brand2.logo
    },
    {
      id: 'b3',
      brandName: 'Mockup',
      imgPath: this.IMAGES().brands.brand3.logo
    },
    {
      id: 'b4',
      brandName: 'The Back Yard',
      imgPath: this.IMAGES().brands.brand4.logo
    },
    {
      id: 'b5',
      brandName: 'Shutter Speed',
      imgPath: this.IMAGES().brands.brand5.logo
    },
    {
      id: 'b6',
      brandName: 'The Retro Studio',
      imgPath: this.IMAGES().brands.brand6.logo
    },
  ]);

  public brands = this._brands.asReadonly();
}
