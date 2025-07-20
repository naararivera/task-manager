import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { notOnlySpaces } from '../../validators/custom-validators';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task-service';
import { ITask } from '../../models/task.model';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-add.html',
  styleUrl: './task-add.css'
})
export class TaskAdd {
  protected title = 'Add task';
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required, Validators.minLength(3), notOnlySpaces]],
      completed: [false]
    });
  }

  addTask() {
    if (this.taskForm.valid && this.taskForm.value.taskName?.trim()) {
      const task: ITask = {
        name: this.taskForm.value.taskName.trim(),
        date: new Date(),
        completed: false
      };

      this.taskService.addTask(task); 
      console.log('Tarea agregada:', task);

      this.taskForm.reset();
    }
  }

}