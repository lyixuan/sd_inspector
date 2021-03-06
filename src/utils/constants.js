/**
 * 静态数据和全局配置
 * */

// localStorage Keys

// 当前用户权限
export const ADMIN_AUTH = 'admin_auth';
// 当前用户信息
export const ADMIN_USER = 'admin_user';

export const DEBUGGER_USER = {
  localhost: 'ligang02',
}[process.env.LOGIN_TYPE];

// 静态文件host
export const STATIC_HOST = {
  production: 'http://bd.ministudy.com/download',
  localhost: 'http://172.16.109.99:29180',
  localhost2: 'http://172.16.109.99:29180',
  development: 'http://172.16.109.99:29180',
  development2: 'http://172.16.109.99:29180',
}[process.env.ENV_TYPE];

// 集团静态文件地址，IM等图片
export const COMPANY_IMG_HOST = 'http://static.sunlands.com';

export const SERVER_HOST = {
  production: 'http://bd.ministudy.com',
  localhost: 'http://test.xd.admin.ministudy.com', //鲁也ip http://172.16.56.221:8086 http://test.xd.admin.ministudy.com
  localhost2: 'http://test.xd.admin2.ministudy.com',
  development: 'http://test.xd.admin.ministudy.com',
  development2: 'http://test.xd.admin2.ministudy.com',
}[process.env.ENV_TYPE];

export const CAS_HOST = {
  production: 'http://bd.ministudy.com',
  localhost: 'http://test.xd.admin.ministudy.com',
  localhost2: 'http://test.xd.admin2.ministudy.com',
  development: 'http://test.xd.admin.ministudy.com',
  development2: 'http://test.xd.admin2.ministudy.com',
}[process.env.ENV_TYPE];

export const ADMIN_URL = {
  production: 'http://bd.ministudy.com',
  localhost: 'http://test.xd.admin.ministudy.com',
  localhost2: 'http://test.xd.admin2.ministudy.com',
  development: 'http://test.xd.admin.ministudy.com',
  development2: 'http://test.xd.admin2.ministudy.com',
}[process.env.ENV_TYPE];

// ko-sessionReport，跳转URL
export const sessionReportURL = {
  production: 'http://sscp.ministudy.com/college_learn/#/sessionRecord',
  localhost: 'http://172.16.109.87:38080/#/sessionRecord',
  localhost2: 'http://172.16.109.87:38080/#/sessionRecord',
  development: 'http://172.16.109.87:38080/#/sessionRecord',
  development2: 'http://172.16.109.87:38080/#/sessionRecord',
}[process.env.ENV_TYPE];

// ko-knowledge，跳转URL
export const knowledgeURL = {
  production: 'http://sscp.ministudy.com/college_learn/#/questions',
  localhost: 'http://172.16.109.87:38080/#/questions',
  localhost2: 'http://172.16.109.87:38080/#/questions',
  development: 'http://172.16.109.87:38080/#/questions',
  development2: 'http://172.16.109.87:38080/#/questions',
}[process.env.ENV_TYPE];

export const PROXY_PATH = hasSelfPri => {
  return hasSelfPri ? '' : '/inspectorapis';
}; // /inspectorapis

// 下载中心服务器地址
export const DOWNLOAD_HOST = {
  production: 'http://h-bd.ministudy.com/exporter',
  localhost: 'http://172.16.109.87:38083',
  localhost2: 'http://172.16.109.87:38083',
  development: 'http://172.16.109.87:38083',
  development2: 'http://172.16.109.87:38083',
}[process.env.ENV_TYPE];

// =========================================== host =========

// 分页配置
export const PAGINATION = {
  showSizeChanger: true,
  showQuickJumper: true,
  defaultCurrent: 1,
  total: 0,
  pageSize: 36,
  pageSizeOptions: ['36', '50', '100'],
};
// header下拉选
export const GLOBAL_HEADER_SELECT = [
  { id: 'changeRole', name: '切换角色', icon: 'user' },
  // { id: 'changePwd', name: '修改密码', icon: 'lock' },  // 修改密码功能暂时去掉
  { id: 'logout', name: '退出登录', icon: 'logout' },
];

