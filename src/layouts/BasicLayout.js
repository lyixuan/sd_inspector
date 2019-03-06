import React from 'react';
import { Base64 } from 'js-base64';
import storage from '../utils/storage';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import LocaleProvider from 'antd/lib/locale-provider';
import { redirectUrlParams } from '../utils/routeUtils';

class BasicLayout extends React.Component {
  componentWillMount() {
    // 从url中拿取paramsId参数,包含userId,token,存储在local中
    this.getAuthToken();
    //判断缓存中是否有userId;
    this.checkoutHasAuth();
  }
  getAuthToken = () => {
    const { location: { query = {} } } = this.props;
    const paramsId = query.paramsId || '';
    let paramsObj = {}
    if (paramsId) {
      try {
        paramsObj = paramsId ? JSON.parse(Base64.decode(paramsId)) : {};
        storage.setUserInfo(paramsObj);
      } catch (e) {
        console.log(e);
      }
    }
  }
  checkoutHasAuth = () => {
    const userInfo = storage.getUserInfo();
    if (!userInfo) {
      redirectUrlParams();
    }
  }
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <>
          {this.props.children}
        </>
      </LocaleProvider>
    )
  }
}

export default BasicLayout;
