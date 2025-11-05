import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Product } from '../models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../components/delete-dialog.component';
import { EditProductDialogComponent } from '../components/edit-product-dialog.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productForm!: FormGroup;
  products: Product[] = [];
  categories: any[] = [];
  loading = false;
  selectedId: string | null = null;
  searchTerm = '';
  sortOrder: 'price_asc' | 'price_desc' | '' = '';
  page = 1;
  totalPages = 1;
  totalRecords = 0;
  limit = 10;
  message = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      image: [''],
      categoryId: ['', Validators.required],
    });

    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.categoryService.getAll(1, 100).subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
  }

  loadProducts() {
    this.loading = true;
    this.productService.getAll(this.page, this.limit, this.searchTerm, this.sortOrder).subscribe({
      next: (res) => {
        this.products = res.data;
        this.totalPages = Math.ceil(res.pagination.totalPages / this.limit);
        this.totalRecords = res.pagination.totalRecords;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  saveProduct() {
    if (this.productForm.invalid) return;
    const payload = this.productForm.value;

    if (this.selectedId) {
      this.productService.update(this.selectedId, payload).subscribe({
        next: (res) => {
          this.message = res.message;
          this.loadProducts();
          this.resetForm();
        },
      });
    } else {
      this.productService.create(payload).subscribe({
        next: (res) => {
          this.message = res.message;
          this.loadProducts();
          this.resetForm();
        },
      });
    }
  }

  editProduct(prod: Product) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '500px',
      data: { ...prod },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.update(prod.id, result).subscribe({
          next: (res) => {
            this.message = res.message;
            this.loadProducts();
          },
          error: () => {
            this.message = 'Failed to update product';
          },
        });
      }
    });
  }

  deleteProduct(id: string) {
    const prod = this.products.find((p) => p.id === id);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: { name: prod?.name },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.productService.delete(id).subscribe({
          next: () => {
            this.message = 'Product deleted successfully';
            this.loadProducts();
          },
        });
      }
    });
  }

  resetForm() {
    this.selectedId = null;
    this.productForm.reset();
  }

  search() {
    this.page = 1;
    this.loadProducts();
  }

  onSortChange() {
    this.page = 1;
    this.loadProducts();
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadProducts();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }
}