// 省份
export const provinceJson = [
  {
    code: 'AH',
    name: '安徽省',
  },
  {
    code: 'BJ',
    name: '北京市',
  },
  {
    code: 'FJ',
    name: '福建省',
  },
  {
    code: 'GS',
    name: '甘肃省',
  },
  {
    code: 'GD',
    name: '广东省',
  },
  {
    code: 'GX',
    name: '广西壮族自治区',
  },
  {
    code: 'GZ',
    name: '贵州省',
  },
  {
    code: 'HI',
    name: '海南省',
  },
  {
    code: 'HE',
    name: '河北省',
  },
  {
    code: 'HA',
    name: '河南省',
  },
  {
    code: 'HL',
    name: '黑龙江省',
  },
  {
    code: 'HB',
    name: '湖北省',
  },
  {
    code: 'HN',
    name: '湖南省',
  },
  {
    code: 'JL',
    name: '吉林省',
  },
  {
    code: 'JS',
    name: '江苏省',
  },
  {
    code: 'JX',
    name: '江西省',
  },
  {
    code: 'LN',
    name: '辽宁省',
  },
  {
    code: 'NM',
    name: '内蒙古自治区',
  },
  {
    code: 'NX',
    name: '宁夏回族自治区',
  },
  {
    code: 'QH',
    name: '青海省',
  },
  {
    code: 'SD',
    name: '山东省',
  },
  {
    code: 'SX',
    name: '山西省',
  },
  {
    code: 'SN',
    name: '陕西省',
  },
  {
    code: 'SH',
    name: '上海市',
  },
  {
    code: 'SC',
    name: '四川省',
  },
  {
    code: 'TJ',
    name: '天津市',
  },
  {
    code: 'XZ',
    name: '西藏自治区',
  },
  {
    code: 'XJ',
    name: '新疆维吾尔自治区',
  },
  {
    code: 'YN',
    name: '云南省',
  },
  {
    code: 'ZJ',
    name: '浙江省',
  },
  {
    code: 'CQ',
    name: '重庆市',
  },
  {
    code: 'MO',
    name: '澳门特别行政区',
  },
  {
    code: 'HK',
    name: '香港特别行政区',
  },
  {
    code: 'TW',
    name: '台湾省',
  },
];

// 报考步骤
export const PROVINCE_STEP = [
  { id: 0, name: '新生注册' },
  { id: 1, name: '现场确认' },
  { id: 2, name: '报考科目&缴费' },
  { id: 3, name: '补报名' },
];
// 报考状态
export const PROVINCE_STATUS = [
  { id: -1, name: '未定义' },
  { id: 1, name: '未开始' },
  { id: 2, name: '进行中' },
  { id: 3, name: '已结束' },
];

// 每个省份的报考进度
export const PROVINCE_SIGN_STEP = [
  { id: 1, name: '未公布' },
  { id: 2, name: '未开始' },
  { id: 3, name: '即将开始' },
  { id: 4, name: '进行中' },
  { id: 5, name: '已结束' },
];

// 订单状态
export const ORDER_STATE = [{ id: 1, name: '已支付' }, { id: 2, name: '已冻结' }];

// 学员身份
export const STUDENT_TYPE = [{ id: 1, name: '新生' }, { id: 2, name: '老生' }];

// 准考证填写状态
export const TICKET_STATES = [{ id: 1, name: '已填写' }, { id: 2, name: '未填写' }];

// 消息打开状态
export const MSG_STATES = [
  { id: '1', name: '未推送' },
  { id: '2', name: '已推送(未读)' },
  { id: '3', name: '已推送(已读)' },
];
// 任务状态
export const TASK_STATES = [
  { id: 1, name: '未开始', color: '#999' },
  { id: 2, name: '进行中..', color: '#dc5745' },
  { id: 3, name: '完成', color: '#52C9C2' },
  { id: 4, name: '失败', color: '#ff3678' },
];

