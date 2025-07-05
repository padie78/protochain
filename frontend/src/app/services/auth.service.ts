import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { User } from '../models/user.model';

interface TokenPayload {
  sub: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    console.log('token', token);

    if (token) {
      try {
        const payload = jwtDecode<TokenPayload>(token);
            console.log('payload', payload);

        this.userSubject.next({
          id: payload.sub,
          username: payload.username,
          role: payload.role,
          token
        });
      } catch (err) {
        console.error('Token inválido', err);
        this.userSubject.next(null);
      }
    }
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { username, password }).pipe(
      tap(response => {
        console.log('response.token', response.token);
        localStorage.setItem('token', response.token);
      }),
      map(response => {
        const payload = jwtDecode<TokenPayload>(response.token);
        console.log('payload', payload);
        const user: User = {
          id: payload.sub,
          username: payload.username,
          role: payload.role,
          token: response.token
        };
        console.log('user', user);
        this.userSubject.next(user);
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): User | null {
    return this.userSubject.value;
  }
}
