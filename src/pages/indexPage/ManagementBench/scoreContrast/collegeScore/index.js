import React from 'react';
import { connect } from 'dva';
import BILoading from '@/components/BILoading'
import moment from 'moment'
import TreeNames from '../components/treeNames'
import Echart from '../components/Echart'
import EchartBottom from '../components/echartBottom'
@connect(({xdManagementBench,loading,xdWorkModal}) => ({
  xdManagementBench,
  loading:loading.effects['xdManagementBench/queryAppealDataPage'],
  times:xdManagementBench.getCurrentDateRangeData,
  userInfo: xdWorkModal.userInfo,
}))
class CollegeScore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      queryAppealDatas:{},
      familyName:[]
    }
  }
  componentDidMount() {

  }

  drawChart = (arr) =>{
    let creaditValue = [];
    let familyName = [];
    let qoqValue = []
    let dataShadow = []
    let maxShadow = []
    arr.map((item,index)=>{
      creaditValue.push(item.creaditValue);
      familyName.push(item.name);
      qoqValue.push(Number(parseInt(item.qoqValue*100)))
    })
    const yMax =  Math.max.apply(null, creaditValue);
    const yMin = Math.min.apply(null, creaditValue);
    const yRightMax =  Math.max.apply(null, qoqValue);
    const yRightMin = Math.min.apply(null, qoqValue);
    for (let i = 0; i < creaditValue.length; i++) {
      dataShadow.push(yMin);
      maxShadow.push(yMax);
    }
    const  options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        },
        formatter: '{a2}: {c2}<br />{a3}: {c3}%'
      },
      xAxis: [
        {
          type: 'category',
          data: familyName,

        }
      ],
      yAxis: [
        {
          type: 'value',
          min: -yMin,
          max: yMax,
          // interval: 4,
          axisLabel: {
            formatter: '{value}'
          },
          splitLine:{
            show:true,
            lineStyle:{
              type:'dashed',
              color:"RGBA(229, 229, 229, .8)"
            }
          },
          axisLine:{
            lineStyle:{
              type:'solid',
              color:"RGBA(0, 0, 0, 1)"
            }
          },
        },
        {
          type: 'value',
          min: -yRightMin,
          max: yRightMax,
          // interval: 150,
          axisLabel: {
            formatter: '{value} %',
          },
          splitLine:{
            show:false
          },
          axisLine:{
            lineStyle:{
              type:'solid',
              color:"RGBA(0, 0, 0, 1)"
            }
          },

        }
      ],
      grid:[
        {
          left:37,width:"94%",top:38
        }
      ],
      series: [
        { // For shadow
          type: 'bar',
          itemStyle: {
            normal: {color: 'rgba(0,0,0,0.05)'}
          },
          barGap:'-100%',
          barCategoryGap:'40%',
          barWidth:50,
          data: dataShadow
        },
        { // For shadow
          type: 'bar',
          itemStyle: {
            normal: {color: 'rgba(71,211,255,0.06)'}
          },
          barGap:'-100%',
          barCategoryGap:'40%',
          barWidth:50,
          data: maxShadow,
          animation: false
        },
        {
          name:'均分',
          type:'bar',
          itemStyle: {
            normal: {color: '#47D3FF',barBorderRadius:[4, 4, 0, 0]}
          },
          barWidth:50,
          label: {
            normal: {
              show: true,
              position: 'top',
              color: '#56595E',
              fontSize:13
            }
          },
          data:creaditValue
        },{
          name:'环比',
          type:'line',
          yAxisIndex: 1,
          itemStyle: {
            normal: {color: '#F5A623'}
          },
          data:qoqValue,//[10.00, 100.00, 20.00, 120.00, -20.00, 40.00]
        }
      ]

    }
    return options
  }
  orgTypes = (tabNum)=>{
    let orgType = ""
   if(tabNum === 1||tabNum === 4){
     orgType = "college"
    }else if(tabNum === 2){
      orgType = "family"
    }else if(tabNum === 2){
     orgType = "group"
   }
    return orgType

  }
  clickEvent = (arr,item,userInfo)=>{
    let paramsArr = arr
    console.log(arr,item,userInfo,this.props.queryAppealDatas.state)
    let orgId = "";
    let tabNum = 1;
    if(this.props){
      tabNum = this.props.queryAppealDatas.state.tabNum
      paramsArr = this.props.queryAppealDatas.state.queryAppealDatas.creaditDataList
    }
    (tabNum === 1 || tabNum ===2 || tabNum ===3) && paramsArr.map((subItem)=>{
      if(subItem.name === item.name){
        orgId = subItem.id
      }
    })
    tabNum === 4 && (orgId = userInfo.collegeId)
    let params={
      startTime:tabNum === 4?item.name:moment(this.props.times.startDate).format('YYYY-MM-DD'),
      endTime:tabNum === 4?item.name:moment(this.props.times.endDate).format('YYYY-MM-DD'),
      dementionId:16,
      reasonTypeId:0,
      orgId:orgId,
      orgType:this.orgTypes(tabNum)
    }
    window.open(`/inspector/xdCredit/index?params=${JSON.stringify(params)}`);
  }
  render() {
    const {queryAppealDatas = {}} = this.props.queryAppealDatas.state;
    const {userInfo} = this.props
    return (
      <div style={{height:'479px'}}>
        <BILoading isLoading={this.props.loading}>
          <div>
            <TreeNames dimensions={queryAppealDatas.dimensions} clickTag={this.props.queryAppealDataPage}/>
            {queryAppealDatas.creaditDataList && queryAppealDatas.creaditDataList.length>0 && <Echart options={this.drawChart(queryAppealDatas.creaditDataList)} style={{height:"354px"}} clickEvent={(item)=>this.clickEvent(queryAppealDatas.creaditDataList,item,userInfo)}/>}
            <EchartBottom/>
        </div>
        </BILoading>
      </div>
    );
  }
}

export default CollegeScore;
