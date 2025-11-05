import { Component, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  Validators,
  FormGroup,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginAuthResponse, LoginRequest } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  message = '';
  loading = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.loading = true;

    const formValue: LoginRequest = this.loginForm.getRawValue();

    this.authService.login(formValue).subscribe({
      next: (res: LoginAuthResponse) => {
        this.loading = false;
        localStorage.setItem('token', res.data?.token || '');
        this.message = 'Login successful! Redirecting...';
        setTimeout(() => this.router.navigate(['/dashboard']), 1000);
      },
      error: (err) => {
        this.loading = false;
        this.message = err.error?.message || 'Login failed';
      },
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}
