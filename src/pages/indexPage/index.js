import React, { Component } from 'react';
import styles from './indexPage.less';
import homeImg from '@/assets/homeImg.png';
import homeText from '@/assets/homeText.png';
import XdWorkbench from './xdWorkbench'
import { connect } from 'dva';
import XdFamilyBench from './xdFamilyBench'
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {}
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'xdWorkModal/getUserInfo',
      payload: { params: {} },
      callback: (data) => {
        this.setState({
          userInfo: data
        })
      }
    });
  }
  getPageDom = () => {
    const admin_user = localStorage.getItem('admin_user');
    const userType = JSON.parse(admin_user) ? JSON.parse(admin_user).userType : null;
    const { userInfo } = this.state;
    if (userType === 'class' || userType === 'group') {
      return <XdWorkbench />
    } else if (userType === 'family' && userInfo.privilegeView && userInfo.moreView) {
      return <XdFamilyBench /> //前端角色是家族长（family）角色 且 权限中勾选了 学分绩效 或 创收绩效 的用户显示页面
    }
    return false
  }
  render() {
    const flag = this.getPageDom();
    return (
      <>
        {flag ? flag : <div className={styles.container}>
          < div className={styles.content}>
            <img src={homeImg} alt="首页" className={styles.homeImg} />
            <div className={styles.userDescription}>
              <img src={homeText} alt="首页文字" />
            </div>
          </div>
        </div>}
      </>
    );
  }
}

export default IndexPage;
