import React from 'react';
import { connect } from 'dva';
import PerformanceDetail from './performanceDetail';
import RankList from './rankList';
import styles from './style.less';
import FamilyAndGroup from './familyAndGroup';
import Income from './income';
import CurrentCredit from './currentCredit';
import Quality from './quality';
import Appeal from './appeal';
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
// Current credits
class XdFamily extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <div className={styles.familyBench}>
        <PerformanceDetail></PerformanceDetail>
        <RankList></RankList>
        <CurrentCredit></CurrentCredit>
        <FamilyAndGroup></FamilyAndGroup>
        <Income />
        <div className={styles.qualityAppel}>
          <Appeal userId={1247} />
          <Quality userId={1247} />
        </div>
      </div>
    );
  }
}

export default XdFamily;
