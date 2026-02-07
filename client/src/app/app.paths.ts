export const APP_PATHS = {
  Dashboard: '',
  Task: 'task',
  Error: '**'
} as const;

export const TASK_SUB_PATHS = {
  Describe: 'describe',
  Analytics: 'analytics'
}

export const ROUTE_CFG = {
  Dashboard: APP_PATHS.Dashboard,
  Task: {
    Main: `${APP_PATHS.Task}/:id`,
    Describe: `${APP_PATHS.Task}/:id/${TASK_SUB_PATHS.Describe}`,
    Analytics: `${APP_PATHS.Task}/:id/${TASK_SUB_PATHS.Analytics}`
  },
  Error: APP_PATHS.Error
} as const;
