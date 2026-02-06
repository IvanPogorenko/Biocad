import { Routes } from '@angular/router';
import {ROUTE_CFG} from './app.paths';

export const routes: Routes = [
  {
    path: ROUTE_CFG.Dashboard,
    loadComponent: () => import('../pages/dashboards/dashboards.component').then(component => component.DashboardsComponent)
  },
  {
    path: ROUTE_CFG.Task,
    loadComponent: () => import('../pages/task-info/task-info.component').then(component => component.TaskInfoComponent)
  },
  {
    path: ROUTE_CFG.Error,
    loadComponent: () => import('../pages/error/error.component').then(component => component.ErrorComponent)
  }
];
