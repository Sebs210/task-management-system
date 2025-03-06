import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task, TaskStatus } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode = false;
  taskStatus = TaskStatus;
  statusOptions: { value: TaskStatus; label: string }[] = []; // Define as a property

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task?: Task }
  ) {
    console.log('TaskFormComponent constructed with data:', this.data);
    this.taskForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required]],
      status: [TaskStatus.TODO],
    });
    // Initialize statusOptions in the constructor
    this.statusOptions = this.getStatusOptions();
  }

  ngOnInit(): void {
    console.log('TaskFormComponent ngOnInit');
    this.isEditMode = !!this.data?.task;
    console.log('isEditMode:', this.isEditMode);
    this.initForm();
  }

  initForm(): void {
    console.log('Patching form with data:', this.data);
    try {
      this.taskForm.patchValue({
        id: this.data?.task?.id || null,
        title: this.data?.task?.title || '',
        description: this.data?.task?.description || '',
        status: this.data?.task?.status || TaskStatus.TODO,
      });
      console.log('Form patched:', this.taskForm.value);
    } catch (error) {
      console.error('Error patching form:', error);
    }
  }

  getStatusOptions(): { value: TaskStatus; label: string }[] {
    console.log('getStatusOptions called in TaskFormComponent');
    return [
      { value: TaskStatus.TODO, label: 'Por Hacer' },
      { value: TaskStatus.IN_PROGRESS, label: 'En Progreso' },
      { value: TaskStatus.COMPLETED, label: 'Completada' },
    ];
  }

  onSubmit(): void {
    console.log('onSubmit called, form valid:', this.taskForm.valid);
    if (this.taskForm.valid) {
      console.log('Submitting form with value:', this.taskForm.value);
      this.dialogRef.close(this.taskForm.value);
    }
  }

  onCancel(): void {
    console.log('onCancel called');
    this.dialogRef.close();
  }
}