// 考期临时接口
export const examList = {
  code: 20000,
  msg: 'OK',
  msgDetail: null,
  data: [
    {
      beginDate: '2018-10-23',
      createTime: null,
      endDate: '2019-04-22',
      examYearmonth: '2019-04',
      id: 5,
      updateTime: null,
    },
  ],
};
// 排行榜颜色
export const RATE_COLOR = [
  { id: 0, color: '#FF6D6D' },
  { id: 1, color: '#FF8E57' },
  { id: 2, color: '#FFAA4D' },
  { id: 3, color: '#52C9C2' },
];

// ====================================== 质检
// 质检类型
export const QUALITY_TYPE = [{ id: 1, name: '客诉质检' }, { id: 2, name: '班主任质检' }];

// 质检状态
export const QUALITY_STATE = [
  { id: 1, name: '审核未通过' },
  { id: 2, name: '待审核' },
  { id: 3, name: '已撤销' },
  { id: 4, name: '审核通过' },
];

// 质检扣分规则类别
export const QUALITY_RULE_TYPE = [
  { id: 1, name: '班主任' },
  { id: 2, name: '运营长' },
  { id: 3, name: '家族长' },
  { id: 4, name: '客诉' },
];

// 违规等级
export const VIOLATION_LEVEL = [
  { id: 1, name: '特级违规' },
  { id: 2, name: '一级违规' },
  { id: 3, name: '二级违规' },
  { id: 4, name: '三级违规' },
];

// 申诉状态 前端状态
export const APPEAL_STATE = [
  { id: 1, name: '待申诉', type: 1 },
  { id: 2, name: '一次SOP待审核', type: 1 }, // 1
  { id: 3, name: '一次SOP已驳回', type: 1 },
  { id: 4, name: '一次质检主管待审核', type: 1 }, //
  { id: 5, name: '一次申诉失败', type: 1 },
  { id: 6, name: '二次SOP待审核', type: 1 }, //
  { id: 7, name: '二次SOP已驳回', type: 1 },
  { id: 8, name: '二次质检主管待审核', type: 1 }, //2
  { id: 9, name: '一次申诉成功', type: 2 },
  { id: 10, name: '一次申诉超时', type: 2 },
  { id: 11, name: '二次申诉成功', type: 2 },
  { id: 12, name: '二次申诉失败', type: 2 },
  { id: 13, name: '二次申诉超时', type: 2 },
];

// 申诉状态2 拆分的状态，后端状态
export const APPEAL_STATE2 = [
  { id: 10, name: '待申诉' },
  { id: 1, name: 'sop待审核' },
  { id: 2, name: 'sop已驳回' },
  { id: 3, name: '质检主管待审核' },
  { id: 4, name: '申诉审核通过' },
  { id: 5, name: '质检主管已驳回' },
  { id: 6, name: '申诉超时' },
];

// 申诉类别
export const APPEAL_TYPE = [{ id: 1, name: '一次申诉' }, { id: 2, name: '二次申诉' }];

// 是否警告
export const ISWARN = [{ id: 1, name: '是' }, { id: 0, name: '否' }];
//  组织机构相关

// 前端角色类型,level含义是组织结构的层级，1代表选择到学院，2表示选择学院+家族，3代表选择三级，0代表不可选择,isPerformance代表绩效权限
export const FRONT_ROLE_TYPE_LIST = [
  { id: 'college', name: '院长或副院长', level: '1', isPerformance: 1 },
  { id: 'family', name: '家族长', level: '2', isPerformance: 1 },
  { id: 'group', name: '运营长', level: '3', isPerformance: 1 },
  { id: 'class', name: '班主任', level: '3', isPerformance: 1 },
  { id: 'admin', name: '管理员', level: '0', isPerformance: 1 },
  { id: 'boss', name: '管理层', level: '0', isPerformance: 1 },
  { id: 'others', name: '无绩效岗位', level: '0', isPerformance: 0 },
  { id: 'csmanager', name: '客诉经理', level: '1', isPerformance: 0 },
  { id: 'cssupervisor', name: '客诉主管', level: '1', isPerformance: 0 },
  { id: 'csleader', name: '客诉组长', level: '1', isPerformance: 0 },
  { id: 'csofficer', name: '客诉专员', level: '1', isPerformance: 0 },
];
// 学院类型
export const FAMILY_TYPE = [
  { id: 0, name: '自考' },
  { id: 1, name: '壁垒' },
  { id: 2, name: '研究生' },
  { id: 3, name: '泛学历' }
  ];
