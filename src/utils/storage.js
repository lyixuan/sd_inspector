import { ADMIN_AUTH, ADMIN_USER, DOMAIN_HOST } from './constants';
import Cookies from 'js-cookie';


const storage = {
  getItem(key) {
    return JSON.parse(localStorage.getItem(key))
  },
  setItem(key, value) {

    return localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
  /*
  * 获取token
  * */
  getToken() {
    const info = this.getItem(ADMIN_USER);
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
    // 优先从督学模块拿取cookie参数,其次再去local中去取
    const userInfo = Cookies.get(ADMIN_USER);
    return userInfo ? userInfo : this.getItem(ADMIN_USER);
  },
  // 存储用户信息
  setUserInfo(token) {
    Cookies.set(ADMIN_USER, { ...token }, { domain: DOMAIN_HOST });
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
};
export default storage
