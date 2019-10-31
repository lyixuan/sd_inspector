import React from 'react';
import { connect } from 'dva';
import BILoading from '@/components/BILoading'
import moment from 'moment'
import TreeNames from '../components/treeNames'
import Echart from '../components/echart'
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
      color: ["#50D4FD", "#FD8188"],
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
      // legend: {
      //   data: ['正面', '负面'],
      //   bottom: 5,
      //   itemHeight: 30,
      //   right:30,
      //   orient:'horizontal',
      //   textStyle: {
      //     color: '#7B7C80',
      //     fontSize:13
      //   },
      //   icon:'circle',
      //   itemWidth:10
      // },
      xAxis: [
        {
          type: 'category',
          data: familyName,
          axisLabel: {
            interval:0,
            rotate:40,
            color:'#000000 '
          },
          axisLine:{
            lineStyle:{
              type:'dotted',
              color:"#4A90E2"
            }
          },
          splitLine: {show: false},
          splitArea: {show: false}
        }
      ],
      yAxis: [
        {
          inverse: false,
          splitArea: {show: false},
          type: 'value',
          min: -yMin,
          max: yMax,
          // interval: 4,
          axisLabel: {
            formatter: '{value}',
            color:'#000000 '
          },
          axisLine:{
            lineStyle:{
              type:'dotted',
              color:"RGBA(229, 229, 229, 0.8)"
            }
          },
          splitLine:{
            lineStyle:{
              type:'dotted',
              color:"RGBA(229, 229, 229, 0.5)"
            }
          }
        },
        {
          inverse: false,
          splitArea: {show: false},
          type: 'value',
          min: -yRightMin,
          max: yRightMax,
          axisLabel: {
            formatter: '{value} %',
            color:'#000000 '
          },
          axisLine:{
            lineStyle:{
              type:'dotted',
              color:"RGBA(229, 229, 229, 0.8)"
            }
          },
          splitLine:{
            lineStyle:{
              type:'dotted',
              color:"RGBA(229, 229, 229, 0.5)"
            }
          }

        }
      ],
      grid: {
        left: 45,
        right:60,
        top:40,
        bottom:60
      },
      series: [
        {
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
    }else if(tabNum === 3){
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
      <div style={{minHeight:'479px'}}>
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
