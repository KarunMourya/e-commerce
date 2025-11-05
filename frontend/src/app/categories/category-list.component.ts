import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../components/delete-dialog.component';
import { EditDialogComponent } from '../components/edit-categories-dialog.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categoryForm!: FormGroup;
  categories: Category[] = [];
  loading = false;
  selectedId: string | null = null;
  searchTerm = '';
  page = 1;
  totalPages = 1;
  totalRecords = 0;
  limit = 10;
  message = '';
  sort: 'name_asc' | 'name_desc' | '' = '';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.categoryService.getAll(this.page, this.limit,this.sort, this.searchTerm).subscribe({
      next: (res) => {
        this.categories = res.data;
        this.totalPages = res.pagination.totalPages;
        this.totalRecords = res.pagination.totalRecords;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  saveCategory() {
    if (this.categoryForm.invalid) return;
    const payload = this.categoryForm.value;

    if (this.selectedId) {
      this.categoryService.update(this.selectedId, payload).subscribe({
        next: (res) => {
          this.message = res.message;
          this.loadCategories();
          this.resetForm();
        },
      });
    } else {
      this.categoryService.create(payload).subscribe({
        next: (res) => {
          this.message = res.message;
          this.loadCategories();
          this.resetForm();
        },
      });
    }
  }

  editCategory(cat: Category) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: cat,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.update(cat.id, result).subscribe({
          next: (res) => {
            this.message = res.message;
            this.loadCategories();
          },
        });
      }
    });
  }

  deleteCategory(id: string) {
    const cat = this.categories.find((c) => c.id === id);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: { name: cat?.name },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.categoryService.delete(id).subscribe({
          next: (res) => {
            this.message = res?.message || 'Category deleted successfully';
            this.loadCategories();
          },
        });
      }
    });
  }

  resetForm() {
    this.selectedId = null;
    this.categoryForm.reset();
  }

  search() {
    this.page = 1;
    this.loadCategories();
  }

  onSortChange() {
    this.page = 1;
    this.loadCategories();
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadCategories();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadCategories();
    }
  }
}
