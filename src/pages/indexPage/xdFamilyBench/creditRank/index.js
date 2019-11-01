import React from 'react';
import { connect } from 'dva';
import TopTabs from '@/pages/indexPage/components/topTabs'
import FamilyIndex from './components/familyIndex'
import GroupIndex from './components/groupIndex';
import styles from './style.less';

@connect(() => ({
}))
class creditRank extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabParams: [
        {
          name:'家族学分对比',
          key:'1',
          children: <FamilyIndex/>,
        },{
          name:'小组学分对比',
          key:'2',
          children:  <GroupIndex/>,
        }
      ]
    }
  }
  render() {
    return (
      <div className={styles.creditRank}>
        <TopTabs tabParams={this.state.tabParams} />
      </div>
    )
  }
}

export default creditRank;
