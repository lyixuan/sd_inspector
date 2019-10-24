import React from 'react';
import { connect } from 'dva';
import storage from '../../../utils/storage';
import styles from './style.less';
import ScoreContrast from './scoreContrast';
import Header from './header';
import IncomeCompare from './incomeCompare';
// import IMPart from './IMPart'

// import styles from './style.less'
// import ScoreContrast from "./scoreContrast"
import IMPartLeft from './IMPartLeft'
import IMPartRight from './IMPartRight'
import NPSEvaluate from './NPSEvaluate'
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class ManagementBench extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: storage.getItem('admin_user').userId,
    };
  }
  componentDidMount() {}
  render() {
    // const { userId} = this.state;
    return (
      <div className={styles.workbench}>
        <Header />
        <IncomeCompare />
        <ScoreContrast />
        <div className={styles.qualityAppel}>
          <IMPartLeft />
          <IMPartRight />
        </div>
          <NPSEvaluate />
      </div>
    );
  }
}

export default ManagementBench;
