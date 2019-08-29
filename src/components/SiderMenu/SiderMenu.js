import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { Link } from 'dva/router';
import styles from './index.less';
import { urlToList } from '../_utils/pathTools';
import jiangzhang from '@/assets/menu/jiangzhang.svg';

const { Sider } = Layout;
const { SubMenu } = Menu;

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={jiangzhang} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
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
    keys.push({path:item.path, parentId: item.parentId});
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
      matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item.path.replace('/inspector', '')).test(path)).map((item2) => {
        return {...item2, path: item2.path.replace('/inspector', '')
      }
    })),
    []
  );

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.flatMenuKeys = getFlatMenuKeys(props.menuData);
    this.state = {
      menus: props.menuData,
      ...this.getDefaultCollapsedSubMenus(props),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        ...this.getDefaultCollapsedSubMenus(nextProps)
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
    const open = getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
    return {openMenu: open.length > 0 ? open[0].parentId : '', openKeys: open.map(item => item.path)}
  }

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    let itemPath = this.conversionPath(item.path);
    const { target, name } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          <span>{name}</span>
        </a>
      );
    }
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
  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
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
    console.log(this.flatMenuKeys)
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
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
    });
  };

  // 一级菜单
  getMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        const ItemDom = <li key={item.id} className={this.state.openMenu === item.id ? styles.active : ''} onClick={() => this.getOpenMenu(item.id)}>{getIcon(item.icon)}<span>{item.name}</span></li>;
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter(item => item);
  };
  // 当前选中一级菜单项
  getCurrentMenu = () => {
    const item = this.state.menus.find(item => item.id === this.state.openMenu);
    if (item && item.children) {
      return item.children
    }
    return null;
  }
  // 一级菜单点击
  getOpenMenu = (id) => {
    this.props.onCollapse(false);
    this.setState({ openMenu: id });
  }
  render() {
    const { logo, collapsed } = this.props;
    const { openKeys } = this.state;
    /*
     *  待优化
    * */
    // Don't show popup menu when it is been collapsed
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys().map(item => item.path);
    if (!selectedKeys.length && openKeys.length > 0) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    console.log(openKeys, selectedKeys)
    return (
      <div className={styles.menuPart}>
        <Sider
        trigger={null}
        collapsible
        // collapsed={collapsed}
        breakpoint="lg"
        // onCollapse={onCollapse}
        width={80}
        className={styles.sider}>
          <div className={styles.logo} key="logo">
            <Link to="/"><img src={logo} alt="logo" /></Link>
          </div>
          <ul className={styles.menuUl}>
            {
              this.getMenuItems(this.state.menus)
            }
          </ul>
        </Sider>
        {!collapsed && <Menu
          key="Menu"
          theme="light"
          mode="inline"
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
        >
          {
             this.getNavMenuItems(this.getCurrentMenu())
          }
        </Menu>}
      </div>  
    );
  }
}
