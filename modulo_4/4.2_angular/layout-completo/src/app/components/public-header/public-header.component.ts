import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { PublicMenuComponent } from '../public-menu/public-menu.component';
import { PrivateMenuComponent } from '../private-menu/private-menu.component';

@Component({
  selector: 'app-public-header',
  imports: [CommonModule, PublicMenuComponent, PrivateMenuComponent],
  templateUrl: './public-header.component.html',
  styleUrl: './public-header.component.scss',
})
export class PublicHeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  username: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService
      .getIsLoggedObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        this.username = isLoggedIn ? this.authService.getUsername() : null;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
