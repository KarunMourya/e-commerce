import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="dialog">
      <h3>Edit Category</h3>

      <form [formGroup]="editForm">
        <input type="text" formControlName="name" />
      </form>

      <div class="dialog-actions">
        <button (click)="onCancel()">Cancel</button>
        <button
          class="save"
          [disabled]="!editForm.dirty || editForm.invalid"
          (click)="onSave()"
        >
          Update
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog {
        text-align: center;
        padding: 20px;
      }
      h3 {
        margin-bottom: 10px;
      }
      input {
        width: 100%;
        padding: 8px;
        border: 1px solid #000;
        border-radius: 4px;
        margin-bottom: 15px;
      }
      .dialog-actions {
        display: flex;
        justify-content: center;
        gap: 10px;
      }
      button {
        padding: 6px 14px;
        border: 1px solid #000;
        background: #fff;
        cursor: pointer;
        border-radius: 4px;
      }
      .save {
        background: #000;
        color: #fff;
      }
      button[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `,
  ],
})
export class EditDialogComponent implements OnInit {
  editForm!: FormGroup<{
    name: FormControl<string>;
  }>;

  constructor(
    private fb: NonNullableFormBuilder,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.data.name ?? '', [Validators.required]],
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
