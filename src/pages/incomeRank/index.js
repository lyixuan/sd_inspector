import React from 'react';
import { connect } from 'dva';
import TopTabs from '@/pages/indexPage/components/topTabs';
import CollegeIndex from './components/compare'
import FamilyIndex from './components/familyIndex'
import GroupIndex from './components/groupIndex';
import styles from './style.less';

@connect(() => ({
}))
class IncomeRank extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabParams: [
        {
          name:'学院对比',
          key:'1',
          children: <CollegeIndex />,
        },
        {
          name:'家族对比',
          key:'2',
          children: <FamilyIndex />,
        },
        {
          name:'小组对比',
          key:'3',
          children: <GroupIndex />,
        }
      ]
    }
  }
  componentDidMount() {
    // 家族-学院列表
    this.props.dispatch({
      type: 'incomeRankModal/getIncomeCollegeList',
    });
  }
  render() {
    return (
      <div className={styles.incomeRank}>
        <TopTabs tabParams={this.state.tabParams} />
      </div>
    );
  }
}

export default IncomeRank;
