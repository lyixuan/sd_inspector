import { Base64 } from 'js-base64';
export function redirectUrlParams(history = {}) {
    // 未部署在根目录下的处理
    const url = window.location.href;
    const paramsStr = JSON.stringify({ url, type: 'inspector' });
    return Base64.encode(paramsStr);
}