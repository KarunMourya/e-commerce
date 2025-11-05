import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product, ProductResponse, ProductSingleResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/v1/products`;

  constructor(private http: HttpClient) {}

  getAll(page = 1, limit = 10, search = '', sort = ''): Observable<ProductResponse> {
    let params = new HttpParams().set('page', page).set('limit', limit);

    if (search) params = params.set('search', search);
    if (sort) params = params.set('sort', sort);

    return this.http.get<ProductResponse>(this.apiUrl, { params });
  }

  create(payload: Product): Observable<ProductSingleResponse> {
    return this.http.post<ProductSingleResponse>(this.apiUrl, payload);
  }

  update(id: string, payload: Product): Observable<ProductSingleResponse> {
    return this.http.put<ProductSingleResponse>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  exportCSV(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/document/export-products`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });
  }

  bulkUpload(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token');
    return this.http.post<{ success: boolean; message: string; jobId?: string }>(
      `${this.apiUrl}/bulk-upload`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}
