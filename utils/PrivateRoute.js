import router from 'umi/router';
import storage from './storage';
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

  // if (allow) {
    return (<div>{props.children}</div>);
  // }

  // if (!allow && path === '/m1') {
  //   // inspector m1模块级别没有权限，跳转登录
  //   window.location.href = `${LOGIN_URL}?redirectUrl=${window.location.href}`;
  // } else {
  //   // 模块下的其他页面没有权限
  //   router.push('/exception/403')
  // }
}

export default authority;
