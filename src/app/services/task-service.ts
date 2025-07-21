import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject: BehaviorSubject<ITask[]>;
  public tasks$;

  private currentId = 0;

  constructor() {
    const storedTasks = localStorage.getItem('tasks');
    const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
    this.tasksSubject = new BehaviorSubject<ITask[]>(parsedTasks);
    this.tasks$ = this.tasksSubject.asObservable();

    // Calculamos el último id usado para evitar colisiones
    if (parsedTasks.length > 0) {
      const ids = parsedTasks.map((t: ITask) => t.id ?? 0);
      this.currentId = Math.max(...ids) + 1;
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasksSubject.value));
  }

  addTask(task: ITask): void {
    task.id = this.currentId++;
    const currentTasks = this.tasksSubject.value;
    const updated = [...currentTasks, task];
    this.tasksSubject.next(updated);
    this.saveToLocalStorage();
  }

  deleteTask(id: number): void {
    const updatedTasks = this.tasksSubject.value.filter(
      (task) => task.id !== id
    );
    this.tasksSubject.next(updatedTasks);
    this.saveToLocalStorage();
  }

  toggleTaskStatus(id: number): void {
    const updatedTasks = this.tasksSubject.value.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    this.tasksSubject.next(updatedTasks);
    this.saveToLocalStorage();
  }
}
