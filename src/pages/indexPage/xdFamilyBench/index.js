import React from 'react';
import { connect } from 'dva';
import PerformanceDetail from './performanceDetail';
import RankList from './rankList';
import styles from './style.less';
import FamilyAndGroup from './familyAndGroup';
import FamilyAndGroupIncome from './familyAndGroupIncome';
import Income from './income';
import CurrentCredit from './currentCredit';
import Quality from './quality';
import Appeal from './appeal';
import storage from '../../../utils/storage';

@connect((xdWorkModal) => ({
  xdWorkModal,
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

  }
  render() {
    const { userId } = this.state;
    return (
      <div className={styles.familyBench}>
        <PerformanceDetail></PerformanceDetail>
        <RankList></RankList>
        <CurrentCredit></CurrentCredit>
        <FamilyAndGroup />
        <Income />
        <FamilyAndGroupIncome />
        <div className={styles.qualityAppel}>
          <Appeal userId={userId} />
          <Quality userId={userId} />
        </div>
      </div>
    );
  }
}

export default XdFamily;
