import React from 'react';
import { connect } from 'dva';
import Container from '@/components/BIContainer';
import TopTabs from "../../components/topTabs"
import BISelect from '@/ant_components/BISelect'
import CollegeScore from "./collegeScore"
import moment from 'moment'
const { Option } = BISelect;
@connect((xdManagementBench) => ({
  xdManagementBench,
  times:xdManagementBench.getCurrentDateRangeData
}))
class ScoreContrast extends React.Component {
  constructor(props) {
    console.log("date",props.date,moment(props.date.startDate).format('YYYY-MM-DD'),moment(props.date.endDate).format('YYYY-MM-DD'))
    super(props)
    this.state = {
      tabParams:props.userInfo.userType === "boss"?[{
        name: <span data-trace='{"widgetName":"学院学分对比","traceName":"管理层工作台/学院学分对比"}'>学院学分对比</span>,
        key: '1',
        children: <CollegeScore  queryAppealDatas={this} queryAppealDataPage={this.queryAppealDataPage}/>,
      },{
        name:<span data-trace='{"widgetName":"家族学分对比","traceName":"管理层工作台/家族学分对比"}'>家族学分对比</span>,
        key:'2',
        children: <CollegeScore  queryAppealDatas={this} queryAppealDataPage={this.queryAppealDataPage}/>,
      }]:[{
        name: <span data-trace='{"widgetName":"学院学分对比","traceName":"管理层工作台/学院学分对比"}'>学院学分对比</span>,
        key: '1',
        children: <CollegeScore  queryAppealDatas={this} queryAppealDataPage={this.queryAppealDataPage}/>,
      },{
        name:<span data-trace='{"widgetName":"家族学分对比","traceName":"管理层工作台/家族学分对比"}'>家族学分对比</span>,
        key:'2',
        children: <CollegeScore  queryAppealDatas={this} queryAppealDataPage={this.queryAppealDataPage}/>,
      },{
        name: <span data-trace='{"widgetName":"小组学分对比","traceName":"管理层工作台/小组学分对比"}'>小组学分对比</span>,
        key: '3',
        children: <CollegeScore queryAppealDatas={this} queryAppealDataPage={this.queryAppealDataPage}/>,
      },{
        name:<span data-trace='{"widgetName":"学分时间趋势","traceName":"管理层工作台/学分时间趋势"}'>学分时间趋势</span>,
        key:'4',
        children:<CollegeScore queryAppealDatas={this} queryAppealDataPage={this.queryAppealDataPage}/>,
      }],
      collegeOptions:[],
      orgValue:"自考",
      queryAppealDatas:{},
      queryParams: {
        contrasts:1,
        familyType:0,
        dimensionId:null,
        collegeId:props.userInfo.collegeId,
        startTime:moment(props.date.startDate).format('YYYY-MM-DD'),//"2019-09-25",
        endTime:moment(props.date.endDate).format('YYYY-MM-DD')//"2019-09-30",
      },
      query: { },
      familyType:0,
      tabNum:1,
    }
  }
  componentDidMount() {
    this.queryAppealDataPage();
    this.props.dispatch({
      type:"xdManagementBench/getFamilyType",
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
      type:'xdManagementBench/queryAppealDataPage',
      payload:{params:params},
      callback:(res) => {
        this.setState({
          queryAppealDatas:res
        })
      }
    })
  }
  rightPart = () =>{
    const {collegeOptions={}, orgValue} = this.state
    return(
      <div>
        <BISelect style={{ width: 136, marginLeft: 12 }} placeholder="请选择" value={orgValue} onChange={(val) => this.onFormChange(val)}>

          {Object.keys(collegeOptions).map((key)=> <Option key={key} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
            {collegeOptions[key]}
          </Option>)}
        </BISelect>
      </div>
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
  render() {

    return (
      <Container style={{ width: '100%', marginBottom: '16px' }}
                 title=""
                 propStyle={{ padding: '0px' }}
                 head="none">
        <TopTabs right={this.rightPart()} tabParams={this.state.tabParams} onTabChange={this.changeTab}/>
      </Container>
    );
  }
}

export default ScoreContrast;
