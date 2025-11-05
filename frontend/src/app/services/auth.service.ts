import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  LoginAuthResponse,
  LoginRequest,
  RegisterAuthResponse,
  RegisterRequest,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  signup(data: RegisterRequest): Observable<RegisterAuthResponse> {
    return this.http.post<RegisterAuthResponse>(`${this.apiUrl}/auth/register`, data);
  }

  login(data: LoginRequest): Observable<LoginAuthResponse> {
    return this.http.post<LoginAuthResponse>(`${this.apiUrl}/auth/login`, data);
  }
}
