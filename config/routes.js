export const routes = [
  {
    path: '/',
    redirect: '/smartPlatform/survey',
  },
  {
    path: '/doc',
    component: './doc',
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/smartPlatform',
        component: './smartPlatform',
        // Routes: ['/src/utils/PrivateRoute.js'],
        routes: [
          {
            path: '/smartPlatform/survey',
            component: './smartPlatform/survey',
            // Routes: ['/src/utils/PrivateRoute.js'],
          },
          {
            path: '/smartPlatform/details',
            component: './smartPlatform/details',
            // Routes: ['/src/utils/PrivateRoute.js'],
          },
          {
            path: '/smartPlatform/details/tasks',
            component: './smartPlatform/details/tasks',
          },
        ]
      },
      {
        path: '/quality',
        component: './quality',
        routes: [
          {
            path: '/quality/survey',
            component: './quality/survey',
          },
          {
            path: '/quality/details',
            component: './quality/details',
          },
          {
            path: '/quality/details/tasks',
            component: './quality/details/tasks',
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
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            path: '/user/:id',
            component: './user/login',
          },
        ]

      },
    ]
  },

];
