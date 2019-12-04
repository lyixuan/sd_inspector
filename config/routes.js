export const routes = [
  {
    path: '/',
    redirect: '/indexPage',
  },
  {
    path: '/doc',
    component: './doc',
  },
  // {
  //   path: '/exception/403',
  //   component: './exception/403',
  // },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/indexPage',
        component: './indexPage',
        routes: [
          {
            path: '/indexPage/xdWorkbench',
            component: './indexPage/xdWorkbench',
            name: '小德工作台',
          },
          {
            path: '/indexPage/xdFamilyBench',
            component: './indexPage/xdFamilyBench',
            name: '小德工作台',
          },
          {
            path: '/indexPage/ManagementBench',
            component: './indexPage/ManagementBench',
            name: '小德工作台',
          },
        ],
      },
      {
        path: '/exception/403',
        component: './exception/403',
      },
      {
        path: '/exception/404',
        component: './exception/404',
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
            component: './qualityAppeal/qualityNewSheet/appeal',
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
        ],
      },
      {
        path: '/ko',
        component: './ko',
        name: 'KO项目',
        pageRedirect: '/ko/behaviorAnalyze',
        routes: [
          {
            path: '/ko/behaviorAnalyze',
            component: './ko/behaviorAnalyze',
            name: 'APP统计',
            commonPath: true, // 继承父页面
          },
          // {
          //   path: '/ko/userList',
          //   component: './ko/userList',
          //   name: '用户查询',
          //   commonPath: true,   // 继承父页面
          // },
          {
            path: '/ko/behaviorInfo',
            component: './ko/behaviorInfo',
            name: '行为轨迹',
          },
          {
            path: '/ko/behaviorPath',
            component: './ko/behaviorPath',
            name: '学员档案',
          },
        ],
      },
      {
        path: '/koUserData',
        component: './ko',
        name: '用户查询',
        pageRedirect: '/koUserData/userList',
        routes: [
          {
            path: '/koUserData/userList',
            component: './ko/userList',
            name: '用户查询',
            commonPath: true, // 继承父页面
          },
        ],
      },
      {
        path: '/koUserOperation',
        name: '用户运营',
        routes: [
          {
            path: '/koUserOperation/userOperation',
            component: './ko/userOperation',
            name: '群组管理',
          },
          {
            path: '/koUserOperation/userGroupAdd',
            component: './ko/userGroupAdd',
            name: '添加用户运营',
          },
          {
            path: '/koUserOperation/userGroupEdit',
            component: './ko/userGroupEdit',
            name: '编辑用户运营',
          },
        ],
      },
      {
        path: '/knowledge',
        name: '知识库',
        routes: [
          {
            path: '/knowledge/knowledge',
            component: './ko/knowledge',
          },
        ],
      },
      {
        path: '/sessionReport',
        name: '会话记录',
        routes: [
          {
            path: '/sessionReport/sessionReport',
            component: './ko/sessionReport',
          },
        ],
      },
      {
        path: '/qualityMarking/detail',
        name: 'AI工作台',
        routes: [
          {
            path: '/qualityMarking/detail',
            component: './ko/qualityMarking/detail',
            name: '质检标注',
          },
        ],
      },
      {
        path: '/qualityMarking',
        component: './ko/qualityMarking',
        name: '质检标注',
        pageRedirect: '/qualityMarking/im',
        routes: [
          {
            path: '/qualityMarking/im',
            component: './ko/qualityMarking/im',
            commonPath: true, // 继承父页面
            name: 'IM会话标注',
          },
          {
            path: '/qualityMarking/bbs',
            component: './ko/qualityMarking/bbs',
            commonPath: true, // 继承父页面
            name: 'BBS标注',
          },
          {
            path: '/qualityMarking/nps',
            component: './ko/qualityMarking/nps',
            commonPath: true, // 继承父页面
            name: 'NPS标注',
          },
        ],
      },
      {
        path: '/scoreAppeal',
        component: './scoreAppeal',
        name: '学分申诉',
        routes: [
          /* 待申诉 */
          {
            path: '/scoreAppeal/awaitAppeal',
            component: './scoreAppeal/awaitAppeal',
            name: '待申诉',
          },
          {
            path: '/scoreAppeal/awaitAppeal/detail',
            component: './scoreAppeal/awaitAppeal/detail',
            name: '申诉详情',
            bread: {
              name: '待申诉',
              path: '/scoreAppeal/awaitAppeal',
            },
          },
          {
            path: '/scoreAppeal/awaitAppeal/appeal',
            component: './scoreAppeal/awaitAppeal/createFirstAppeal',
            name: '发起申诉',
            bread: {
              name: '待申诉',
              path: '/scoreAppeal/awaitAppeal',
            },
          },
          /* 在途申诉 */
          {
            path: '/scoreAppeal/onAppeal',
            component: './scoreAppeal/onAppeal',
            name: '在途申诉',
          },
          {
            path: '/scoreAppeal/onAppeal/appeal',
            component: './scoreAppeal/onAppeal/createAppeal',
            name: '发起申诉',
            bread: {
              name: '在途申诉',
              path: '/scoreAppeal/onAppeal',
            },
          },
          {
            path: '/scoreAppeal/onAppeal/checkAppeal',
            component: './scoreAppeal/onAppeal/checkAppeal',
            name: '申诉审核',
            bread: {
              name: '在途申诉',
              path: '/scoreAppeal/onAppeal',
            },
          },
          {
            path: '/scoreAppeal/onAppeal/detail',
            component: './scoreAppeal/appeal_detail',
            name: '申诉详情',
            bread: {
              name: '在途申诉',
              path: '/scoreAppeal/onAppeal',
            },
          },
          /* 结案申诉 */
          {
            path: '/scoreAppeal/finishAppeal',
            component: './scoreAppeal/finishAppeal',
            name: '结案申诉',
          },
          {
            path: '/scoreAppeal/finishAppeal/detail',
            component: './scoreAppeal/appeal_detail',
            name: '申诉详情',
            bread: {
              name: '结案申诉',
              path: '/scoreAppeal/finishAppeal',
            },
          },
        ],
      },
      {
        path: '/entrancePlatform',
        name: '报考督学平台',
        pageRedirect: '/entrancePlatform/statistics',
        routes: [
          {
            path: '/entrancePlatform/statistics',
            component: './ko/entrancePlatform',
          },
        ],
      },
      {
        path: '/allReport',
        name: '报表',
        routes: [
          {
            path: '/allReport/:siteKey',
            component: './allReport',
          },
        ],
      },
      {
        path: '/config',
        component: './config',
        name: '更多配置',
        routes: [
          {
            path: '/config/report',
            component: './config/report',
            name: '周报',
          },
        ],
      },
      {
        path: '/setting',
        component: './setting',
        name: '配置',
        routes: [
          {
            path: '/setting/createIncome',
            component: './setting/createIncome',
            name: '创收绩效管理',
          },
          {
            path: '/setting/performance/list',
            component: './setting/performance',
            name: '创收绩效包',
          },
          {
            path: '/setting/performance/create',
            component: './setting/performance/edit',
            name: '创建创收绩效包',
            bread: {
              name: '创收绩效包',
              path: '/setting/performance/list',
            },
          },
          {
            path: '/setting/performance/copy',
            component: './setting/performance/edit',
            name: '复制创收绩效包',
            bread: {
              name: '创收绩效包',
              path: '/setting/performance/list',
            },
          },
          {
            path: '/setting/performance/edit',
            component: './setting/performance/edit',
            name: '编辑创收绩效包',
            bread: {
              name: '创收绩效包',
              path: '/setting/performance/list',
            },
          },
        ],
      },
      {
        path: '/shine',
        component: './shine',
        name: '发光研究所',
        routes: [
          {
            path: '/shine/course',
            component: './shine/course',
            name: '课程管理',
          },
          {
            path: '/shine/courseFile',
            component: './shine/courseFile',
            name: '课程资料',
          },
          {
            path: '/shine/classTest',
            component: './shine/classTest',
            name: '随堂考',
          },
          {
            path: '/shine/evaluate',
            component: './shine/evaluate',
            name: '用户评价',
          },
          {
            path: '/shine/exam',
            component: './shine/exam',
            name: '练习通道',
          },
          {
            path: '/shine/expaper',
            component: './shine/expaper',
            name: '考卷管理',
          },
          {
            path: '/shine/smallProgram',
            component: './shine/smallPro',
            name: '小程序管理',
          },
        ],
      },
      {
        path: '/xdCredit',
        name: '小德工作台',
        routes: [
          {
            path: '/xdCredit/index',
            component: './xdCredit',
            name: '小德学分',
          },
        ],
      },
      {
        path: '/xdFamilyBench',
        name: '家族长工作台',
        routes: [
          {
            path: '/xdFamilyBench/index',
            component: './indexPage/xdFamilyBench',
            name: '家族长工作台',
          },
        ],
      },
      // {
      //   path: '/xdWorkbench',
      //   name: '小德工作台',
      //   routes: [
      //     {
      //       path: '/xdWorkbench/index',
      //       component: './indexPage/xdWorkbench',
      //       name: '小德工作台',
      //     },
      //   ]
      // }
      {
        path: '/configWords',
        component: './configWords/index',
      },
      {
        path: '/examPlant/index',
        component: './examPlant/index',
        name: '报考时间',
      },
      {
        path: '/operateActivity',
        routes: [
          {
            path: '/operateActivity/index',
            component: './operateActivity',
          },
          {
            path: '/operateActivity/configActivity',
            component: './operateActivity/configActivity',
          }
        ]
      },
      {
        path: '/cubePlan',
        component: './cubePlan',
        name: '魔方计划',
        routes: [
          {
            path: '/cubePlan/list',
            component: './cubePlan/home/index',
            name: '首页',
          },
          {
            path: '/cubePlan/list/detail',
            component: './cubePlan/detail/index',
            name: '查看详情',
            bread: {
              name: '首页',
              path: '/cubePlan/list',
            },
          },
        ],
      },
      {
        path: '/classQuality/qualityType/1', // 客诉
        component: './classQuality/index',
      },
      {
        path: '/classQuality/qualityType/2', // 班主任
        component: './classQuality/index',
      },
      {
        path: '/hotQuestion',
        routes: [
          {
            path: '/hotQuestion/index',
            component: './hotQuestion'
          },
          {
            path: '/hotQuestion/guessEdit',
            component: './hotQuestion/guessEdit',
          },
          {
            path: '/hotQuestion/relationEdit',
            component: './hotQuestion/relationEdit',
          }
        ]
      }
    ],
  },
];
