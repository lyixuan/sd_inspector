import router from 'umi/router';
import storage from './storage';
import { redirectUrlParams } from './routeUtils';
import { LOGIN_URL } from './constants';

function authority(props) {
  const { path } = props.route;
  const authList = storage.getUserAuth() || [];
  let allow = false;
  for (let i = 0; i < authList.length; i++) {
    if (authList[i].resourceUrl === path) {
      allow = true;
      break;
    }
  }
  const redirectUrl = redirectUrlParams(props);
  console.log(redirectUrl);
  // if (allow) {
  return (<div>{props.children}</div>);
  // }

  // if (!allow && path === '/smartPlatform') {
  //   // inspector smartPlatform模块级别没有权限，跳转登录
  // const redirectUrl = redirectUrlParams(props);

  //   window.location.href = `${LOGIN_URL}?redirectUrl=${redirectUrl}`;
  // } else {
  //   // 模块下的其他页面没有权限
  //   router.push('/exception/403')
  // }
}

export default authority;
