/**
 * request 网络请求工具
 */
import { extend } from 'umi-request';
import { routerRedux } from 'dva/router';
import { SERVER_HOST,PROXY_PATH } from './constants';

import { notification } from 'antd';
import { redirectToLogin } from './routeUtils';
import storage from './storage';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;

  if (status === 401) {
    redirectToLogin();
    return
  } else if (status === 403) {
    routerRedux.push('/exception/403');
    return;
  } else if (status <= 504 && status >= 500) {
    routerRedux.push('/exception/500');
    return;
  } else if (status >= 404 && status < 422) {
    routerRedux.push('/exception/404');
    return;
  } else if (!status){
    notification.error({
      message: '服务器返回信息为空',
    });
    return
  }
  notification.error({
    message: `请求错误 ${status}: ${url}`,
    description: errortext,
  });
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  prefix: null,
  // headers: {
  //   // 'X-Requested-With':'XMLHttpRequest',
  //   authorization: storage.getToken(),
  // },
  credentials: 'include',
});
// 动态添加数据;
request.interceptors.request.use((url, options) => {
  options.headers = Object.assign({}, options.headers, { 'X-Requested-With':'XMLHttpRequest',authorization: storage.getToken() });
  const isOld = url.indexOf('apis')>-1;
  return {
    url:`${SERVER_HOST}${PROXY_PATH(isOld)}${url}`,
    options,
  };
});

export default request;
