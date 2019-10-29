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
@connect(({xdManagementBench,xdCreditModal}) => ({
  xdManagementBench,
  xdCreditModal
}))

class NPSEvaluate extends React.Component {
  constructor(props) {
    super(props)
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
      NPSParams:{}
    }
  }
  componentDidMount() {
    console.log(44)
    this.getNpsAutonomousEvaluation()
    this.getUserOrgList()
  }
  //获取NPS自主评价的的数据接口
  getNpsAutonomousEvaluation = () =>{
    let params = {
      startTime:"2019-10-14",
      endTime:"2019-10-24",
      collegeId:103,
      familyId:null,
      groupId:null,
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
        console.log("组织架构",res)
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
      groupId, groupTypeArr, familyType: groupTypeArr[groupTypeArr.length - 1].familyType
    });
  }
  // 选择时间
  onDateChange = (v) => {
    const [startTime, endTime] = initTimeData(v);
    this.setState({ startTime, endTime, });
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
    console.log(112,this.state.userOrgConfig)
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
    console.log(191,NPSParams)
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
