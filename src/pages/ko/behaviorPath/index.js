import React from 'react';
import { connect } from 'dva';
import BITabs from '@/ant_components/BITabs';
import styles from './style.less';
import Study from './components/study';
import Im from './components/im';
import Bbs from './components/bbs';
import WeChart from './components/weChart';
import UserInfo from './components/userInfo';
import PrivateLetter from './components/privateLetter';
const TabPane = BITabs.TabPane;

@connect(({ behaviorPath }) => ({
  behaviorPath
}))

class BehaviorPath1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "study"
    }
  }

  componentDidMount() {
    this.getDateList(); // 获取日期列表
  }

  getDateList = () => {
    let stuId = JSON.parse(localStorage.getItem("pathParams")).record.userId
    this.props.dispatch({
      type: 'behaviorPath/getDateList',
      payload: { stuId: stuId },
    });
  };

  onTabChange = (e) => {
    console.log(24)
  }

  render() {
    if (this.props.location.params) {
      localStorage.setItem("pathParams", JSON.stringify(this.props.location.params))
    }
    const pathParams = JSON.parse(localStorage.getItem("pathParams"))
    const target = pathParams.target
    const locationParams = pathParams.record
    if (target.indexOf("im") == 0) {
      this.state.activeKey = "im"
    } else if (target.indexOf("bbs") == 0) {
      this.state.activeKey = "bbs"
    } else if (target.indexOf("wechat") == 0) {
      this.state.activeKey = "wechat"
    } else if (target.indexOf("study") == 0) {
      this.state.activeKey = "study"
    }

    return (
      <div className={styles.behaviorPath}>
        <div className={styles.headBar}>用户行为轨迹</div>
        <div className={styles.tabBox}>
          <BITabs onChange={this.onTabChange} type="card" animated={false} defaultActiveKey={this.state.activeKey}>
            <TabPane tab="学习" key="study">
              <Study stuId={locationParams.userId}></Study>
            </TabPane>
            <TabPane tab="IM" key="im">
              <Im stuId={locationParams.userId}></Im>
            </TabPane>
            <TabPane tab="微信" key="wechat">
              <WeChart stuId={locationParams.userId}></WeChart>
            </TabPane>
            <TabPane tab="BBS" key="bbs">
              <Bbs stuId={locationParams.userId}></Bbs>
            </TabPane>
            <TabPane tab="私信" key="5">
              <PrivateLetter stuId={locationParams.userId}></PrivateLetter>
            </TabPane>
          </BITabs>
        </div>
        <div style={{ float: 'left' }}>
          <UserInfo info={locationParams}></UserInfo>
        </div>
      </div>
    );
  }
}

export default BehaviorPath1;
