import React from 'react';
import { connect } from 'dva';
import PerformanceDetail from './performanceDetail';
import RankList from './rankList';
import styles from './style.less';
import FamilyAndGroup from './familyAndGroup';
import CreditRank from './creditRank';
import FamilyAndGroupIncome from './familyAndGroupIncome';
import Income from './income';
import CurrentCredit from './currentCredit';
import Quality from './quality';
import Appeal from './appeal';
import storage from '../../../utils/storage';
import PageTab from '@/pages/indexPage/components/pageTab'

@connect((xdFamilyModal) => ({
  xdFamilyModal,
}))
// Current credits
class XdFamily extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: storage.getItem('admin_user').userId,
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'xdWorkModal/getKpiLevelList',
    });
  }
  render() {
    const { userId } = this.state;
    const tabs = [{
      title: '学分分析',
      children: <><CurrentCredit/><CreditRank/></>
    }, {
      title: '创收分析',
      children: <><Income /><FamilyAndGroupIncome /></>
    }, {
      title: '负面分析',
      children: <div className={styles.qualityAppel}>
        <Appeal userId={userId} />
        <Quality userId={userId} />
      </div>
    }]
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
