export const routes = [
  {
    path: '/',
    redirect: '/m1/survey',
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/m1',
        component: '../layouts/BasicLayoutM1',
        Routes: ['/utils/PrivateRoute.js'],
        routes: [
          {
            path: '/m1/survey',
            component: './m1/survey',
            Routes: ['/utils/PrivateRoute.js'],
          },
          {
            path: '/m1/details',
            component: './m1/details',
            Routes: ['/utils/PrivateRoute.js'],
          },
          {
            path: '/m1/details/tasks',
            component: './m1/details/tasks',
          },
        ]
      },
      {
        path: '/exception',
        component: '../layouts/ExceptionLayout',
        routes: [
          {
            path: '/exception/403',
            component: './exception/403',
          },
          {
            path: '/exception/404',
            component: './exception/404',
          },
          {
            path: '/exception/500',
            component: './exception/500',
          },
        ],
      },
      {
        path: '/doc',
        component: './doc',
      },
    ]
  },
];
