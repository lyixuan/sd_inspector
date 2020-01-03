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
import biIcon from '../assets/touxiang.png';
import logo from '../assets/menu/logo.png';
import storage from '../utils/storage';
import { getBowerInfo } from '../utils/utils';
import HeaderLayout from './Header';
import { query } from './utils/query';
import { checkoutLogin } from '@/utils/checkoutUserAuthInfo';
import { redirectUrlParams, redirectToLogin, checkPathname } from '../utils/routeUtils';
import Authorized from '../utils/Authorized';
import style from './styles/basic.less';
import ThingsFall from '@/utils/thingsFall';
import cookie from '@/utils/cookie';

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

  routerFlat = routes => {
    const that = this;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].path) {
        routesData[routes[i].path] = { name: routes[i].name, bread: routes[i].bread, title: routes[i].title };
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
      this.setBrowserInfo();
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
    this.props.dispatch({
      type: 'global/getThemeInfo'
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.menuData) !== JSON.stringify(this.props.menuData)) {
      this.setRedirectData(nextProps.menuData);
    }
    if (checkoutLogin()) {
      // alert(1);
      const { pathname } = nextProps.location || {};
      const num = pathname.indexOf('/fromEmail') > 0 ? pathname.indexOf('/fromEmail') : 1000;
      if (num !== 1000) {
        router.push({
          pathname: pathname.substring(0, num),
        });
      }
    } else {
      // redirectToLogin()
    }
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

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
    if (currRouterData && currRouterData.title) {
      title = `${currRouterData.title} - 小德`;
    }

    // 有iframe标签页面的title特殊处理
    if (pathname.indexOf('/allReport/koDaily') !== -1) {
      title = 'KO日报 - 小德'
    }
    if (pathname.indexOf('/allReport/qualityReport') !== -1) {
      title = '质检报表 - 小德'
    }
    if (pathname.indexOf('/allReport/examReadOnly') !== -1) {
      title = '报考信息系统 - 小德'
    }
    if (pathname.indexOf('/allReport/freeStudy') !== -1) {
      title = '运营数据 - 小德'
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
    this.props
      .dispatch({
        type: 'login/initSubSystem',
        payload: {},
      })
      .then(() => {
        that.MenuData();
      });
  };

  setBrowserInfo = () => {
    const obj = getBowerInfo();
    if (!obj) {
      return;
    }
    this.props.dispatch({
      type: 'login/setBrowserInfo',
      payload: { ...obj },
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
    const tabGroup = [
      '/cubePlan/list',
      '/setting/performance/list',
      '/qualityMarking/im',
      '/qualityMarking/bbs',
      '/qualityMarking/nps',
      '/entrancePlatform/statistics',
      '/ko/behaviorPath',
      '/hotQuestion/index'];
    return tabGroup.includes(this.props.location.pathname) ? 'aiWorktable-ant-layout-content' : '';
  }

  render() {

    const {
      collapsed,
      fetchingNotices,
      notices,
      location,
      children,
      menuData,
      isLoginIng,
      layoutBackgroundColor,
      layoutImage,
      pmsdkImage,
      animation } = this.props;

    // 动态设置全屏动效
    if (animation && animation.image) {
      if (!this.thingsFall) {
        this.thingsFall = new ThingsFall({
          image: animation.image,
          continueTime: animation.continueTime,
          minRadius: animation.minRadius,
          maxRadius: animation.maxRadius
        });
      } else {}
    }

    // 动态设置layout的背景色和背景图
    let wrapStyle = {
      backgroundColor: layoutBackgroundColor,
    };
    if (layoutImage !== '') {
      wrapStyle.backgroundImage = `url("${layoutImage}")`
    }

    // 动态设置小德反馈入口的图片
    if (pmsdkImage) {
      let pmDom = document.getElementsByClassName('seven_entry_mini')[0];
      pmDom.src = pmsdkImage;
    }

    const currentUser = this.handleUserInfo();
    currentUser.avatar = biIcon;
    const layout = (
      <>
        <Layout className={style.outerLayout} style={wrapStyle}>

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

          <Layout className={style.contentLayout}>

            <SiderMenu
              logo={logo}
              menuData={menuData}
              collapsed={collapsed}
              location={location}
              isMobile={this.state.isMobile}
              onCollapse={this.handleMenuCollapse}
              onClick={({ item, key, keyPath }) => {
                window.location.href = 'www.baidu.com';
              }} />

            <Content className={`${this.gobalMarkClass()} ${style.content}`}>
              <ContentLayout {...this.props} routesData={routesData}>
                <Authorized authority={checkPathname.bind(null, location.patchname)}>
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
  layoutBackgroundColor: global.layoutBackgroundColor,
  layoutImage: global.layoutImage,
  pmsdkImage: global.pmsdkImage,
  animation: global.animation
}))(BasicLayout);
