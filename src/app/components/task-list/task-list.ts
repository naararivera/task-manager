/*import { Component, Input } from '@angular/core';
import { ITask } from '../../models/task.model';
import { DatePipe, NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DatePipe,
    CommonModule,
    NgClass],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
protected title = "Task list";

//Con @Input Recibirá las tareas en la lista de tareas

  @Input() tasksList: ITask[] = [];

  public tasksCompleted: ITask[] = [];
  public toggleTask: boolean = false;

  
  onTaskCreated(task: ITask) {
    this.tasksCompleted.push(task);
  }

  completeTask(index: number){
    console.log(index);
    const task = this.tasksList[index];
    task.completed = true;
    //Falta el toggle
    //this.tasksList[index].completed = !this.tasksList[index].completed;
  }

    deleteTask(index: number){
    console.log("Borrado: " + index);
    const task = this.tasksList[index];
    this.tasksList.splice(index,1);
  }*/

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { ITask } from '../../models/task.model';
import { CommonModule, NgClass, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, NgClass, DatePipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {
  protected title = "Task list";
  public tasksList: ITask[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasksList = tasks;
    });
  }

  completeTask(index: number){
    const task = this.tasksList[index];
    this.taskService.toggleTaskStatus(task.id!);
  }

  deleteTask(index: number){
    const task = this.tasksList[index];
    this.taskService.deleteTask(task.id!);
  }
}


