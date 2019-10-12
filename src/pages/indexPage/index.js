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
      userInfo:{}
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
        localStorage.setItem('userInfo',JSON.stringify(data))
      }
    });
  }
  getPageDom = () => {
    const admin_user = localStorage.getItem('admin_user');
    const userType = JSON.parse(admin_user) ? JSON.parse(admin_user).userType : null;
    if (userType === 'class' || userType === 'group') {
      return <XdWorkbench />
    } else if (userType === 'family') {
      return <XdFamilyBench />
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
