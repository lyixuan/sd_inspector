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
      // pkFamilyId: 246,
      familyList: {},
    }
  }
  componentDidMount() {
    this.getIncomeFamilyList();
  }
  getIncomeFamilyList =()=>{
    this.props.dispatch({
      type:"xdWorkModal/getIncomeFamilyList",
      payload:{params:{ pkFamilyId: this.state.pkFamilyId }},
      callback: familyList => this.setState({ familyList })
    })
  }
  changeSelected = (pkFamilyId) => {
    this.setState({ pkFamilyId }, () => this.getIncomeFamilyList());
  }
  render() {
    const { familyList, pkFamilyId } = this.state;
    return (
      <div className={styles.creditContainer}>
        <FamilyIncomeLeft className={styles.familyLeft} familyList={familyList} pkFamilyId={pkFamilyId}/>
        <FamilyIncomeRight className={styles.familyRight} changeSelected={this.changeSelected}/>
      </div>
    );
  }
}

export default FamilyIncome;
