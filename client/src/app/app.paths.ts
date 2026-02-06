export const APP_PATHS = {
  Dashboard: '',
  Task: 'task',
  Error: '**'
} as const;

export const ROUTE_CFG = {
  Dashboard: APP_PATHS.Dashboard,
  Task: `${APP_PATHS.Task}/:id`,
  Error: APP_PATHS.Error
} as const;
