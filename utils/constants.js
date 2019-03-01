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
  MSG_STATES
};
