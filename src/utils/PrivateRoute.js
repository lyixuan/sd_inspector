import router from 'umi/router';
import storage from './storage';
import { redirectUrlParams } from './routeUtils';
import { LOGIN_URL } from './constants';
import config from '../../config/config';

const BASE = config.base || ''; // 设置的base的url

function authority(props) {
  const { path } = props.route;
  const authList = storage.getUserAuth() || [];
  let allow = false;
  for (let i = 0; i < authList.length; i++) {
    const authUrl = `${BASE}${path}`;
    if (authList[i].resourceUrl === authUrl) {
      allow = true;
      break;
    }
  }
  if (allow) {
    return <div>{props.children}</div>;
  }

  if (!allow && path === '/smartPlatform') {
    // inspector smartPlatform模块级别没有权限，跳转登录
    const redirectUrl = redirectUrlParams(props);

    window.location.href = `${LOGIN_URL}?redirectUrl=${redirectUrl}`;
  } else {
    // 模块下的其他页面没有权限
    router.push('/exception/403');
  }
}

export default authority;
