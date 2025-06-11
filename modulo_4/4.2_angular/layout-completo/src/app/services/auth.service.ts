import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = localStorage.getItem('token') || null;
  private username = localStorage.getItem('username') || null;
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    this.checkInitialAuthState()
  );

  router = new Router();

  constructor() {}

  private checkInitialAuthState(): boolean {
    return this.token !== null && this.username !== null;
  }

  login(credentials: {
    username: string | null;
    password: string | null;
  }): Observable<boolean> {
    if (
      credentials.username === 'master@lemoncode.net' &&
      credentials.password === '12345678'
    ) {
      localStorage.setItem('token', 'fake-token');
      localStorage.setItem('username', credentials.username);
      this.token = 'fake-token';
      this.username = credentials.username;
      this.isLoggedInSubject.next(true);
      return of(true).pipe(delay(2000));
    }

    return of(false).pipe(delay(2000));
  }

  logout(): void {
    if (this.token && this.username) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.token = null;
      this.username = null;
      this.isLoggedInSubject.next(false);
      this.router.navigate(['/login']);
    }
  }

  isLogged(): boolean {
    return this.token !== null && this.username !== null;
  }

  getIsLoggedObservable(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getUsername(): string {
    return this.username || '';
  }
}
