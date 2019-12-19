import React from 'react';
import { connect } from 'dva';
import TopTabs from '@/pages/indexPage/components/topTabs';
import CollegeIndex from './components/compare'
import FamilyIndex from './components/familyIndex'
import GroupIndex from './components/groupIndex';
import ClassIndex from './components/classIndex'
import styles from './style.less';

@connect(({ newDetailModal }) => ({
  globalUserType: newDetailModal.globalUserType,
  globalDateRange: newDetailModal.globalDateRange
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
        name:<span data-trace={`{"widgetName":"创收_学院对比","traceName":"2.0/创收_学院排名"}`}>学院对比</span>,
        key:'1',
        children: <CollegeIndex />,
      },
      {
        name:<span data-trace={`{"widgetName":"创收_家族对比","traceName":"2.0/创收_家族对比"}`}>家族对比</span>,
        key:'2',
        children: <FamilyIndex />,
      },
      {
        name:<span data-trace={`{"widgetName":"创收_小组对比","traceName":"2.0/创收_小组对比"}`}>小组对比</span>,
        key:'3',
        children: <GroupIndex />,
      },
    ]
    const { globalUserType } = this.props;
    if (globalUserType === 'group' || globalUserType === 'class') {
      tabParams.push({
        name:<span data-trace={`{"widgetName":"创收_班主任对比","traceName":"2.0/创收_班主任对比"}`}>班主任对比</span>,
        key:'4',
        children: <ClassIndex />,
      })
    }
    return tabParams
  }
  render() {
    const { globalDateRange } = this.props;
    return (
      <>
       {
          globalDateRange && globalDateRange.startTime && <div className={styles.incomeRank}>
            <TopTabs tabParams={this.getTabParams()} />
          </div>
       }
      </>
    );
  }
}

export default IncomeRank;
