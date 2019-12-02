import React from 'react';
import { connect } from 'dva';
import TopTabs from '../components/topTabs'
import FamilyIndex from './components/familyIndex'
import GroupIndex from './components/groupIndex';
import styles from './style.less';

const TabPane = TopTabs.TabPane;
@connect(() => ({
}))
class creditRank extends React.Component {
  render() {
    return (
      <div className={styles.creditRank}>
        <TopTabs >
          <TabPane tab="家族学分对比" key="1"> <FamilyIndex dateRangeSelect={this.props.dateRangeSelect}/> </TabPane>
          <TabPane tab="小组学分对比" key="2"> <GroupIndex dateRangeSelect={this.props.dateRangeSelect}/> </TabPane>
        </TopTabs>
      </div>
    )
  }
}

export default creditRank;
