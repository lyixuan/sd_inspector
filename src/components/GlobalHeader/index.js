import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Dropdown, Avatar, Divider } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import styles from './index.less';
import bilogo from '../../assets/new-logo.png';
import { STATIC_HOST } from '@/utils/constants';
import router from 'umi/router';
import BIInput from '@/ant_components/BIInput';
import { nullLiteral } from '@babel/types';
import { connect } from 'dva/index';
import searchIcon from '@/assets/newIndex/searchIcon.png';
import downloadImg from '@/assets/download.png';
import Score from '@/pages/indexPage/component2/Score';
import { handleDataTrace } from '@/utils/utils';

@connect(({global}) => ({
  tempLogo: global.tempLogo
}))
class GlobalHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
    };
  }
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
  goToIndex = () => {
    router.push('/indexPage');
  };
  onFormChange = (value) => {
    this.setState({
      userId: value,
    });
  };
  getUserInfo = () => {
    handleDataTrace({"widgetName":`导航搜索学员档案`,"traceName":`首页/导航搜索进入学员档案`});
    this.props.dispatch({
      type: 'global/getBasicInfo',
      payload: { params: { stuId: this.state.userId } },
    });
  };
  goToDownload = () => {
    router.push(`/downloadCenter?_=${Math.random()}`)
  };

  render() {
    const {
      currentUser = {},
      isMobile,
      onMenuClick,
      selectedGroup,
      tempLogo } = this.props;
    const admin_user = localStorage.getItem('admin_user');
    const userType = JSON.parse(admin_user) ? JSON.parse(admin_user).userType : null;
    const url = STATIC_HOST
    // const url = 'http://bi-admin.ministudy.com'
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item className={styles.userName}>
          <span>{currentUser.name}</span>
        </Menu.Item>
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

        <img
          src={tempLogo ? tempLogo : bilogo}
          alt="logo"
          className={styles.newLogo}
          onClick={this.goToIndex}/>

        <div className={styles.right}>
          <span className="searchBox">
          <BIInput
            placeholder="学员档案 (输入学员ID)"
            style={{width:170}}
            value={this.state.userId}
            onPressEnter={this.getUserInfo}
            onChange={e => this.onFormChange(e.target.value)}
          />
            <img src={searchIcon}  width={16} alt="" onClick={this.getUserInfo}/>
        </span>
          <span className={styles.download} onClick={this.goToDownload}>
            <img src={downloadImg} alt="" className={styles.image}/>
          </span>
          {currentUser.name ? (
            <Dropdown overlay={menu} placement="bottomRight">
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="large" className={styles.avatar} src={currentUser.avatar} />
                {/*<span className={styles.name}>{currentUser.name}</span>*/}
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
export default GlobalHeader;
