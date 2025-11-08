import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {AppConfig} from '../models/app-config.model';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AppConfigService {

  private _config$ = new BehaviorSubject<AppConfig | null>(null);
  public config$ = this._config$.asObservable();
  private httpClient = inject(HttpClient);

  private storageKey = 'wm_stores_app_config_v1';

  constructor() {
    const cached = localStorage.getItem(this.storageKey);
    if (cached) {
      try {
        this._config$.next(JSON.parse(cached));
      } catch {
      }
    }
  }

  async loadConfig(): Promise<void> {
    try {
      // const url = '/api/v1/site/config'; // backend endpoint
      // const cfg = await firstValueFrom(this.httpClient.get<AppConfig>(url));
      // this._config$.next(cfg);
      // this._config$.next(cfg);
      const cfg = {
        appName: 'Evara',
        phone: '(+94) - 72 257 8559',
        address: '562 Wellington Road, Street 32, San Francisco',
        location: '',
        hotlineNumber: '1900 - 888',
        workingHours: '10:00 - 18:00, Mon - Sat',
        shortDescription: '',
        playStoreUrl: '',
        appStoreUrl: '',
        social: {facebook: '', twitter: '', instagram: '', youtube: ''},
        paymentMethods: [''],
        appCurrencies: ['$ Dollar', '₨ LKR', '€ Euro', '¥ Yen'],
      }
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(cfg));
      } catch {
      }
    } catch (err) {
      console.error('Failed to load app config', err);
    }
  }

  getSnapshot(): AppConfig | null {
    return this._config$.value;
  }
}
