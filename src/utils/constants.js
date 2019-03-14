/**
* 静态数据和全局配置
* */


// localStorage Keys

// 当前用户权限
export const ADMIN_AUTH = 'admin_auth';
// 当前用户信息
export const ADMIN_USER = 'admin_user';
// 静态文件host
export const STATIC_HOST = {
  development: 'http://172.16.117.65',
  production: 'http://api.bd.ministudy.com/download',
}[process.env.PROXY_ENV];
// 设置domain域名
export const DOMAIN_HOST = '.ministudy.com';
// export const DOMAIN_HOST = 'localhost';

// 登录页面地址配置
export const LOGIN_URL = {
  localhost: 'http://newadmin.ministudy.com',
  development: 'http://test.xd.admin.ministudy.com',
  production: 'http://bd.ministudy.com',
}[process.env.LOGIN_TYPE];

// 分页配置
export const PAGINATION = {
  showSizeChanger: true,
  showQuickJumper: true,
  defaultCurrent: 1,
  total: 0,
  pageSize: 36,
  pageSizeOptions: ['36', '50', '100']
};
// header下拉选
export const GLOBAL_HEADER_SELECT = [
  { id: 'changeRole', name: '切换角色', icon: 'user' },
  { id: 'changePwd', name: '修改密码', icon: 'lock' },
  { id: 'logout', name: '退出登录', icon: 'logout' },
];

// 省份
export const provinceJson = [
  {
    "code": "AH",
    "name": "安徽省",
  },
  {
    "code": "BJ",
    "name": "北京市",
  },
  {
    "code": "FJ",
    "name": "福建省",
  },
  {
    "code": "GS",
    "name": "甘肃省",
  },
  {
    "code": "GD",
    "name": "广东省",
  },
  {
    "code": "GX",
    "name": "广西壮族自治区",
  },
  {
    "code": "GZ",
    "name": "贵州省",
  },
  {
    "code": "HI",
    "name": "海南省",
  },
  {
    "code": "HE",
    "name": "河北省",
  },
  {
    "code": "HA",
    "name": "河南省",
  },
  {
    "code": "HL",
    "name": "黑龙江省",
  },
  {
    "code": "HB",
    "name": "湖北省",
  },
  {
    "code": "HN",
    "name": "湖南省",
  },
  {
    "code": "JL",
    "name": "吉林省",
  },
  {
    "code": "JS",
    "name": "江苏省",
  },
  {
    "code": "JX",
    "name": "江西省",
  },
  {
    "code": "LN",
    "name": "辽宁省",
  },
  {
    "code": "NM",
    "name": "内蒙古自治区",
  },
  {
    "code": "NX",
    "name": "宁夏回族自治区",
  },
  {
    "code": "QH",
    "name": "青海省",
  },
  {
    "code": "SD",
    "name": "山东省",
  },
  {
    "code": "SX",
    "name": "山西省",
  },
  {
    "code": "SN",
    "name": "陕西省",
  },
  {
    "code": "SH",
    "name": "上海市",
  },
  {
    "code": "SC",
    "name": "四川省",
  },
  {
    "code": "TJ",
    "name": "天津市",
  },
  {
    "code": "XZ",
    "name": "西藏自治区",
  },
  {
    "code": "XJ",
    "name": "新疆维吾尔自治区",
  },
  {
    "code": "YN",
    "name": "云南省",
  },
  {
    "code": "ZJ",
    "name": "浙江省",
  },
  {
    "code": "CQ",
    "name": "重庆市",
  },
  {
    "code": "MO",
    "name": "澳门特别行政区",
  },
  {
    "code": "HK",
    "name": "香港特别行政区",
  },
  {
    "code": "TW",
    "name": "台湾省",
  }
];
// 报考步骤
export const PROVINCE_STEP = [
  { id: 1, name: '新生注册' },
  { id: 2, name: '现场确认' },
  { id: 3, name: '报考科目&缴费' },
  { id: 4, name: '补报名' },
];
// 报考状态
export const PROVINCE_STATUS = [
  { id: -1, name: '未定义' },
  { id: 1, name: '未开始' },
  { id: 2, name: '进行中' },
  { id: 3, name: '已结束' },

]

// 每个省份的报考进度
export const PROVINCE_SIGN_STEP = [
  { id: 1, name: '未公布' },
  { id: 2, name: '未开始' },
  { id: 3, name: '即将开始' },
  { id: 4, name: '进行中' },
  { id: 5, name: '已结束' },
];

// 订单状态
export const ORDER_STATE = [
  { id: 1, name: '已支付' },
  { id: 2, name: '已冻结' },
];

// 学员身份
export const STUDENT_TYPE = [
  { id: 1, name: '新生' },
  { id: 2, name: '老生' },
];

// 准考证填写状态
export const TICKET_STATES = [
  { id: 1, name: '已填写' },
  { id: 2, name: '未填写' },
];

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
  { id: 3, name: '完成', color: '#38e39d' },
  { id: 4, name: '失败', color: '#ff3678' },
];

// 考期接口
export const examList =
{
  code: 20000,
  msg: "OK",
  msgDetail: null,
  data: [
    { "beginDate": "2018-10-23", "createTime": null, "endDate": "2019-04-22", "examYearmonth": "2019-04", "id": 5, "updateTime": null }
  ]
};

// 需要用于global filter 进行数据筛选的，必须加到default里
export default {
  ORDER_STATE,
  STUDENT_TYPE,
  TICKET_STATES,
  MSG_STATES,
  TASK_STATES,
  PAGINATION,
  PROVINCE_SIGN_STEP,
  provinceJson,
  examList,
};
