export const routes = [
  {
    path: '/',
    redirect: '/indexPage',
  },
  {
    path: '/404',
    redirect: '/exception/404',
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
        path: '/indexPage',
        component: './indexPage',
      },
      {
        path: '/smartPlatform',
        component: './smartPlatform',
        name: '督学平台',
        routes: [
          {
            path: '/smartPlatform/survey',
            component: './smartPlatform/survey',
            name: '报表概览',
          },
          {
            path: '/smartPlatform/details',
            component: './smartPlatform/details',
            name: '明细数据查询',
          },
          {
            path: '/smartPlatform/exam',
            component: './smartPlatform/exam',
            name: '报考',
          },
          {
            path: '/smartPlatform/exam/collegeinfo',
            component: './smartPlatform/exam/singleProColInfo',
            name: '报考信息',
            bread: {
              name: '报考',
              path: '/smartPlatform/exam',
            },
          },
          {
            path: '/smartPlatform/details/tasks',
            component: './smartPlatform/details/tasks',
            name: '任务列表',
            bread: {
              name: '明细数据查询',
              path: '/smartPlatform/details',
            },
          },
        ],
      },
      {
        path: '/qualityAppeal',
        component: './qualityAppeal',
        name: '质检管理',
        routes: [
          {
            path: '/qualityAppeal/qualityNewSheet',
            component: './qualityAppeal/qualityNewSheet',
            name: '新质检单管理',
          },
          {
            path: '/qualityAppeal/qualityNewSheet/create',
            component: './qualityAppeal/qualityNewSheet/create',
            name: '创建质检单',
            bread: {
              name: '新质检单管理',
              path: '/qualityAppeal/qualityNewSheet',
            },
          },
          {
            path: '/qualityAppeal/qualityNewSheet/edit',
            component: './qualityAppeal/qualityNewSheet/edit',
            name: '编辑质检单',
            bread: {
              name: '新质检单管理',
              path: '/qualityAppeal/qualityNewSheet',
            },
          },
          {
            path: '/qualityAppeal/qualityNewSheet/appealSt',
            component: './qualityAppeal/qualityNewSheet/edit',
            name: '审核',
          },
          {
            path: '/qualityAppeal/qualityNewSheet/detail',
            component: './qualityAppeal/qualityNewSheet/detail',
            name: '质检详情',
          },
          {
            path: '/qualityAppeal/qualityAppeal',
            component: './qualityAppeal/qualityAppeal',
            name: '质检申诉管理',
          },
          {
            path: '/qualityAppeal/qualityAppeal/detail',
            component: './qualityAppeal/qualityAppeal/detail',
            name: '申诉详情',
            bread: {
              name: '质检申诉管理',
              path: '/qualityAppeal/qualityAppeal',
            },
          },
          {
            path: '/qualityAppeal/qualityAppeal/edit',
            component: './qualityAppeal/qualityAppeal/edit',
            name: '发起申诉',
            bread: {
              name: '质检申诉管理',
              path: '/qualityAppeal/qualityAppeal',
            },
          },
          {
            path: '/qualityAppeal/qualityAppeal/appeal',
            component: './qualityAppeal/qualityAppeal/appeal',
            name: '申诉审核',
            bread: {
              name: '质检申诉管理',
              path: '/qualityAppeal/qualityAppeal',
            },
          },
          {
            path: '/qualityAppeal/qualityAppeal/launchAppeal',
            component: './qualityAppeal/qualityAppeal/appeal',
            name: '申诉审核',
            bread: {
              name: '质检申诉管理',
              path: '/qualityAppeal/qualityAppeal',
            },
          },
          {
            path: '/qualityAppeal/qualityBook',
            component: './qualityAppeal/qualityBook',
            name: '品控质检手册',
          },
          {
            path: '/qualityAppeal/qualityBook/create',
            component: './qualityAppeal/qualityBook/create',
            name: '新建质检手册',
            bread: {
              name: '品控质检手册',
              path: '/qualityAppeal/qualityBook',
            },
          },
        ],
      },
    ],
  },
];
