import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Dropdown, Avatar, Divider } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import styles from './index.less';
import bilogo from '../../assets/logo.png';
import { nullLiteral } from '@babel/types';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const {
      currentUser = {},
      collapsed,
      fetchingNotices,
      isMobile,
      logo,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      selectedGroup,
      certificationList
    } = this.props;
    const admin_user = localStorage.getItem('admin_user');
    const userType = JSON.parse(admin_user) ? JSON.parse(admin_user).userType : null;
    console.log(40, userType)
    // const url = 'http://test.xd.admin.ministudy.com'
    const url = 'http://bi-admin.ministudy.com'
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        {selectedGroup.map(item => (
          <Menu.Item key={item.id}>
            <span style={{ display: 'inline-block', width: '20px', marginLeft: '-3px' }}>
              <Icon type={item.icon} style={{ fontSize: 14, position: 'relative' }} />
            </span>
            {item.name}
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <div className={styles.header}>
        {isMobile && [
          <Link to="/" className={styles.logo} key="logo">
            <img src={bilogo} alt="logo" width="24" />
          </Link>,
          <Divider type="vertical" key="line" />,
        ]}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        {
          userType == 'class' ? <ul className={styles.certification}>
            {
              certificationList.map(item => {
                return (
                  <>
                    {
                      item.child.map(item2 => (
                        item2.obtained ? <li key={item2.id}><img src={`${url}${item2.obtainedIcon}`} /></li> : <li key={item2.id}><img src={`${url}${item2.originalIcon}`} /></li>
                      ))
                    }
                    <li key={item.grade + 1}><img src={item.imgUrl} className={styles.bigImg} /></li>
                  </>
                )
              })
            }
          </ul> : null
        }

        <div className={styles.right}>
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="large" className={styles.avatar} src={currentUser.avatar} />
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
              <Spin size="small" style={{ marginLeft: 8 }} />
            )}
        </div>
      </div>
    );
  }
}
