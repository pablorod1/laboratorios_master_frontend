import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  isLoading = false;
  errorMessage: string | undefined = undefined;
  matcher = new ErrorStateMatcher();

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.usernameFormControl.valid && this.passwordFormControl.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials = {
        username: this.usernameFormControl.value || '',
        password: this.passwordFormControl.value || '',
      };

      if (!credentials.username || !credentials.password) {
        this.errorMessage = 'Username and password are required';
        this.isLoading = false;
        return;
      }

      this.authService.login(credentials).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Invalid credentials';
          }
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
