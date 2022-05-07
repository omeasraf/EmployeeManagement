import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { Employee } from '../Employee';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public employee: Employee
  ) {}

  ngOnInit(): void {}
  dismiss(): void {
    this.dialogRef.close();
  }
}
