import React, { Component } from 'react';
import { connect } from 'dva';
import RenderRoute from '@/components/RenderRoute';
import homeImg from '@/assets/homeImg.png';
import homeText from '@/assets/homeText.png';
import {handleDataTrace} from '@/utils/utils';
import styles from './indexPage.less';

@connect(({ xdWorkModal }) => ({
  userInfo: xdWorkModal.userInfo,
}))
class IndexPage extends Component {
  componentDidMount() {
    this.setTrace();
    this.props.dispatch({
      type: 'xdWorkModal/getUserInfo',
    });
  }

  setTrace = () =>{
    const { location } = this.props;
    const { query} = location || {};
    if(query && query.source && query.source === 'email'){
      handleDataTrace({widgetName:"邮件埋点",traceName:"学员查询/学员档案/学习展开"});
    }
  };

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
    } else if (userType === 'family' && (userInfo.privilegeView || userInfo.moreView)) {

      if (this.props.history.location.pathname !== '/indexPage/xdFamilyBench') {
        this.props.history.push({
          pathname: '/indexPage/xdFamilyBench',
        }); //前端角色是家族长（family）角色 且 权限中勾选了 学分绩效 或 创收绩效 的用户显示页面
      }

    } else if ((userType === 'college' || userType === 'boss') && (userInfo.privilegeView || userInfo.moreView)) {//
      if (this.props.history.location.pathname !== '/indexPage/ManagementBench') {
        this.props.history.push({
          pathname: '/indexPage/ManagementBench',
        }); //前端角色是家族长（college）角色 且 权限中勾选了 学分绩效 或 创收绩效 的用户显示页面
      }

    } else {
      return <div className={styles.container}>
        < div className={styles.content}>
          <img src={homeImg} alt="首页" className={styles.homeImg}/>
          <div className={styles.userDescription}>
            <img src={homeText} alt="首页文字"/>
          </div>
        </div>
      </div>;
    }
  };

  render() {
    const { location } = this.props;
    const { query,pathname} = location || {};
    let flag = false;
    if(query && query.source && query.source === 'fullPath'){
      // 如果带有参数source='fullPath'，要跳转到具体路径，不进工作台
      if(pathname!=='/indexPage'){
        this.props.history.push({
          pathname,query
        });
      }
    } else {
      flag = this.getPageDom();
    }
    return (
      <>
        {flag ? flag : ''}
        <RenderRoute {...this.props} />
      </>
    );
  }
}

export default IndexPage;
