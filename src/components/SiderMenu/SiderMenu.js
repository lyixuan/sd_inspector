import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { Link } from 'dva/router';
import styles from './index.less';
import { urlToList } from '../_utils/pathTools';
import { getOldSysPath } from '@/utils/routeUtils';

const { Sider } = Layout;
const { SubMenu } = Menu;

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menu
 */
export const getFlatMenuKeys = menu =>
  menu.reduce((keys, item) => {
    keys.push(item.path);
    if (item.children) {
      return keys.concat(getFlatMenuKeys(item.children));
    }
    return keys;
  }, []);

/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys, paths) =>
  paths.reduce(
    (matchKeys, path) =>
      matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item.replace('/inspector','')).test(path)).map((item2)=>item2.replace('/inspector',''))),
    []
  );

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.flatMenuKeys = getFlatMenuKeys(props.menuData);
    this.state = {
      menus: props.menuData,
      openKeys: this.getDefaultCollapsedSubMenus(props),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(1234,nextProps);
    console.log(1234,this.props.location.pathname);
    if (nextProps.location.pathname !== this.props.location.pathname) {
      console.log(this.getDefaultCollapsedSubMenus(nextProps));
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextProps),
      });
    }
    if (JSON.stringify(nextProps.menuData) !== JSON.stringify(this.props.menuData)) {
      this.flatMenuKeys = getFlatMenuKeys(nextProps.menuData);
      this.setState({
        menus: nextProps.menuData,
      });
    }
  }

  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus(props) {
    const { location: { pathname } } = props || this.props;
    console.log(pathname);
    console.log(urlToList(pathname));
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
  }

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    let itemPath = this.conversionPath(item.path);
    itemPath = this.removeInspector(itemPath);
    const icon = getIcon(item.icon);
    const { target, name } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    console.log(this.props.location.pathname);
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === this.props.location.pathname}
        onClick={
          this.props.isMobile
            ? () => {
              this.props.onCollapse(true);
            }
            : undefined
        }
      >
        <span>{name}</span>
      </Link>
    );
  };
  removeInspector = (itemPath) =>{
    return itemPath.replace('/inspector','')
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    item.path = this.removeInspector(item.path);
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      // 当无子菜单时就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                  item.name
                )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
    }
  };
  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item);
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter(item => item);
  };
  // Get the currently selected menu
  getSelectedMenuKeys = () => {
    const { location: { pathname } } = this.props;
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
  };
  // conversion Path
  // 转化路径
  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
  };
  // permission to check
  checkPermissionItem = (authority, ItemDom) => {
    if (this.props.Authorized && this.props.Authorized.check) {
      const { check } = this.props.Authorized;
      return check(authority, ItemDom);
    }
    return ItemDom;
  };
  isMainMenu = key => {
    return this.state.menus.some(item => key && (item.key === key || item.path === key));
  };
  handleOpenChange = openKeys => {
    console.log(44,openKeys);
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
    });
  };

  render() {
    const { logo, collapsed, onCollapse } = this.props;
    const { openKeys } = this.state;
    console.log(123,openKeys);
    /*
     *  待优化
    * */
    // Don't show popup menu when it is been collapsed
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys();
    console.log(333,selectedKeys);
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={210}
        className={styles.sider}
      >
        <div className={styles.logo} key="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>小德</h1>
          </Link>
        </div>
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
          style={{ padding: '16px 0', width: '100%' }}
        >
          {this.getNavMenuItems(this.state.menus)}
        </Menu>
      </Sider>
    );
  }
}
