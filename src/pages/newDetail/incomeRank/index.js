import React from 'react';
import { connect } from 'dva';
import TopTabs from '@/pages/indexPage/components/topTabs';
import CollegeIndex from './components/compare'
import FamilyIndex from './components/familyIndex'
import GroupIndex from './components/groupIndex';
import ClassIndex from './components/classIndex'
import styles from './style.less';

@connect(({ newDetailModal }) => ({
  globalUserType: newDetailModal.globalUserType
}))
class IncomeRank extends React.Component {
  componentDidMount() {
    // 家族-学院列表
    this.props.dispatch({
      type: 'incomeRankModal/getIncomeCollegeList',
    });
    
  }
  getTabParams = () => {
    const tabParams = [
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
      },
    ]
    const { globalUserType } = this.props;
    if (globalUserType === 'group' || globalUserType === 'class') {
      tabParams.push({
        name:'班主任对比',
        key:'4',
        children: <ClassIndex />,
      })
    }
    return tabParams
  }
  render() {
    return (
      <div className={styles.incomeRank}>
        <TopTabs tabParams={this.getTabParams()} />
      </div>
    );
  }
}

export default IncomeRank;
