import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'private-menu',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './private-menu.component.html',
  styleUrl: './private-menu.component.scss',
})
export class PrivateMenuComponent {
  @Input() username: string | null = null;
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
