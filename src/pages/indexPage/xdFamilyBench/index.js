import React from 'react';
import { connect } from 'dva';
import storage from '../../../utils/storage';
import PageTab from '@/pages/indexPage/components/pageTab'
import PerformanceDetail from './performanceDetail';
import CurrentCredit from './currentCredit';
import CreditRank from './creditRank';
import IncomeRank from './incomeRank';
import Quality from './quality';
import Income from './income';
import Appeal from './appeal';
import styles from './style.less';


@connect((xdFamilyModal) => ({
  xdFamilyModal,
}))
class XdFamily extends React.Component {
  constructor(props) {
    super(props)
    const userId = storage.getItem('admin_user').userId;
    this.state = {
      tabs: [{
        title: '学分分析',
        children: <><CurrentCredit/><CreditRank/></>
      }, {
        title: '创收分析',
        children: <><Income /><IncomeRank/></>
      }, {
        title: '负面分析',
        children: <div className={styles.qualityAppel}>
          <Appeal userId={userId} />
          <Quality userId={userId} />
        </div>
      }]
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'xdWorkModal/getKpiLevelList',
    });
  }
  render() {
    const { tabs } = this.state;
    return (
      <div className={styles.familyBench}>
        <PerformanceDetail />
        <PageTab tabs={tabs}/>
        {/* <RankList/>
        <CurrentCredit/>
        <FamilyAndGroup />
        <Income />
        <FamilyAndGroupIncome />
        <div className={styles.qualityAppel}>
          <Appeal userId={userId} />
          <Quality userId={userId} />
        </div> */}
      </div>
    );
  }
}

export default XdFamily;
