import React from 'react';
import { connect } from 'dva';
import FamilyIncomeLeft from "./familyIncomeLeft"
import FamilyIncomeRight from "./familyIncomeRight"
import styles from '../style.less';
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class FamilyIncome extends React.Component {
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
        <FamilyIncomeLeft className={styles.familyLeft}/>
        <FamilyIncomeRight className={styles.familyRight}/>
      </div>
    );
  }
}

export default FamilyIncome;
