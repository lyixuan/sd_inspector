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
      groupId: [] ||localStorage.getItem('NPSGroupId'),
      groupTypeArr: [],
      NPSParams:{},
      dateArr:this.handleDefaultPickerValueMark(),
      userInfo:props.userInfo,
      disableEndDate:this.handleDefaultPickerValueMark()[1]
    }
  }
  componentDidMount() {
    this.getUserOrgList()
    let ids = localStorage.getItem('NPSGroupId') || []
    if(ids.length <= 0){
      if(this.state.userInfo.collegeId){
        this.state.groupId.push(this.state.userInfo.collegeId)
      }else if(this.state.userInfo.familyId){
        this.state.groupId.push(this.state.userInfo.familyId)
      }else if(this.state.userInfo.groupId){
        this.state.groupId.push(this.state.userInfo.groupId)
      }
    }
    this.setState({
      groupId:localStorage.getItem('NPSGroupId')?JSON.parse(localStorage.getItem('NPSGroupId')):this.state.groupId
    },()=>{
      this.getNpsAutonomousEvaluation(this.state.userInfo,ids)
    })
  }

  initRecordTimeListData = (params=[]) =>{
    const [startTime,endTime]= params.map(item => item && moment(item).format(dateFormat))
    return {startTime,endTime};
  }
  //获取NPS自主评价的的数据接口
  getNpsAutonomousEvaluation = (userInfo,ids) =>{
    let params = {
      ...this.initRecordTimeListData(this.state.dateArr),
      collegeId:(userInfo && userInfo.collegeId) || (this.state.groupId.length>0 && this.state.groupId[0])||null,
      familyId:(userInfo && userInfo.familyId) || (this.state.groupId.length>0 && this.state.groupId[1])||null,
      groupId:(userInfo && userInfo.groupId) || (this.state.groupId.length>0 && this.state.groupId[2])|| null,
      pageNum:null,
      pageSize:null
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
          res.unshift({id: 0,name: '全部',nodeList: ''})
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
    },()=>{
      this.getNpsAutonomousEvaluation()
    });
    localStorage.setItem('NPSGroupId', JSON.stringify(groupId));
  }
  // 选择时间
  onDateChange = (v) => {
    this.setState({ dateArr:v, },()=>this.getNpsAutonomousEvaluation());
  }
  //取T-2日期的数据
  handleDefaultPickerValueMark = (n = 2, cTime) =>{
    cTime = cTime ? moment(cTime) : moment();
    const defTime = cTime.subtract(n, 'days');
    return [defTime,defTime];
  }
  // 时间控件可展示的时间范围
  disabledDate = current => {
    return current > moment(this.state.disableEndDate) || current < moment("2019-07-08");
  };
  rightPart = () =>{
    // const {collegeOptions,orgValue} = this.state
    const {  groupId="全部", userOrgConfig, dateArr } = this.state;
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
                value={dateArr}
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
