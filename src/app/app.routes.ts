import { Routes } from '@angular/router';
import { TaskAdd } from './components/task-add/task-add';
import { TaskList } from './components/task-list/task-list';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
  { path: 'add-task', component: TaskAdd },
  { path: 'tasks-list', component: TaskList },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/add-task' }
];