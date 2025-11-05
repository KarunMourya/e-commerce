import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../models/product.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="dialog">
      <h3>Edit Product</h3>

      <form [formGroup]="editForm">
        <div class="form-group">
          <label>Name</label>
          <input type="text" formControlName="name" />
        </div>

        <div class="form-group">
          <label>Price</label>
          <input type="number" formControlName="price" />
        </div>

        <div class="form-group">
          <label>Image URL</label>
          <input type="text" formControlName="image" />
        </div>

        <div class="form-group">
          <label>Category</label>
          <select formControlName="categoryId">
            <option value="">Select Category</option>
            <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.name }}</option>
          </select>
        </div>
      </form>

      <div class="dialog-actions">
        <button (click)="onCancel()">Cancel</button>
        <button class="save" [disabled]="!editForm.dirty || editForm.invalid" (click)="onSave()">
          Update
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog {
        text-align: left;
        padding: 20px;
        background: #fff;
        color: #000;
        border-radius: 8px;
      }

      h3 {
        text-align: center;
        margin-bottom: 15px;
      }

      .form-group {
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
      }

      label {
        font-weight: 600;
        margin-bottom: 4px;
      }

      input,
      select {
        padding: 8px;
        border: 1px solid #000;
        border-radius: 4px;
        font-size: 14px;
      }

      .dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 15px;
      }

      button {
        padding: 6px 14px;
        border: 1px solid #000;
        background: #fff;
        cursor: pointer;
        border-radius: 4px;
        font-weight: 600;
      }

      .save {
        background: #000;
        color: #fff;
      }

      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `,
  ],
})
export class EditProductDialogComponent implements OnInit {
  editForm!: FormGroup;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.data.name, [Validators.required, Validators.minLength(2)]],
      price: [this.data.price, [Validators.required, Validators.min(1)]],
      image: [this.data.image || ''],
      categoryId: [this.data.categoryId, Validators.required],
    });

    this.categoryService.getAll(1, 100).subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onSave() {
    if (this.editForm.valid && this.editForm.dirty) {
      this.dialogRef.close(this.editForm.value);
    }
  }
}
