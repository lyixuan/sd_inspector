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
      keye: '1',
      pkfamilyId:104,
      familyList:{},
      collegeId:104,
      incomeFamilyList:{}
    }
  }
  componentDidMount() {
    this.getIncomeFamilyList()

  }
  getIncomeFamilyList =()=>{
    this.props.dispatch({
      type:"xdWorkModal/getIncomeFamilyList",
      payload:{params:{pkfamilyId:this.state.pkfamilyId}},
      callback:(data)=>{
        this.setState({
          familyList:data
        })
      }
    })
  }
  getFamilyList=()=>{
    this.props.dispatch({
      type:'xdWorkModal/getFamilyList',
      payload:{params:{collegeId:this.state.collegeId}},
      callback:(data)=>{
        this.setState({
          incomeFamilyList:data
        })
      }
    })
  }
  render() {
    const {familyList,incomeFamilyList} = this.state
    return (
      <div className={styles.creditContainer}>
        <FamilyIncomeLeft className={styles.familyLeft} familyList={familyList}/>
        <FamilyIncomeRight className={styles.familyRight} incomeFamilyList={incomeFamilyList}/>
      </div>
    );
  }
}

export default FamilyIncome;
