import { ADMIN_AUTH, ADMIN_USER } from './constants';

export default {
  /*
  * 获取用户信息
  * return object || null
  * */
  getUserInfo: () => JSON.parse(localStorage.getItem(ADMIN_USER)),
  // 存储用户信息
  setUserInfo(token) {
    localStorage.setItem(ADMIN_USER, JSON.stringify(token));
  },
  // 清除用户信息
  clearUserInfo() {
    localStorage.removeItem(ADMIN_USER);
  },

  /*
  * 获取用户权限
  * return object || null
  * */
  getUserAuth: () => JSON.parse(localStorage.getItem(ADMIN_AUTH)),
  // 存储用户权限
  setUserAuth(token) {
    localStorage.setItem(ADMIN_AUTH, JSON.stringify(token));
  },
  // 清除用户权限
  clearUserAuth() {
    localStorage.removeItem(ADMIN_AUTH);
  },
};
