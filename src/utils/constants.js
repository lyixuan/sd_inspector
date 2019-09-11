/**
 * 静态数据和全局配置
 * */

// localStorage Keys

// 当前用户权限
export const ADMIN_AUTH = 'admin_auth';
// 当前用户信息
export const ADMIN_USER = 'admin_user';

export const DEBUGGER_USER = {
  localhost: 'zhanglulu02',
}[process.env.LOGIN_TYPE];

// 静态文件host
export const STATIC_HOST = {
  development: 'http://172.16.117.65',
  production: 'http://bd.ministudy.com/download',
}[process.env.PROXY_ENV];

export const SERVER_HOST = {
  production: 'http://bd.ministudy.com',
  localhost: 'http://172.16.17.211:8083',
  development: 'http://172.16.17.211:8083',
  // development2: 'http://172.16.109.87:28081',
  development2: 'http://172.16.109.198:8081',
}[process.env.LOGIN_TYPE]

export const CAS_HOST = {
  localhost: 'http://test.xd.admin.ministudy.com',
  development: 'http://test.xd.admin.ministudy.com',
  development2: 'http://172.16.109.87:28081',
  production: 'http://bd.ministudy.com',
}[process.env.LOGIN_TYPE];

// 设置domain域名
export const DOMAIN_HOST = '.ministudy.com';
// export const DOMAIN_HOST = 'localhost';
export const PROXY_PATH = (hasSelfPri) => {return hasSelfPri ?'':''};// /inspectorapis

// 登录页面地址配置
export const LOGIN_URL = {
  // development: 'http://test.xd.admin.ministudy.com',
  development: 'http://test.xd-copy.admin.ministudy.com',
  production: 'http://bd.ministudy.com',
}[process.env.PROXY_ENV];

export const ADMIN_URL = {
  development: 'http://test.xd.admin.ministudy.com',
  production: 'http://bd.ministudy.com',
}[process.env.PROXY_ENV];

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
export const FAMILY_TYPE = [{ id: 0, name: '自考' }, { id: 1, name: '壁垒' }];
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
export const APP_LIST = [
  { id: '1', name: '极速版App' }
  ]
// 空ContentLayout页面名单
export const EmptyContentLayout = [
  { path: '/ko', name: 'KO计划' },
  { path: '/qualityMarking', name: '质检标注' },
  { path: '/qualityReport', name: '质检图表' },
  { path: '/shine/smallPro', name: '小程序管理'},
  { path: '/setting/performance/list', name: '创收绩效包' },
  { path: '/setting/performance/edit', name: '创收绩效包详情' },
  { path: '/setting/performance/create', name: '创收绩效包详情' },
  { path: '/setting/performance/copy', name: '创收绩效包详情' },
  { path: '/xdWorkbench', name: '小德工作台' },
];
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
};
// 质检审核-审核状态
export const CHECKSTATUS = { '1': '创建', '2': '通过', '3': '撤销', '4': '驳回' };
