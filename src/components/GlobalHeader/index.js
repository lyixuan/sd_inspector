import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Dropdown, Avatar, Divider } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import styles from './index.less';
import bilogo from '../../assets/logo.png';
import c from '../../assets/workBench/c.png';
import b from '../../assets/workBench/b.png';
import a from '../../assets/workBench/a.png';
import s from '../../assets/workBench/s.png';
import cGray from '../../assets/workBench/c2.png';
import bGray from '../../assets/workBench/b2.png';
import aGray from '../../assets/workBench/a2.png';
import sGray from '../../assets/workBench/s2.png';
import bIcon1 from '../../assets/workBench/b-icon1.png';
import bIcon2 from '../../assets/workBench/b-icon2.png';
import bIcon3 from '../../assets/workBench/b-icon3.png';
import bIcon1Gray from '../../assets/workBench/b-icon1-gray.png';
import bIcon2Gray from '../../assets/workBench/b-icon2-gray.png';
import bIcon3Gray from '../../assets/workBench/b-icon3-gray.png';

import aIcon1 from '../../assets/workBench/a-icon1.png';
import aIcon2 from '../../assets/workBench/a-icon2.png';
import aIcon3 from '../../assets/workBench/a-icon3.png';
import aIcon4 from '../../assets/workBench/a-icon4.png';
import aIcon1Gray from '../../assets/workBench/a-icon1-gray.png';
import aIcon2Gray from '../../assets/workBench/a-icon2-gray.png';
import aIcon3Gray from '../../assets/workBench/a-icon3-gray.png';
import aIcon4Gray from '../../assets/workBench/a-icon4-gray.png';

import sIcon1 from '../../assets/workBench/s-icon1.png';
import sIcon2 from '../../assets/workBench/s-icon2.png';
import sIcon3 from '../../assets/workBench/s-icon3.png';
import sIcon1Gray from '../../assets/workBench/s-icon1-gray.png';
import sIcon2Gray from '../../assets/workBench/s-icon2-gray.png';
import sIcon3Gray from '../../assets/workBench/s-icon3-gray.png';
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
        <ul className={styles.certification}>
          {
            certificationList.map(item => {
              return (
                <>
                  {
                    item.child.map(item2 => (
                      item2.obtained ? <li key={item2.id}><img src={item2.obtainedIcon} className={styles.gradeImg} /></li> : <li key={item2.id}><img src={item2.originalIcon} /></li>
                    ))
                  }
                  <li key={item.id}><img src={item.imgUrl} className={styles.bigImg} /></li>
                </>
              )
            })
          }
        </ul>
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
