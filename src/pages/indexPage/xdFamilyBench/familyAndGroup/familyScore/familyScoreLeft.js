import React from 'react';
import { connect } from 'dva';
import styles from '../style.less';
// import pkImg from '@/assets/xdwork/pk.png';
// import xdPkImg from '@/assets/workBench/xdpk.gif';
import Proportion from '../../../components/proportion';
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class FamilyScoreLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keye: '1'
    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <div className={styles.familyLeft}>
        <div className={styles.proMain}>
          <Proportion
            leftNum={8.11}
            rightNum={10.38}
            leftCollege={"全国工商管理"}
            rightCollege={"法律"}
            style={{ width: 'calc(100% - 200px)' }}
          />
        </div>
      </div>
    );
  }
}

export default FamilyScoreLeft;
