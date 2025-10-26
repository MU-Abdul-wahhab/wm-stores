import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private secret = 'wm_store_secret_key';

  generateHash(data: object): string {
    const json = JSON.stringify(data);
    let hash = 0, i, chr;
    for (i = 0; i < json.length; i++) {
      chr = json.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return `${hash}-${btoa(this.secret).substring(0, 10)}`;
  }

  verifyHash(data: object, hash: string): boolean {
    return this.generateHash(data) === hash;
  }
}
