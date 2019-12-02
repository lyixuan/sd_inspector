import React from 'react';
import { connect } from 'dva';
import storage from '../../../utils/storage';
import PageTab from '@/pages/indexPage/components/pageTab';
import PerformanceDetail from './performanceDetail';
import CurrentCredit from './currentCredit';
// import CreditRank from './creditRank';
import IncomeRank from './incomeRank';
import Negative from './appeal';
import Income from './income';
import styles from './style.less';

@connect(xdFamilyModal => ({
  xdFamilyModal,
}))
class XdFamily extends React.Component {
  constructor(props) {
    super(props);
    const userId = storage.getItem('admin_user').userId;
    this.state = {
      tabs: [
        {
          title: '学分分析',
          children: (
            <>
              <CurrentCredit />
              {/* <CreditRank /> */}
            </>
          ),
          dataTrace: '{"widgetName":"学分分析","traceName":"家族长工作台/学分分析"}',
        },
        {
          title: '创收分析',
          children: (
            <>
              <Income />
              <IncomeRank />
            </>
          ),
          dataTrace: '{"widgetName":"创收分析","traceName":"家族长工作台/创收分析"}',
        },
        {
          title: '负面分析',
          children: (
            <div className={styles.qualityAppel}>
              <>
                <Negative userId={userId}></Negative>
              </>
            </div>
          ),
          dataTrace: '{"widgetName":"负面分析","traceName":"家族长工作台/负面分析"}',
        },
      ],
    };
  }
  componentDidMount() {
    // 小组-绩效列表
    // this.props.dispatch({
    //   type: 'xdWorkModal/getKpiLevelList',
    // });
    // 家族-学院列表
    this.props.dispatch({
      type: 'xdWorkModal/getIncomeCollegeList',
    });
  }
  render() {
    const { tabs } = this.state;
    return (
      <div className={styles.familyBench}>
        <PerformanceDetail />
        <PageTab tabs={tabs} />
      </div>
    );
  }
}

export default XdFamily;
