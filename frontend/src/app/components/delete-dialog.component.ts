import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dialog">
      <h3>Confirm Deletion</h3>
      <p>Are you sure you want to delete <b>{{ data.name }}</b>?</p>

      <div class="dialog-actions">
        <button (click)="onCancel()">Cancel</button>
        <button class="danger" (click)="onConfirm()">Delete</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog { text-align: center; padding: 20px; }
    h3 { margin-bottom: 10px; }
    .dialog-actions {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 15px;
    }
    button {
      padding: 6px 14px;
      border: 1px solid #000;
      background: #fff;
      cursor: pointer;
      border-radius: 4px;
    }
    .danger {
      background: #000;
      color: #fff;
    }
  `],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
}
