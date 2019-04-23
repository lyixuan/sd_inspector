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
class behaviorPath extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "2",
      dateList: []
    }
  }

  componentDidMount() {
    this.getDateList(); // 获取日期列表
  }

  getDateList = () => {
    this.props.dispatch({
      type: 'behaviorPath/getDateList',
      payload: { stuId: 1767329 },
    });
  };

  onTabChange = (e) => {
    console.log(24)
  }

  render() {
    let dateList = this.props.behaviorPath.dateList
    this.state.dataList = this.props.behaviorPath.dateList
    return (
      <div className={styles.behaviorPath}>
        <div className={styles.tabBox}>
          <BITabs onChange={this.onTabChange} type="card" animated={false} defaultActiveKey={this.state.activeKey}>
            <TabPane tab="学习" key="1">
              <Study dateList={dateList}></Study>
            </TabPane>
            <TabPane tab="IM" key="2">
              <Im></Im>
            </TabPane>
            <TabPane tab="微信" key="3">
              <WeChart dateList={dateList}></WeChart>
            </TabPane>
            <TabPane tab="BBS" key="4">
              <Bbs dateList={dateList}></Bbs>
            </TabPane>
            <TabPane tab="私信" key="5">
              <PrivateLetter dateList={dateList}></PrivateLetter>
            </TabPane>
          </BITabs>
        </div>
        <div style={{ float: 'left' }}>
          <UserInfo></UserInfo>
        </div>
      </div>
    );
  }
}

export default behaviorPath;