// 学院类型
export const APPEAL_RESULT_TYPE = [
  { id: 1, name: '通过' },
  { id: 0, name: '驳回' },
  { id: 2, name: '超时' },
];
// 质检上传类型
export const QUALITY_UPLOAD_TYPE = [{ id: 1, name: 'quality' }, { id: 2, name: 'appeal' }];
// 过滤单位
export const UNIT_DATE = [
  { id: 'dd', name: '天' },
  { id: 'hh', name: '小时' },
  { id: 'mm', name: '分钟' },
  { id: 'ss', name: '秒' },
];

// 应用类型
export const APP_LIST = [{ id: '1', name: '极速版App' }];
// 空ContentLayout页面名单
export const EmptyContentLayout = [
  { path: '/nps' ,name: 'nps'},
  { path: '/ko', name: 'KO计划' },
  { path: '/qualityMarking', name: '质检标注' },
  { path: '/qualityReport', name: '质检图表' },
  { path: '/shine/smallPro', name: '小程序管理' },
  { path: '/setting/performance/list', name: '创收绩效包' },
  { path: '/setting/performance/edit', name: '创收绩效包详情' },
  { path: '/setting/performance/create', name: '创收绩效包详情' },
  { path: '/setting/performance/copy', name: '创收绩效包详情' },
  { path: '/xdWorkbench', name: '小德工作台' },
  { path: '/xdCredit/index', name: '小德学分' },
  { path: '/indexPage', name: '小德工作台' },
  { path: '/cubePlan/list', name: '魔方计划' },
  { path: '/xdCredit/im', name: 'im差评分析'},
  { path: '/hotQuestion/index', name: '热门问题'},
  { path: '/hotQuestion/relationEdit'},
  { path: '/configWords'},
  { path: '/knowledge/knowledge', name: '知识库' },
  { path: '/sessionReport/sessionReport', name: '会话记录' },
  { path: '/allReport', name: '报考信息系统' },
  { path: '/examPlant/admissionTicket', name: '准考证填写' },
  { path: '/examPlant/registTouch', name: '报考触达' },
  { path: '/operateActivity/index', name: '运营活动' },
  { path: '/classQuality/qualityType/1', name: '客诉质检手册' },
  { path: '/classQuality/qualityType/2', name: '班主任质检手册' },
  { path: '/xdCreditPk/list', name: '学分PK' },
  { path: '/downloadCenter', name: '下载中心' },
  { path: '/newDetail', name: '创收产品包' },
  { path: '/robotPage/data', name: '机器人会话数据' },
  { path: '/robotPage/trend', name: '机器人会话趋势' }
];
export const EmptyContentLayoutWithBread = [{ path: '/cubePlan/list/detail', name: '魔方详情' }];
// 注册类型
export const REGISTER_STATUS = [{ id: 1, name: '已注册' }];
// 选课状态
export const CHOISE_STATUS = [{ id: 0, name: '未选课' }, { id: 1, name: '已选课' }];

// 热力图对应的区间取值
export const HOT_RANGE = [
  { minVal: 0, maxVal: 10, color: '#7B83FF' },
  { minVal: 10, maxVal: 30, color: '#5AB9FF' },
  { minVal: 30, maxVal: 40, color: '#7AF5C5' },
  { minVal: 40, maxVal: 50, color: '#FFE65A' },
  { minVal: 50, maxVal: 60, color: '#FFCB64' },
  { minVal: 60, maxVal: 80, color: '#FF9862' },
  { minVal: 80, maxVal: 101, color: '#FF8383' },
];
export const PAGE_KEY_ACTION = [
  { value: 'storelist', actionValue: 'majordetail' },
  { value: 'kolist', actionValue: 'kogoodsdetail' },
];
export const KO_LIST = 'KoList';

