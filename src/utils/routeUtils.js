import { Base64 } from 'js-base64';
export function redirectUrlParams(history = {}) {
    const { location } = history;
    const { pathname } = location;
    // 未部署在根目录下的处理
    const host = window.location.origin;
    const paramsStr = JSON.stringify({ host, pathname, type: 'inspector' });
    return Base64.encode(paramsStr);
}