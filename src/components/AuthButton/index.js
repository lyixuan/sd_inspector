import React from 'react';
import storage from '@/utils/storage';
import config from '../../../config/config';

function checkPathname(authority) {
  const list = storage.getUserAuth();
  const base = config.base.replace(/\//g, '');
  const menuKey = list.find(item => item.resourceUrl === `/${base}${authority}`);

  if (menuKey) {
    return true;
  } else return false;
}

/*
* 控制按钮权限
* 权限配置同菜单
* */
class Index extends React.Component {

  render() {
    return !checkPathname(this.props.authority) ? null : { ...this.props.children };
  }
}

export default Index;
Index.checkPathname = checkPathname;