export const INDEX_PAGE = 'homepage';
// 通过判断改值是否存在于actionKeyId里确实这个节点是否流向 选课 节点
export const CLICK_KO_ITEM = 'click_ko_item';

// 申诉维度枚举
export const DIMENSION_TYPE = [
  { id: 11, name: '优新', url: 'specialNewer' },
  { id: 14, name: 'IM', url: 'IM' },
  { id: 19, name: '工单', url: 'order' },
  { id: 23, name: '底线', url: 'baseline' },
  { id: 42, name: '创收', url: 'createIncome' },
];

// 申诉维度
export const SCORE_APPEAL_DIS = [
  { id: 12, name: '开班电话', parentId: 11 },
  { id: 60, name: '开学典礼', parentId: 11 },
  { id: 17, name: '不及时消息', parentId: 14 },
  { id: 15, name: '未回复会话', parentId: 14 },
  { id: 16, name: '不满意会话', parentId: 14 },
  { id: 20, name: '工单初次减分', parentId: 19 },
  { id: 21, name: '工单二次减分', parentId: 19 },
  { id: 22, name: '工单三次减分', parentId: 19 },
  { id: 24, name: '事件', parentId: 23 },
  { id: 25, name: '班投', parentId: 23 },
  { id: 26, name: '退费', parentId: 23 },
  { id: 47, name: '退挽', parentId: 23 },
  { id: 45, name: '60分钟以下', parentId: 42 },
  { id: 44, name: '60至120分钟', parentId: 42 },
  { id: 43, name: '120分钟以上', parentId: 42 },
];
// 申诉状态
export const SCORE_APPEAL_STATE = [
  { id: 1, name: '一次对接人待审核' },
  { id: 2, name: '二次对接人待审核' },
  { id: 3, name: '一次对接人审核未通过' },
  { id: 4, name: '二次对接人审核未通过' },
  { id: 5, name: '一次主管待审核' },
  { id: 6, name: '二次主管待审核' },
  { id: 7, name: '一次申诉失败' },
  { id: 8, name: '一次申诉成功' },
  { id: 9, name: '二次申诉超时' },
  { id: 10, name: '二次申诉成功' },
  { id: 11, name: '二次申诉失败' },
];
// 申诉状态-学分归属人、对接人-在途
export const SCORE_APPEAL_STATE_ON_OWNER = [
  { id: 1, name: '一次对接人待审核' },
  { id: 2, name: '二次对接人待审核' },
  { id: 3, name: '一次对接人审核未通过' },
  { id: 4, name: '二次对接人审核未通过' },
  { id: 5, name: '一次主管待审核' },
  { id: 6, name: '二次主管待审核' },
  { id: 7, name: '一次申诉失败' },
];
// 申诉状态-主管-在途
export const SCORE_APPEAL_STATE_ON_MASTER = [
  { id: 2, name: '二次对接人待审核' },
  { id: 4, name: '二次对接人审核未通过' },
  { id: 5, name: '一次主管待审核' },
  { id: 6, name: '二次主管待审核' },
  { id: 7, name: '一次申诉失败' },
];
// 申诉状态-结案
export const SCORE_APPEAL_STATE_FIN = [
  { id: 8, name: '一次申诉成功' },
  { id: 9, name: '二次申诉超时' },
  { id: 10, name: '二次申诉成功' },
  { id: 11, name: '二次申诉失败' },
];
// 归属人处罚方式
export const PUNISH_TYPE_LIST = [
  { id: 1, name: '扣除绩效' },
  { id: 2, name: '扣除学分' },
  { id: 3, name: '扣除挽留金额' },
  { id: 4, name: '扣除人均挽留金额' },
];
// 需要清空的local数据
export const REMOVE_LOCAL_DATA = [
  'incomeFamilyLocal',
  'incomeGroupLocal',
  'creditFamilyLocal',
  'creditGroupLocal',
  'creditWorkLocal',
  'incomeWorkLocal',
];
// 工作台星级
export const WB_STAR = [
  // { id: '0', name: '全部' },
  { id: '5', name: '5星' },
  { id: '4', name: '4星' },
  { id: '3', name: '3星' },
  { id: '2', name: '2星' },
  { id: '1', name: '1星' },
  { id: '6', name: '1-3星' },
];

