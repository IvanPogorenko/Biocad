import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {baseUrlInterceptor} from './interceptors/base-url.interceptor';
import {provideStore} from '@ngrx/store';
import {tasksReducer} from './store/reducers/task.reducer';
import {taskExtendsReducer} from './store/reducers/task-extends.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([baseUrlInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(
      {
        tasks: tasksReducer,
        'task-extends': taskExtendsReducer
      }
      )
  ]
};
