import React from 'react';
import { connect } from 'dva';
import TopTabs from "../../components/topTabs";
import Container from '@/components/BIContainer';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BICascader from '@/ant_components/BICascader';
import CollegeScore from "./collegeScore";
import { handleDataTrace } from '@/utils/utils';
import { jumpGobalRouter } from '@/pages/ko/utils/utils';

const { Option } = BISelect;
const userTypes = {
  'class': true,
  'group': true,
  'family': true,
}
@connect((xdWorkModal) => ({
  // times: xdWorkModal.getCurrentDateRangeData,
  userInfo: xdWorkModal.userInfo || {},
}))
class ScoreContrast extends React.Component {
  constructor(props) {
    // console.log("date",props.date,moment(props.date.startDate).format('YYYY-MM-DD'),moment(props.date.endDate).format('YYYY-MM-DD'))
    super(props);
    const admin_user = localStorage.getItem('admin_user');
    const userType = JSON.parse(admin_user) ? JSON.parse(admin_user).userType : null;
    this.state = {
      tabParams: [{
        name: <span data-trace='{"widgetName":"学院学分对比","traceName":"管理层工作台/学院学分对比"}'>学院学分对比</span>,
        key: '1',
        children: <CollegeScore  queryAppealDatas={this} queryAppealDataPage={this.queryAppealDataPage}/>,
      },{
        name: <span data-trace='{"widgetName":"家族学分对比","traceName":"管理层工作台/家族学分对比"}'>家族学分对比</span>,
        key:'2',
        children: <CollegeScore  queryAppealDatas={this} queryAppealDataPage={this.queryAppealDataPage}/>,
      },{
        name: <span data-trace='{"widgetName":"小组学分对比","traceName":"管理层工作台/小组学分对比"}'>小组学分对比</span>,
        key: '3',
        children: <CollegeScore queryAppealDatas={this} queryAppealDataPage={this.queryAppealDataPage}/>,
      }],
      collegeOptions:[],
      orgValue:"自考",
      queryAppealDatas:{},
      queryParams: {
        contrasts:1,
        familyType:0,
        dimensionId:null,
        collegeId: props.userInfo.collegeId,
        // startTime:moment(props.date.startDate).format('YYYY-MM-DD'),//"2019-09-25",
        // endTime:moment(props.date.endDate).format('YYYY-MM-DD')//"2019-09-30",
        startTime: '2019-09-25',
        endTime: '2019-09-30',
        ...this.props.allTimes
      },
      query: { },
      familyType:0,
      tabNum:1,
      userType
    }
  }
  componentDidMount() {
    this.queryAppealDataPage();
    this.props.dispatch({
      type:"xdWorkModal/getFamilyType",
      payload:{params:{}},
      callback:(res) => {
        this.setState({
          collegeOptions:res
        })
      }
    })
  }
  // tab改变
  changeTab = (obj) => {
    const { queryParams } = this.state;
    this.state.query[queryParams.contrasts] = {
      contrasts: queryParams.contrasts,
      familyType: this.state.familyType,
      dimensionId: queryParams.dimensionId,
    }
    this.state.tabNum = Number(obj.keye)
    if (!this.state.query[obj.keye]) {
      this.state.query[obj.keye] = {dimensionId:null};
    }
    this.queryAppealDataPage({contrasts: Number(obj.keye), ...this.state.query[obj.keye]});
  }
  //获取柱状图及维度的接口
  queryAppealDataPage = (obj = {}) =>{
    const params = {
      ...this.state.queryParams,
      ...obj,
    }
    console.log("params",params)
    this.setState({queryParams: params });
    this.props.dispatch({
      type:'xdWorkModal/queryAppealDataPage',
      payload:{params:params},
      callback:(res) => this.setState({
        queryAppealDatas:res
      })
    })
  }
  rightPart = () =>{
    const {collegeOptions={}, orgValue, userType, groupId, queryParams} = this.state;
    const { allTimes } = this.props;    
    return(
      <>
        <span style={{ marginRight: 200, display: 'flex' }}>
          <BISelect style={{ width: 136, marginRight: 12 }} placeholder="请选择" value={orgValue} onChange={(val) => this.onFormChange(val)}>
            {Object.keys(collegeOptions).map((key)=> <Option key={key} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
              {collegeOptions[key]}
            </Option>)}
          </BISelect>
          {queryParams.contrasts === 2 && <BISelect style={{ width: 136, marginRight: 12 }} placeholder="请选择" value={orgValue} onChange={(val) => this.onFormChange(val)}>
            {Object.keys(collegeOptions).map((key)=> <Option key={key} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
              {collegeOptions[key]}
            </Option>)}
          </BISelect>}
          {queryParams.contrasts === 3 && <BICascader
            placeholder="选择组织"
            changeOnSelect
            options={[]}
            fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
            getPopupContainer={triggerNode => triggerNode.parentNode}
            displayRender={this.renderCascader}
            value={groupId}
            onChange={this.onChangeSelect}
            allowClear={false}
            style={{ width: '136px' }}
          />}
        </span>
        <span>
          <BIButton onClick={() => this.handleRouter('xdCredit/index', {...allTimes})} type="online" style={{marginRight: '8px'}}>学分趋势</BIButton>
          { userTypes[userType] && <BIButton onClick={() => this.handleRouter('xdCreditPk/list', allTimes)} type="online" style={{marginRight: '8px'}}>学分PK</BIButton> } 
        </span>
      </>
    )
  }
  onFormChange = (val) =>{
    this.setState({
      orgValue:val,
      familyType:val,
    })
    this.state.queryParams.familyType = val
    this.queryAppealDataPage()
  }
  handleRouter = (path, params) => {
    handleDataTrace({"widgetName":"学分趋势","traceName":"班主任工作台/学分趋势"});
    jumpGobalRouter(path, params);
  }
  render() {
    return (
      <Container 
        style={{ width: '100%', marginBottom: '16px' }}
        propStyle={{ padding: '0px', position: 'relative' }}
        head="none"
      >            
        <TopTabs 
        right={this.rightPart()}
        rightStyles={{
          display: 'flex',
          justifyContent: 'space-between',
          width: 'calc(100% - 400px)',
          marginLeft: 400,
          left: 0
        }} 
        tabParams={this.state.tabParams} onTabChange={this.changeTab}
        />
      </Container>
    );
  }
}

export default ScoreContrast;
