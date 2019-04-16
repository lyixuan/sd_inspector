import React from 'react';
import { connect } from 'dva';
import BITabs from '@/ant_components/BITabs';
import styles from './style.less';
import Study from './components/study';
import Im from './components/im';
import Bbs from './components/bbs';
import PrivateLetter from './components/privateLetter';
const TabPane = BITabs.TabPane;

class behaviorPath extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "study"
    }
  }


  onChange = (e) => {
    this.setState({ size: e.target.value });
  }
  render() {
    return (
      <div className={styles.behaviorPath}>
        <div className={styles.tabBox}>
          <BITabs onChange={this.onTabChange} type="card" animated={false}>
            <TabPane tab="学习" key="1">
              <Study></Study>
            </TabPane>
            <TabPane tab="IM" key="2">
              <Im></Im>
            </TabPane>
            <TabPane tab="BBS" key="3">
              <Bbs></Bbs>
            </TabPane>
            <TabPane tab="私信" key="4">
              <PrivateLetter></PrivateLetter>
            </TabPane>
          </BITabs>
        </div>
      </div>
    );
  }
}

export default behaviorPath;
