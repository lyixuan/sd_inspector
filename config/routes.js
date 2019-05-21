export const routes = [
  {
    path: '/',
    redirect: '/indexPage',
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
            path: '/smartPlatform/pushData',
            component: './smartPlatform/pushData',
            name: '推送数据',
            bread: {
              name: '报表概览',
              path: '/smartPlatform/survey',
            },
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
            component: './qualityAppeal/qualityNewSheet/appealSt',
            name: '审核',
            bread: {
              name: '新质检单管理',
              path: '/qualityAppeal/qualityNewSheet',
            },
          },
          {
            path: '/qualityAppeal/qualityNewSheet/detail',
            component: './qualityAppeal/qualityNewSheet/detail',
            name: '质检详情',
            bread: {
              name: '新质检单管理',
              path: '/qualityAppeal/qualityNewSheet',
            },
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
            path: '/qualityAppeal/qualityAppeal/launch',
            component: './qualityAppeal/qualityAppeal/launchAppeal',
            name: '发起申诉',
            bread: {
              name: '质检申诉管理',
              path: '/qualityAppeal/qualityAppeal',
            },
          },
          {
            path: '/qualityAppeal/qualityAppeal/create',
            component: './qualityAppeal/qualityAppeal/create',
            name: '申诉审核',
            bread: {
              name: '申诉审核',
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
      {
        path: '/ko',
        component: './ko',
        name: 'KO计划',
        pageRedirect: '/ko/behaviorAnalyze',
        routes: [
          {
            path: '/ko/behaviorAnalyze',
            component: './ko/behaviorAnalyze',
            name: '行为分析',
            commonPath: true,   // 继承父页面
          },
          {
            path: '/ko/userList',
            component: './ko/userList',
            name: '用户列表',
            commonPath: true,   // 继承父页面
          },
          {
            path: '/ko/behaviorInfo',
            component: './ko/behaviorInfo',
            name: '行为轨迹',
          },
          {
            path: '/ko/behaviorPath',
            component: './ko/behaviorPath',
            name: '用户行为轨迹',
          },
        ],
      },
      {
        path: '/scoreAppeal',
        component: './scoreAppeal',
        name: '学分申诉',
        pageRedirect: '/scoreAppeal/behaviorAnalyze',
        routes: [
          /* 待申诉 */
          {
            path: '/scoreAppeal/awaitAppeal_specialNewer',
            component: './scoreAppeal/awaitAppeal_specialNewer',
            name: '待申诉-优新',
            bread: {
              name: '待申诉',
              path: '/scoreAppeal/awaitAppeal_specialNewer',
            },
            commonPath: true,   // 继承父页面
          },
          {
            path: '/scoreAppeal/awaitAppeal_IM',
            component: './scoreAppeal/awaitAppeal_IM',
            name: '待申诉-IM',
            commonPath: true,   // 继承父页面
          },
          {
            path: '/scoreAppeal/awaitAppeal_order',
            component: './scoreAppeal/awaitAppeal_order',
            name: '待申诉-工单',
          },
          {
            path: '/scoreAppeal/awaitAppeal_baseline',
            component: './scoreAppeal/awaitAppeal_baseline',
            name: '待申诉-底线',
          },
          {
            path: '/scoreAppeal/awaitAppeal_createIncome',
            component: './scoreAppeal/awaitAppeal_createIncome',
            name: '待申诉-创收',
          },
          /* 在途申诉 */
          {
            path: '/scoreAppeal/onAppeal_specialNewer',
            component: './scoreAppeal/onAppeal_specialNewer',
            name: '在途申诉-优新',
          },
          {
            path: '/scoreAppeal/onAppeal_IM',
            component: './scoreAppeal/onAppeal_IM',
            name: '在途申诉-IM',
          },
          {
            path: '/scoreAppeal/onAppeal_order',
            component: './scoreAppeal/onAppeal_order',
            name: '在途申诉-工单',
          },
          {
            path: '/scoreAppeal/onAppeal_baseline',
            component: './scoreAppeal/onAppeal_baseline',
            name: '在途申诉-底线',
          },
          {
            path: '/scoreAppeal/onAppeal_createIncome',
            component: './scoreAppeal/onAppeal_createIncome',
            name: '在途申诉-创收',
          },
          /* 结案申诉 */
          {
            path: '/scoreAppeal/finishAppeal_specialNewer',
            component: './scoreAppeal/finishAppeal_specialNewer',
            name: '结案申诉-优新',
          },
          {
            path: '/scoreAppeal/finishAppeal_IM',
            component: './scoreAppeal/finishAppeal_IM',
            name: '结案申诉-IM',
          },
          {
            path: '/scoreAppeal/finishAppeal_order',
            component: './scoreAppeal/finishAppeal_order',
            name: '结案申诉-工单',
          },
          {
            path: '/scoreAppeal/finishAppeal_baseline',
            component: './scoreAppeal/finishAppeal_baseline',
            name: '结案申诉-底线',
          },
          {
            path: '/scoreAppeal/finishAppeal_createIncome',
            component: './scoreAppeal/finishAppeal_createIncome',
            name: '结案申诉-创收',
          },
          /* 其他 */
          {
            path: '/scoreAppeal/appeal_initiate',
            component: './scoreAppeal/appeal_initiate',
            name: '发起申诉',
          },
          {
            path: '/scoreAppeal/appeal_detail',
            component: './scoreAppeal/appeal_detail',
            name: '申诉详情',
          },
          {
            path: '/scoreAppeal/appeal_check',
            component: './scoreAppeal/appeal_check',
            name: '申诉审核',
          },
        ],
      },
    ],
  },
];
