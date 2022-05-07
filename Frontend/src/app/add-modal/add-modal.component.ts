import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatFormFieldModule,
  MatFormField,
  MatLabel,
} from '@angular/material/form-field';
import { Employee } from '../Employee';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
})
export class AddModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public employee: Employee
  ) {}

  ngOnInit(): void {}

  dismiss(): void {
    this.dialogRef.close();
  }
}