// 生命周期
export const WB_LIFE_CYCLE = [
  // { id: '0', name: '全部' },
  { id: '7', name: '7' },
  { id: '30', name: '30' },
  { id: '60', name: '60' },
  { id: '90', name: '90' },
  { id: '120', name: '120' },
  { id: '150', name: '150' },
  { id: '180', name: '180' },
  { id: '270', name: '270' },
  { id: '360', name: '360' },
  { id: '450', name: '450' },
  { id: '540', name: '540' },
  { id: '630', name: '630' },
  { id: '710', name: '710' },
];
export const DO_NOT_MENU = [
  '/xdCredit/index', // 小德学分
  '/classQuality/qualityType/1', // 客诉任手册
  '/classQuality/qualityType/2', // 班主任手册
];

export const Xing = [
  { id: 1, name: '非常难用' },
  { id: 2, name: '不好用' },
  { id: 3, name: '一般般' },
  { id: 4, name: '好用' },
  { id: 5, name: '非常好用' },
];
export const WB_PATH_LIST = [
  { id: 1, name: '专-专' },
  { id: 2, name: '专-本' },
  { id: 3, name: '专-专本连读' },
  { id: 4, name: '专-非自考' },
  { id: 5, name: '本-专' },
  { id: 6, name: '本-本' },
  { id: 7, name: '本-专本连读' },
  { id: 8, name: '本-非自考' },
  { id: 9, name: '专本连读-专' },
  { id: 10, name: '专本连读-本' },
  { id: 11, name: '专本连读-专' },
  { id: 12, name: '专本连读-非自考' },
  { id: 13, name: '非自考-专科' },
  { id: 14, name: '非自考-本科' },
  { id: 15, name: '非自考-专本连读' },
  { id: 16, name: '非自考-非自考' },
];
// 需要用于global filter 进行数据筛选的，必须加到default里
export default {
  ORDER_STATE,
  STUDENT_TYPE,
  TICKET_STATES,
  MSG_STATES,
  TASK_STATES,
  RATE_COLOR,
  PAGINATION,
  PROVINCE_SIGN_STEP,
  provinceJson,
  examList,
  QUALITY_TYPE,
  QUALITY_STATE,
  QUALITY_RULE_TYPE,
  VIOLATION_LEVEL,
  APPEAL_STATE,
  APPEAL_TYPE,
  ISWARN,
  FRONT_ROLE_TYPE_LIST,
  FAMILY_TYPE,
  APPEAL_RESULT_TYPE,
  QUALITY_UPLOAD_TYPE,
  EmptyContentLayout,
  EmptyContentLayoutWithBread,
  APP_LIST,
  HOT_RANGE,
  REGISTER_STATUS,
  CHOISE_STATUS,
  DIMENSION_TYPE,
  SCORE_APPEAL_STATE,
  SCORE_APPEAL_STATE_FIN,
  SCORE_APPEAL_STATE_ON_OWNER,
  SCORE_APPEAL_STATE_ON_MASTER,
  SCORE_APPEAL_DIS,
  PUNISH_TYPE_LIST,
  WB_STAR,
  WB_LIFE_CYCLE,
  DO_NOT_MENU,
  Xing,
  WB_PATH_LIST,
};
// 质检审核-审核状态
export const CHECKSTATUS = { '1': '创建', '2': '通过', '3': '撤销', '4': '驳回' };
