import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { Component } from '@angular/core';
import { SignupComponent } from './auth/signup/signup';
import { LoginComponent } from './auth/login/login';
import { CategoryListComponent } from './categories/category-list.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductListComponent } from './products/product-list.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="p-5 text-center">
      <h2>Welcome to Dashboard </h2>
      <p>This is your admin overview page.</p>
    </div>
  `,
})

export class DashboardComponent {
  logout() {
    localStorage.removeItem('token');
    location.href = '/login';
  }
}

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, canActivate: [guestGuard] },
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'categories', component: CategoryListComponent },
      { path: 'products', component: ProductListComponent },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];
