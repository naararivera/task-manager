import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskAdd } from './components/task-add/task-add';
import { TaskList } from './components/task-list/task-list';
import { ReactiveFormsModule } from '@angular/forms';
import { ITask } from './models/task.model';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Task Manager';
  tasks: ITask[] = [];

  onTaskCreated(task: ITask) {
    this.tasks.push(task);
  }
}