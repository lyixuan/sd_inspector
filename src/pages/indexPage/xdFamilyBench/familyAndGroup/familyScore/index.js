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
      keye: '1',
      familyId:0,
      collegeList:[]
    }
  }
  componentDidMount() {
   this.getFamilyList()
    this.getCollegeList()
  }
  //获取左侧家族的列表
  getFamilyList=(familyId)=>{
    this.props.dispatch({
      type: 'xdWorkModal/getFamilyScorePk',
      payload: { params: { pkFamily: familyId?familyId:this.state.familyId} },
    });
  };

  //获取右侧家族排名下拉筛选的数据
  getCollegeList=()=>{
    this.props.dispatch({
      type: 'xdWorkModal/getCollegeList',
      payload: { params: {} },
      callback:(data)=>{
        this.setState({
          collegeList:data
        })
      }
    });
  };

  render() {
    const {familyScoreList={}} = this.props.xdWorkModal.xdWorkModal
    const {collegeList=[]} = this.state
    const familyId = familyScoreList&&familyScoreList.myGroup.familyId
    console.log(28,familyScoreList)
    return (
      <div className={styles.creditContainer}>
        <FamilyScoreLeft className={styles.familyLeft} familyScoreList={familyScoreList}/>
        <FamilyScoreRight className={styles.familyRight}  collegeList={collegeList}  familyId={familyId} getFamilyList={this.getFamilyList}/>
      </div>
    );
  }
}

export default FamilyScore;
