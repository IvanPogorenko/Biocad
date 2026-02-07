import { Routes } from '@angular/router';
import {ROUTE_CFG, TASK_SUB_PATHS} from './app.paths';
import {TaskDescribeComponent} from '../components/smart/task-describe/task-describe.component';
import {TaskAnalyticsComponent} from '../components/smart/task-analytics/task-analytics.component';

export const routes: Routes = [
  {
    path: ROUTE_CFG.Dashboard,
    loadComponent: () => import('../pages/dashboards/dashboards.component').then(component => component.DashboardsComponent)
  },
  {
    path: ROUTE_CFG.Task.Main,
    loadComponent: () => import('../pages/task-info/task-info.component').then(component => component.TaskInfoComponent),
    children:[
      {
        path: TASK_SUB_PATHS.Describe,
        component: TaskDescribeComponent
      },
      {
        path: TASK_SUB_PATHS.Analytics,
        component: TaskAnalyticsComponent
      },
      {
        path: '',
        redirectTo: TASK_SUB_PATHS.Describe,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: ROUTE_CFG.Error,
    loadComponent: () => import('../pages/error/error.component').then(component => component.ErrorComponent)
  }
];
