import { Base64 } from 'js-base64';
import { LOGIN_URL } from './constants';
export function redirectUrlParams(history = {}) {
    // 未部署在根目录下的处理
    const url = window.location.href;
    const paramsStr = Base64.encode(JSON.stringify({ url, type: 'inspector' }));
    window.location.href = `${LOGIN_URL}?redirectUrl=${paramsStr}`;
}