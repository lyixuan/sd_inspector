import React from 'react';
import { connect } from 'dva';
import Container from '@/components/BIContainer';
import TopTabs from "../../components/topTabs"
import BISelect from '@/ant_components/BISelect'
import CollegeScore from "./collegeScore"
const { Option } = BISelect;
@connect((xdWorkModal) => ({
  xdWorkModal,
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
        children: <CollegeScore />,
      },{
        name: '小组学分对比',
        key: '3',
        children: <CollegeScore />,
      },{
        name:'学分时间趋势',
        key:'4',
        children:<CollegeScore />,
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
      orgValue:"自变量",
      queryAppealDatas:{}
    }
  }
  componentDidMount() {
    this.queryAppealDataPage()
  }
  //获取柱状图及维度的接口
  queryAppealDataPage = (contrasts=1,dimensionId) =>{
    let params = {
      contrasts:"1",
      familyType:"0",
      dimensionId:dimensionId?dimensionId:"",
      collegeId:103,
      startTime:"2019-10-01",
      endTime:"2019-10-01"

    }
    this.props.dispatch({
      type:'xdWorkModal/queryAppealDataPage',
      payload:{params:params},
      callback:(res) => {
        console.log("柱状图",res)
        this.setState({
          queryAppealDatas:res
        })

      }
    })
  }
  rightPart = () =>{
    const {collegeOptions,orgValue} = this.state
    return(
      <div>
        <BISelect style={{ width: 136, marginLeft: 12 }} placeholder="请选择" value={orgValue} onChange={(val) => this.onFormChange(val)}>
          {collegeOptions.map((item, index) => (
            <Option key={item.collegeId}>
              {item.collegeName}
            </Option>
          ))}
        </BISelect>
      </div>
    )
  }
  onFormChange = (val) =>{
    this.setState({
      orgValue:val
    })
  }
  render() {

    return (
      <Container style={{ width: '100%', marginBottom: '16px' }}
                 title=""
                 propStyle={{ padding: '0px' }}
                 head="none">
        <TopTabs right={this.rightPart()} tabParams={this.state.tabParams} queryAppealDataPage={this.queryAppealDataPage}/>

      </Container>
    );
  }
}

export default ScoreContrast;
