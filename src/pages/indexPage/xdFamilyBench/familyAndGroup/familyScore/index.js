import React from 'react';
import { connect } from 'dva';
import FamilyScoreLeft from "./familyScoreLeft"
import FamilyScoreRight from "./familyScoreRight"
import styles from '../style.less';
@connect((xdWorkModal,loading) => ({
  xdWorkModal
}))
class FamilyScore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keye: '1',
      familyId:localStorage.getItem("pkFamilyScore")?JSON.parse(localStorage.getItem("pkFamilyScore")).familyId:0,
      collegeList:[]
    }
  }
  componentDidMount() {
   this.getFamilyList()
    this.getCollegeList()
  }
  //获取左侧家族的列表
  getFamilyList=(record,familyId)=>{
    this.props.dispatch({
      type: 'xdWorkModal/getFamilyScorePk',
      payload: { params: { pkFamily: familyId?familyId:this.state.familyId} },
    });
    if (record) {
      localStorage.setItem('pkFamilyScore', JSON.stringify(record))
    }
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
    return (
      <div className={styles.creditContainer}>
        <FamilyScoreLeft className={styles.familyLeft} familyScoreList={familyScoreList} />
        <FamilyScoreRight className={styles.familyRight}  collegeList={collegeList}  familyId={familyId} getFamilyList={this.getFamilyList}/>
      </div>
    );
  }
}

export default FamilyScore;
