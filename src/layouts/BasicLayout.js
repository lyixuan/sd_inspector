import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Spin } from 'antd';
import router from 'umi/router';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import Footer from './Footer';
import ContentLayout from '@/layouts/ContentLayout';
import SiderMenu from '../components/SiderMenu';
import biIcon from '../assets/biIcon.png';
import logo from '../assets/menu/logo.png';
import storage from '../utils/storage';
import HeaderLayout from './Header';
import { query } from './utils/query';
import { checkoutLogin } from '@/utils/checkoutUserAuthInfo';
import { redirectUrlParams, checkPathname } from '../utils/routeUtils';
import Authorized from '../utils/Authorized';

// import router from 'umi/router';
const { Content, Header } = Layout;
/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = item => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `${item.path}`,
        to: `${item.children[0].path}`,
      });
      item.children.forEach(children => {
        getRedirect(children);
      });
    }
  }
};

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */
const getBreadcrumbNameMap = (menuData, routerData = {}) => {
  const result = {};
  const childResult = {};
  for (const i of menuData) {
    if (!routerData[i.path]) {
      result[i.path] = i;
    }
    if (i.children) {
      Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
    }
  }
  return Object.assign({}, routerData, result, childResult);
};

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

const routesData = {};

class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.routerFlat(props.route.routes);
  }

  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  };
  state = {
    isMobile,
  };


  routerFlat = (routes) => {
    const that = this;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].path) {
        routesData[routes[i].path] = { name: routes[i].name, bread: routes[i].bread };
        if (routes[i].routes) {
          that.routerFlat(routes[i].routes);
        }
      }
    }
  };

  getChildContext() {
    const { location, routerData, menuData } = this.props;
    return {
      location,
      breadcrumbNameMap: getBreadcrumbNameMap(menuData, routerData),
    };
  }

  componentWillMount() {
    if (!checkoutLogin()) {
      this.initSysItem();
    } else {

    }
  }

  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: mobile,
      });
    });
    this.MenuData();
    this.setRedirectData(this.props.menuData);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.menuData) !== JSON.stringify(this.props.menuData)) {
      this.setRedirectData(nextProps.menuData);
    }
    const {pathname} = nextProps.location||{};
    const num = pathname.indexOf('/fromEmail')>0?pathname.indexOf('/fromEmail'):1000;
    console.log(33333,num)
    if(num!==1000){
      router.push({
        pathname: pathname.substring(0,num)
      });
    }
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }


  // checkoutHasAuth = () => {
  //   // debugger环境下使用url跳转传参
  //   if (process.env.LOGIN_TYPE === 'localhost') {
  //     this.getAuthToken();
  //   }
  //   const userInfo = storage.getUserInfo();
  //   // 判断是有有用户信息;
  //   if (!userInfo) {
  //     redirectUrlParams();
  //   } else {
  //     this.loginInSysItem();
  //   }
  // }
  // getAuthToken = () => {
  //   const { location: { query = {} } } = this.props;
  //   const paramsId = query.paramsId || '';
  //   let paramsObj = {}
  //
  //   if (paramsId) {
  //     try {
  //       paramsObj = paramsId ? JSON.parse(Base64.decode(paramsId)) : {};
  //       storage.setUserInfo(paramsObj);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // }
  setRedirectData = menuData => {
    menuData.forEach(getRedirect);
  };

  getPageTitle() {
    const { location } = this.props;
    const { pathname } = location;
    let title = '小德';
    let currRouterData = null;
    // match params path
    Object.keys(routesData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routesData[key];
      }
    });
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - 小德`;
    }
    return title;
  }

  handleUserInfo = () => {
    const { userName = '小德', userId } = storage.getItem('admin_user') || {};
    return { name: userName, userId };
  };
  handleMenuCollapse = collapsed => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };
  handleNoticeVisibleChange = visible => {
    if (visible) {
      this.props.dispatch({
        type: 'global/fetchNotices',
      });
    }
  };
  initSysItem = () => {
    const that = this;
    this.props.dispatch({
      type: 'login/initSubSystem',
      payload: {},
    }).then(() => {
      that.MenuData();
    });
  };

  MenuData = () => {
    const routeData = storage.getItem('admin_auth') || {};
    this.props.dispatch({
      type: 'menu/getMenu',
      payload: { routeData },
    });
  };

  gobalMarkClass() {// 质检标注的几个页面布局 需要改变一下头部的样式
    const tabGroup = ['/setting/performance/list', '/qualityMarking/im', '/qualityMarking/bbs', '/qualityMarking/nps', '/entrancePlatform/statistics', '/ko/behaviorPath'];
    return tabGroup.includes(this.props.location.pathname) ? 'aiWorktable-ant-layout-content' : '';
  }

  render() {
    const { collapsed, fetchingNotices, notices, location, children, isLoginIng } = this.props;
    const { menuData } = this.props;
    const currentUser = this.handleUserInfo();
    currentUser.avatar = biIcon;
    const layout = (
      <>
        <Layout>
          <SiderMenu
            logo={logo}
            menuData={menuData}
            collapsed={collapsed}
            location={location}
            isMobile={this.state.isMobile}
            onCollapse={this.handleMenuCollapse}
            onClick={({ item, key, keyPath }) => {
              console.log(item, key);
              window.location.href = 'www.baidu.com';
            }}
          />
          <Layout style={{ backgroundColor: '#F5F8FA' }}>
            <HeaderLayout
              {...this.props}
              logo={biIcon}
              currentUser={currentUser}
              fetchingNotices={fetchingNotices}
              notices={notices}
              collapsed={collapsed}
              isMobile={this.state.isMobile}
              onCollapse={this.handleMenuCollapse}
              onNoticeVisibleChange={this.handleNoticeVisibleChange}
            />
            <Content className={this.gobalMarkClass()}>
              <ContentLayout {...this.props} routesData={routesData}>
                <Authorized
                  authority={checkPathname.bind(null, location.patchname)}
                >
                  {children}
                </Authorized>
              </ContentLayout>
            </Content>
          </Layout>
        </Layout>
        <Footer />
      </>
    );

    return (
      <LocaleProvider locale={zhCN}>
        <DocumentTitle title={this.getPageTitle()}>
          <ContainerQuery query={query}>
            {params => <div className={classNames(params)}>{layout}</div>}
          </ContainerQuery>
        </DocumentTitle>
      </LocaleProvider>
    );
  }
}

export default connect(({ global, menu, login }) => ({
  currentUser: login.currentUser,
  login: login,
  menuData: menu.menuData,
  collapsed: global.collapsed,
}))(BasicLayout);
