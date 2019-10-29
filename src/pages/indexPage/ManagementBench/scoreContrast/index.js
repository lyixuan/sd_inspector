import React from 'react';
import { connect } from 'dva';
import Container from '@/components/BIContainer';
import TopTabs from "../../components/topTabs"
import BISelect from '@/ant_components/BISelect'
import CollegeScore from "./collegeScore"
const { Option } = BISelect;
@connect((xdManagementBench) => ({
  xdManagementBench,
}))
class ScoreContrast extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabParams:[{
        name: '学院学分对比',
        key: '1',
        children: <CollegeScore  queryAppealDatas={this} queryAppealDataPage={this.queryAppealDataPage}/>,
      },{
        name:'家族学分对比',
        key:'2',
        children: <CollegeScore  queryAppealDatas={this} queryAppealDataPage={this.queryAppealDataPage}/>,
      },{
        name: '小组学分对比',
        key: '3',
        children: <CollegeScore queryAppealDatas={this} queryAppealDataPage={this.queryAppealDataPage}/>,
      },{
        name:'学分时间趋势',
        key:'4',
        children:<CollegeScore queryAppealDatas={this} queryAppealDataPage={this.queryAppealDataPage}/>,
      }],
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
      orgValue:"自考家族",
      queryAppealDatas:{},
      queryParams: {
        contrasts:"1",
        familyType:"0",
        dimensionId:"",
        collegeId:null,
        startTime:"2019-09-25",
        endTime:"2019-09-30"
      },
      query: { },
      orgId:0
    }
  }
  componentDidMount() {
    this.queryAppealDataPage();
    this.props.dispatch({
      type:"xdManagementBench/getFamilyType",
      payload:{params:{}},
      callback:(res) => {
        // console.log(67,res)
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
      familyType: this.state.orgId,
      dimensionId: queryParams.dimensionId,
    }
    console.log(82,this.state.query)
    if (!this.state.query[obj.keye]) {
      this.state.query[obj.keye] = {};
    }
    this.queryAppealDataPage({contrasts: obj.keye, ...this.state.query[obj.keye]});
  }
  //获取柱状图及维度的接口
  queryAppealDataPage = (obj = {}) =>{
    const params = {
      ...this.state.queryParams,
      ...obj,
    }
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

          {Object.keys(collegeOptions).map((key)=> <Option key={key}>
            {collegeOptions[key]}
          </Option>)}
        </BISelect>
      </div>
    )
  }
  onFormChange = (val) =>{
    this.setState({
      orgValue:val,
      orgId:val
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
