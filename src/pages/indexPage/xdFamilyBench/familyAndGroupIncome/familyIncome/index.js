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
      pkFamilyId: localStorage.getItem("pkFamilyIncome") ? JSON.parse(localStorage.getItem("pkFamilyIncome")).familyId : "",
    }
  }
  componentDidMount() {
    this.getIncomeFamilyList();
  }
  getIncomeFamilyList = () => {
    this.props.dispatch({
      type: "xdWorkModal/getIncomeFamilyList",
      payload: { params: { pkFamilyId: this.state.pkFamilyId } },
      callback: familyList => this.setState({ familyList })
    })
  }
  changeSelected = (record, pkFamilyId) => {
    console.log(2999, record)
    this.setState({ pkFamilyId }, () => this.getIncomeFamilyList());
    if (record) {
      localStorage.setItem('pkFamilyIncome', JSON.stringify(record))
    }
  }
  render() {
    const { familyList, pkFamilyId } = this.state;
    const { userInfo } = this.props.xdWorkModal.xdWorkModal
    return (
      <div className={styles.creditContainer}>
        <FamilyIncomeLeft className={styles.familyLeft} familyList={familyList} userInfo={userInfo} pkFamilyId={pkFamilyId} />
        <FamilyIncomeRight className={styles.familyRight} familyList={familyList} changeSelected={this.changeSelected} />
      </div>
    );
  }
}

export default FamilyIncome;
