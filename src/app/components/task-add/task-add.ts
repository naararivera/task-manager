import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { notOnlySpaces } from '../../validators/custom-validators';
import { CommonModule } from '@angular/common';
import { Task, TaskApiService } from '../../services/task-api';
import { Router, RouterModule } from '@angular/router';
import { ITask } from '../../models/task.model';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [ReactiveFormsModule,
    RouterModule,
    CommonModule],
  templateUrl: './task-add.html',
  styleUrl: './task-add.css'
})
export class TaskAdd {
  protected title = 'Add task';
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private taskApi: TaskApiService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3), notOnlySpaces]],
      completed: [false]
    });
  }

addTask() {
  if (this.taskForm.valid && this.taskForm.value.description?.trim()) {
    const task: ITask = {
      description: this.taskForm.value.description.trim(),
      date: new Date(),
      completed: false
    };

    this.taskApi.addTask(task).subscribe({
      next: () => {
        console.log('Tarea guardada con éxito');
        this.taskForm.reset(); 
        this.router.navigate(['/tasks-list']); 
      },
      error: (err) => {
        console.error('Error al guardar tarea:', err);
      }
    });
  }
}

}