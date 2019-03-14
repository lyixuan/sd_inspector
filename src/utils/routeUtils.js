import { Base64 } from 'js-base64';
import { LOGIN_URL } from './constants';
import { stringify } from 'qs';
export function redirectUrlParams(history = {}) {
    // 未部署在根目录下的处理
    const url = window.location.href;
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