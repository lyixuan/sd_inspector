import { ADMIN_AUTH, ADMIN_USER, DOMAIN_HOST } from './constants';
import Cookies from 'js-cookie';

const storage = {
  getItem(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  setItem(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },

  getSessionItem(key) {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  setSessonItem(key, value) {
    return sessionStorage.setItem(key, JSON.stringify(value));
  },
  removeSessonItem(key) {
    sessionStorage.removeItem(key);
  },
  /*
  * 获取token
  * */
  getToken() {
    const info = this.getUserInfo();
    let userId = '';
    let token = '';
    if (info) {
      userId = info.userId;
      token = info.token;
    }
    return `${userId}_${token}`;
  },
  /*
  * 获取用户信息
  * return object || null
  * */
  getUserInfo() {
    return this.getItem(ADMIN_USER);
  },
  // 存储用户信息
  setUserInfo(token) {
    Cookies.set(ADMIN_USER, { ...token }, { expires: 365, domain: DOMAIN_HOST });
    this.setItem(ADMIN_USER, token);
  },
  // 清除用户信息
  clearUserInfo() {
    this.removeItem(ADMIN_USER);
  },

  /*
  * 获取用户权限
  * return object || null
  * */
  getUserAuth() {
    return this.getItem(ADMIN_AUTH)
  },

  // 存储用户权限
  setUserAuth(token) {
    this.setItem(ADMIN_AUTH, token);
  },
  // 清除用户权限
  clearUserAuth() {
    this.removeItem(ADMIN_AUTH);
  },
  isRepeatLogin() {
    const userInfo = this.getUserInfo() || {};
    const userInfo_localStorage = this.getItem(ADMIN_USER) || {};
    if (userInfo) {
      return (
        userInfo.userId !== userInfo_localStorage.userId ||
        userInfo.token !== userInfo_localStorage.token
      );
    } else return false;
  }
};
export default storage
