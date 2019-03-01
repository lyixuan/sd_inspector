/**
* 静态数据和全局配置
* */


// localStorage Keys

// 当前用户权限
export const ADMIN_AUTH = 'admin_auth';
// 当前用户信息
export const ADMIN_USER = 'admin_user';


// 登录页面地址配置
export const LOGIN_URL = 'http://localhost:8001/userLayout/login';

// 分页配置
export const PAGINATION = {
  showSizeChanger:true,
  showQuickJumper:true,
  defaultCurrent:1,
  total:0,
  pageSizeOptions:['36','50','100']
};

// 省份
export const provinceJson = [
  {
    "code": "110000",
    "name": "北京市",
  },
  {
    "code": "120000",
    "name": "天津市",
  },
  {
    "code": "130000",
    "name": "河北省",
  },
  {
    "code": "140000",
    "name": "山西省",
  },
  {
    "code": "150000",
    "name": "内蒙古自治区",
  },
  {
    "code": "210000",
    "name": "辽宁省",
  },
  {
    "code": "220000",
    "name": "吉林省",
  },
  {
    "code": "230000",
    "name": "黑龙江省",
  },
  {
    "code": "310000",
    "name": "上海市",
  },
  {
    "code": "320000",
    "name": "江苏省",
  },
  {
    "code": "330000",
    "name": "浙江省",
  },
  {
    "code": "340000",
    "name": "安徽省",
  },
  {
    "code": "350000",
    "name": "福建省",
  },
  {
    "code": "360000",
    "name": "江西省",
  },
  {
    "code": "370000",
    "name": "山东省",
  },
  {
    "code": "410000",
    "name": "河南省",
  },
  {
    "code": "420000",
    "name": "湖北省",
  },
  {
    "code": "430000",
    "name": "湖南省",
  },
  {
    "code": "440000",
    "name": "广东省",
  },
  {
    "code": "450000",
    "name": "广西壮族自治区",
  },
  {
    "code": "460000",
    "name": "海南省",
  },
  {
    "code": "500000",
    "name": "重庆市",
  },
  {
    "code": "510000",
    "name": "四川省",
  },
  {
    "code": "520000",
    "name": "贵州省",
  },
  {
    "code": "530000",
    "name": "云南省",
  },
  {
    "code": "540000",
    "name": "西藏自治区",
  },
  {
    "code": "610000",
    "name": "陕西省",
  },
  {
    "code": "620000",
    "name": "甘肃省",
  },
  {
    "code": "630000",
    "name": "青海省",
  },
  {
    "code": "640000",
    "name": "宁夏回族自治区",
  },
  {
    "code": "650000",
    "name": "新疆维吾尔自治区",
  },
  {
    "code": "710000",
    "name": "台湾省",
  },
  {
    "code": "810000",
    "name": "香港特别行政区",
  },
  {
    "code": "820000",
    "name": "澳门特别行政区",
  }
];

// 订单状态
export const ORDER_STATE = [
  { id: '1', name: '已支付' },
  { id: '2', name: '已冻结' },
];

// 学员身份
export const STUDENT_TYPE = [
  { id: '1', name: '新生' },
  { id: '2', name: '老生' },
];

// 准考证填写状态
export const TICKET_STATES = [
  { id: '1', name: '已填写' },
  { id: '2', name: '未填写' },
];

// 消息打开状态
export const MSG_STATES = [
  { id: '1', name: '所有消息打开状态' },
  { id: '2', name: '未推送' },
  { id: '3', name: '已推送（未读）' },
  { id: '4', name: '已推送（已读）' },
];


// 需要用于global filter 进行数据筛选的，必须加到default里
export default {
  ORDER_STATE,
  STUDENT_TYPE,
  TICKET_STATES,
  MSG_STATES,
  PAGINATION
};
