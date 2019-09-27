import React from 'react';
import { connect } from 'dva';
import FamilyScoreLeft from "./familyScoreLeft"
import FamilyScoreRight from "./familyScoreRight"
import styles from '../style.less';
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class FamilyScore extends React.Component {
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
      <div className={styles.creditContainer}>
        <FamilyScoreLeft className={styles.familyLeft}/>
        <FamilyScoreRight className={styles.familyRight}/>
      </div>
    );
  }
}

export default FamilyScore;
