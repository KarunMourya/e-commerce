import { Component, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  Validators,
  FormGroup,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // ✅ import RouterLink
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/user.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // ✅ add RouterLink
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup<{
    name: FormControl<string>;
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
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) return;
    this.loading = true;

    const formValue: RegisterRequest = this.signupForm.getRawValue();

    this.authService.signup(formValue).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'Signup successful! Redirecting...';
        this.signupForm.reset();
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.message = err.error?.message || 'Signup failed';
      },
    });
  }

  get f() {
    return this.signupForm.controls;
  }
}
