import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JwtService {
  decode(token: string): any | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .padEnd(base64Url.length + (4 - base64Url.length % 4) % 4, '=');
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  }
}
