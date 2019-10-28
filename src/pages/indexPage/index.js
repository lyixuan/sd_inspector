import React, { Component } from 'react';
import { connect } from 'dva';
import RenderRoute from '@/components/RenderRoute';
import homeImg from '@/assets/homeImg.png';
import homeText from '@/assets/homeText.png';
import styles from './indexPage.less';

@connect(({ xdWorkModal }) => ({
  userInfo: xdWorkModal.userInfo,
}))
class IndexPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'xdWorkModal/getUserInfo',
    });
  }
  getPageDom = () => {
    const admin_user = localStorage.getItem('admin_user');
    const userType = JSON.parse(admin_user) ? JSON.parse(admin_user).userType : null;
    const { userInfo } = this.props;
    if (userType === 'class' || userType === 'group') {
      if (this.props.history.location.pathname !== '/indexPage/xdWorkbench') {
        this.props.history.push({
          pathname: '/indexPage/xdWorkbench',
        });
      }  
    } else if (userType === 'family' && userInfo.privilegeView && userInfo.moreView) {
      if (this.props.history.location.pathname !== '/indexPage/xdFamilyBench') {
        this.props.history.push({
          pathname: '/indexPage/xdFamilyBench',
        }); //前端角色是家族长（family）角色 且 权限中勾选了 学分绩效 或 创收绩效 的用户显示页面
      }
    } else {
      return <div className={styles.container}>
              < div className={styles.content}>
                <img src={homeImg} alt="首页" className={styles.homeImg} />
                <div className={styles.userDescription}>
                  <img src={homeText} alt="首页文字" />
                </div>
              </div>
            </div>
    }
  }
  render() {
    const flag = this.getPageDom();
    return (
      <>
        {flag ? flag : ''}
        <RenderRoute {...this.props} />
      </>
    );
  }
}

export default IndexPage;
