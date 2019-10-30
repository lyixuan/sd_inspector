import React from 'react';
import { connect } from 'dva';
import styles from './style.less'
import Container from '@/components/BIContainer/index';
import BISelect from '@/ant_components/BISelect'
import BICascader from '@/ant_components/BICascader';
import BIDatePicker from '@/ant_components/BIDatePicker';
import NPSLeft from './NPSLeft'
import NPSRight from './NPSRight'
import moment from 'moment';
import { initTimeData } from '../../../ko/utils/utils';
// const { Option } = BISelect;
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY-MM-DD';
@connect(({xdManagementBench,xdCreditModal,xdWorkModal}) => ({
  xdManagementBench,
  xdCreditModal,
  userInfo:xdWorkModal.userInfo,
}))

class NPSEvaluate extends React.Component {
  constructor(props) {
    super(props)
    console.log(24,props.date)
    this.state = {
      collegeOptions:[{
        collegeId:1,
        collegeName:'自变量'
      },{
        collegeId:2,
        collegeName:'睿博'
      },{
        collegeId:3,
        collegeName:'π学院'
      },{
        collegeId:4,
        collegeName:'芒格'
      },{
        collegeId:5,
        collegeName:'狐逻泰罗'
      }],
      orgValue:"自变量",
      userOrgConfig: [],
      groupId: [],
      groupTypeArr: [],
      NPSParams:{},
      startTime:moment(props.date.startDate).format('YYYY-MM-DD'),
      endTime:moment(props.date.endDate).format('YYYY-MM-DD'),
      userInfo:props.userInfo
    }
  }
  componentDidMount() {
    // this.getNpsAutonomousEvaluation()

    this.getUserOrgList()
    this.getNpsAutonomousEvaluation(this.state.userInfo)
    if(this.state.userInfo.collegeId){
      this.state.groupId.push(this.state.userInfo.collegeId)
    }else if(this.state.userInfo.familyId){
      this.state.groupId.push(this.state.userInfo.familyId)
    }else if(this.state.userInfo.groupId){
      this.state.groupId.push(this.state.userInfo.groupId)
    }
    console.log(54,this.state.groupId,this.state.userInfo)
    this.setState({
      groupId:this.state.groupId
    })
  }

  //获取NPS自主评价的的数据接口
  getNpsAutonomousEvaluation = (userInfo,ids) =>{
    console.log(61,userInfo,this.state.startTime,this.state.endTime)
    let params = {
      startTime:this.state.startTime ? this.state.startTime : "",
      endTime:this.state.endTime ? this.state.endTime : "",
      collegeId:(userInfo && userInfo.collegeId) || (this.state.groupId.length>0 && this.state.groupId[0])||null,
      familyId:(userInfo && userInfo.familyId) || (this.state.groupId.length>0 && this.state.groupId[1])||null,
      groupId:(userInfo && userInfo.groupId) || (this.state.groupId.length>0 && this.state.groupId[2])|| null,
      pageNum:1,
      pageSize:10
    }
    this.props.dispatch({
      type:'xdManagementBench/getNpsAutonomousEvaluation',
      payload:{params:params},
      callback:(res) => {
        this.setState({
          NPSParams:res
        })

      }
    })
  }
  // 组织 - 时间
  getUserOrgList = () => {
    this.props.dispatch({
      type: 'xdManagementBench/getOrgMapTree',
      payload: { params: {} },
      callback: res => {
        if (res && res.length > 0) {
          this.setState({
            userOrgConfig:res,
          })
        }
      }
    });
  }
  // 选择组织
  onChangeSelect = (groupId, groupTypeArr) => {
    this.setState({
      groupId,
      groupTypeArr
    });
    setTimeout(()=>{
      this.getNpsAutonomousEvaluation()
    },200)

  }
  // 选择时间
  onDateChange = (v) => {
    const [startTime, endTime] = initTimeData(v);
    this.setState({ startTime, endTime, });
    setTimeout(()=>{
      this.getNpsAutonomousEvaluation()
    },200)
  }
  // date
  getDate = () => {
    const { startTime, endTime } = this.state;
    return startTime && endTime ? [moment(startTime), moment(endTime)] : [];
  }
  rightPart = () =>{
    // const {collegeOptions,orgValue} = this.state
    const {  groupId, userOrgConfig,  } = this.state;
    const {orgList} = this.props.xdManagementBench;
    orgList.length>0 && this.getResetGroupMsg(orgList)
    return(
      <div>
        <span className={styles.change}>
                  选择组织：
                <BICascader
                  placeholder="选择组织"
                  changeOnSelect
                  options={userOrgConfig}
                  fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  displayRender={this.renderCascader}
                  value={groupId}
                  onChange={this.onChangeSelect}
                  allowClear={false}
                  style={{ width: '136px' }}
                />
         </span>
        <span className={styles.change}>
                选择时间：
              <BIRangePicker
                value={this.getDate()}
                placeholder={['选择起始时间', '选择截止时间']}
                format={dateFormat}
                onChange={this.onDateChange}
                allowClear={false}
                disabledDate={this.disabledDate}
                style={{ width: '224px' }}
              />
              </span>
      </div>
    )
  }
  render() {
    const { NPSParams} = this.state;
    console.log(157,NPSParams)
    return (
      <Container title="NPS自主评价分析"
                 style={{ width: '100%', marginBottom: '16px' }}
                 right={this.rightPart()}
      >
        {NPSParams && <div className={styles.NPSMain}>
          <NPSLeft NPSleftParams = {NPSParams} />
          <NPSRight cloudOptions={NPSParams.tagImageDtoList}/>
        </div>}

      </Container>
    );
  }
}

export default NPSEvaluate;
