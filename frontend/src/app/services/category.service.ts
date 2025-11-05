import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category, CategoryResponse, CategorySingleResponse } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/v1/categories`;

  constructor(private http: HttpClient) {}

  getAll(page = 1, limit = 10, sort = '', search = ''): Observable<CategoryResponse> {
    let url = `${this.apiUrl}?page=${page}&limit=${limit}&sort=${sort}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    return this.http.get<CategoryResponse>(url);
  }

  create(category: Partial<Category>): Observable<CategorySingleResponse> {
    return this.http.post<CategorySingleResponse>(this.apiUrl, category);
  }

  update(id: string, category: Partial<Category>): Observable<CategorySingleResponse> {
    return this.http.put<CategorySingleResponse>(`${this.apiUrl}/${id}`, category);
  }

  delete(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`);
  }
}
