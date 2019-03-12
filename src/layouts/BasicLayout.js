import React from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import Media from 'react-media';
import { Base64 } from 'js-base64';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import SiderMenu from '@/components/SiderMenu';
import storage from '../utils/storage';
import { redirectUrlParams } from '../utils/routeUtils';
import { query } from './utils/query';
import logo from '@/assets/logo.png';

const { Content, Header } = Layout;
class BasicLayout extends React.Component {
  componentWillMount() {
    // 从url中拿取paramsId参数,包含userId,token,存储在local中
    this.getAuthToken();
    //判断缓存中是否有userId;
    this.checkoutHasAuth();
  }
  componentDidMount() {
    this.MenuData();
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
  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };
  MenuData = () => {
    const routeData = storage.getUserAuth() || [];
    this.props.dispatch({
      type: 'menu/getMenu',
      payload: { routeData },
    });
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = '小德';
    let currRouterData = null;
    // match params path
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key];
      }
    });
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - 小德`;
    }
    return title;
  }

  render() {
    const { isMobile, collapsed, menuData } = this.props;
    const navTheme = {
      navTheme: '#001529',
    }
    
    const layout = (
      <Layout>
        {isMobile ? null :
          <SiderMenu
            logo={logo}
            // theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
          />
        }

        <Layout>
          <Header style={{ padding: 0 }}></Header>
          <Content>{this.props.children}</Content>
        </Layout>
      </Layout>
    )
    return (
      <DocumentTitle title={'小德'}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    )
  }
}
export default connect(({ global, menu }) => ({
  collapsed: global.collapsed,
  menuData: menu.menuData,
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));

