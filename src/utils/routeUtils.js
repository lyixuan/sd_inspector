import { Base64 } from 'js-base64';
import pathToRegexp from 'path-to-regexp';
import { stringify } from 'qs';
import { LOGIN_URL } from './constants';

import storage from './storage';

export function redirectUrlParams(history = {}) {
    // 未部署在根目录下的处理,登录成功后跳转至首页
    const { origin } = window.location;
    const url = `${origin}/inspector/indexPage`;
    const paramsStr = Base64.encode(JSON.stringify({ url, type: 'inspector', env: process.env.LOGIN_TYPE }));
    window.location.href = `${LOGIN_URL}/userLayout/login?redirectUrl=${paramsStr}`;
}
export function redirectOldSysHosts(pathname, params = {}) {
    const url = `${LOGIN_URL}${pathname}?${stringify(params)}`
    window.location.href = url;
}
export function getOldSysPath(pathname, params = {}) {
    return `${LOGIN_URL}${pathname}?${stringify(params)}`
}
export function checkPathname(path = '') {
    const data1 = storage.getUserAuth() || [];
    const pathRegexp = pathToRegexp(path);
    const menuKey = data1.find(key => pathRegexp.test(`${key.resourceUrl}`));
    if (menuKey) {
        return true;
    } else return false;
}

