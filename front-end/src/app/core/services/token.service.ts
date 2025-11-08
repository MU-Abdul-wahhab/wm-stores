import { Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class TokenService {
    getTokenExpiration(token: string): Date {
        try {
            const decoded: any = jwtDecode(token);
            if (!decoded.exp) {
                return new Date(new Date().getTime() + 3600 * 1000);
            }
            return new Date(decoded.exp * 1000);
        } catch (error) {
            console.error('Invalid token', error);
            return new Date(new Date().getTime() + 3600 * 1000);
        }
    }

    isValidJwt(token: string): boolean {
        return token.split('.').length === 3;
    }
}
