import React from 'react';
import { connect } from 'dva';
import storage from '../../../utils/storage';
import PageTab from '@/pages/indexPage/components/pageTab';
import Histogram from '@/pages/indexPage/components/scoreContrast';
import PerformanceDetail from './performanceDetail';
import CurrentCredit from './currentCredit';
// import CreditRank from './creditRank';
// import IncomeRank from './incomeRank';
import Top from './Top';
import Negative from './appeal';
import Income from './income';
import styles from './style.less';

@connect(({ xdFamilyModal }) => ({
  familyKpiTimes: xdFamilyModal.familyKpiTimes || {}
}))
class XdFamily extends React.Component {
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
  getTabs = () => {
    const userId = storage.getItem('admin_user').userId;
    return [
      {
        title: '学分分析',
        children: (
          <>
            <CurrentCredit />
            {this.props.familyKpiTimes.endTime && <Histogram allTimes={this.props.familyKpiTimes} />}
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
            <Top />
            {/* <IncomeRank /> */}
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
    ]
  }
  render() {
    return (
      <div className={styles.familyBench}>
        <PerformanceDetail />
        <PageTab tabs={this.getTabs()} />
      </div>
    );
  }
}

export default XdFamily;
