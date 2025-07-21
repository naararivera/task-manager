import { Component, OnInit } from '@angular/core';

import { Task, TaskApiService } from '../../services/task-api';
import { ITask } from '../../models/task.model';
import { CommonModule, NgClass, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgClass, DatePipe, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  protected title = 'Task list';
  public tasksList: ITask[] = [];

  constructor(private taskApi: TaskApiService) {}

  ngOnInit(): void {
    this.taskApi.getTasks().subscribe((tasks: Task[]) => {
      this.tasksList = tasks;
    });
  }

  public editedTaskIndex: number | null = null;

  editTask(index: number): void {
    this.editedTaskIndex = index;
  }

  saveTask(index: number): void {
    const task = this.tasksList[index];
    this.taskApi.updateTask(task.id!, task).subscribe(() => {
      this.editedTaskIndex = null;
    });
  }

  completeTask(index: number) {
    const task = this.tasksList[index];
    const updatedTask = {
      ...task,
      completed: !task.completed,
    };

    this.taskApi.updateTask(task.id!, updatedTask).subscribe({
      next: () => {
        task.completed = !task.completed;
      },
      error: (err) => {
        console.error('Error updating the task', err);
      },
    });
  }

  deleteTask(index: number) {
    const task = this.tasksList[index];
    this.taskApi.deleteTask(task.id!).subscribe(() => {
      this.tasksList.splice(index, 1);
    });
  }
}
