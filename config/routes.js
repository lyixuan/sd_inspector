export const routes = [
  {
    path: '/inspector',
    component: '../layouts/BasicLayout',
    Routes: ['/utils/PrivateRoute.js'],
    routes: [
      {
        path: '/',
        redirect: '/inspector/survey',
      },
      {
        path: '/inspector',
        redirect: '/inspector/survey',
      },
      {
        path: '/inspector/survey',
        component: './survey',
        Routes: ['/utils/PrivateRoute.js'],
      },
      {
        path: '/inspector/details',
        component: './details',
        Routes: ['/utils/PrivateRoute.js'],
      },
    ],
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
];
