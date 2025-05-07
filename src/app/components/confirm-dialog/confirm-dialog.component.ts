import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  imports: [
    MatDialogModule,
    CommonModule,
        ButtonModule
  ]
})
export class ConfirmDialogComponent {
  title = null as unknown as string;
  message = null as unknown as string;
  confirmation = true;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }
}
