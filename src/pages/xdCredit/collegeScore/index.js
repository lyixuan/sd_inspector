import React from 'react';
import { connect } from 'dva';
import BILoading from '@/components/BILoading'
import moment from 'moment'
import TreeNames from '@/pages/indexPage/ManagementBench/scoreContrast/components/treeNames'
import Echart from '@/pages/indexPage/ManagementBench/scoreContrast/components/echart'
import EchartBottom from '@/pages/indexPage/ManagementBench/scoreContrast/components/echartBottom'
@connect(({xdManagementBench,loading,xdWorkModal}) => ({
  xdManagementBench,
  loading:loading.effects['xdManagementBench/queryAppealDataPage'],
  // times:xdManagementBench.getCurrentDateRangeData,
  // userInfo: xdWorkModal.userInfo,
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
  bgColor=(creaditValue)=>{
    let barBackground = ""
    creaditValue.map((item)=>{
      if(item>0){
        barBackground = "#47D3FF"
      }else if(item<0){
        barBackground = "#FF8086"
      }
    })
    return barBackground
  }
  borderRadiusAll = (creaditValue) =>{
    let borderRadius = [4,4,0,0];
    creaditValue.map((item)=>{
      if(item>0){
        borderRadius = [4,4,0,0]
      }else if(item<0){
        borderRadius = [0,0,4,4]
      }
    })
    return borderRadius
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
      qoqValue.push((item.qoqValue*100).toFixed(2))
    })
    const yMax =  Math.max.apply(null, creaditValue);
    const yMin = Math.min.apply(null, creaditValue);
    const yRightMax =  Math.max.apply(null, qoqValue);
    const yRightMin = Math.min.apply(null, qoqValue);
    for (let i = 0; i < creaditValue.length; i++) {
      dataShadow.push(yMin);
      maxShadow.push(yMax);
    }
    const barWidth = familyName.length>=22 ? 20 : 50
    const barBackground = this.bgColor(creaditValue)
    const borderRadius = this.borderRadiusAll(creaditValue)
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
      xAxis: [
        {
          type: 'category',
          data: familyName,
          axisLabel: {
            interval:0,
            rotate:familyName.length>=22?30:0,
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
          min: yMin>0?0:yMin,
          max: yMax<0?0:yMax,
          onZeroAxisIndex:0,
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
          min: yRightMin>0?0:yRightMin,
          max: yRightMax<0?0:yRightMax,
          axisLabel: {
            formatter: '{value} %',
            color:'#000000 '
          },
          onZeroAxisIndex:0,
          axisLine:{
            lineStyle:{
              type:'dotted',
              color:"RGBA(229, 229, 229, 0.8)"
            }
          },
          splitLine:{
            show:false
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
          barWidth:barWidth,
          data: dataShadow
        },
        { // For shadow
          type: 'bar',
          itemStyle: {
            normal: {color: 'rgba(71,211,255,0.06)'}
          },
          barGap:'-100%',
          barWidth:barWidth,
          data: maxShadow,
          animation: false
        },
        {
          name:'均分',
          type:'bar',
          itemStyle: {
            normal: {color: barBackground,barBorderRadius:borderRadius}
          },
          barWidth:barWidth,
          label: {
            normal: {
              show: true,
              position: 'top',
              color: '#56595E',
              fontSize:13
            }
          },
          data:creaditValue,
        },
        {
          name:'环比',
          type:'line',
          yAxisIndex: 1,
          itemStyle: {
            normal: {color: '#F5A623'}
          },
          data:qoqValue,
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
    let orgId = "";
    let tabNum = 1;
    let familyType = 0
    if(this.props){
      tabNum = this.props.queryAppealDatas.state.tabNum
      paramsArr = this.props.queryAppealDatas.state.queryAppealDatas.creaditDataList
      familyType = this.props.queryAppealDatas.state.familyType
    }
    (tabNum === 1 || tabNum ===2 || tabNum ===3) && paramsArr.map((subItem)=>{
      if(subItem.name === item.name){
        orgId = subItem.id
      }
    })
    tabNum === 4 && (orgId = userInfo.collegeId)
    if( orgId === userInfo.collegeId && userInfo.userType === "college" || userInfo.userType === "boss" || tabNum !== 1 ){
      let params={
        startTime:tabNum === 4?item.name:moment(this.props.times.startDate).format('YYYY-MM-DD'),
        endTime:tabNum === 4?item.name:moment(this.props.times.endDate).format('YYYY-MM-DD'),
        dementionId:this.props.queryAppealDatas.state.queryParams.dimensionId?this.props.queryAppealDatas.state.queryParams.dimensionId:1,
        reasonTypeId:0,
        orgId:orgId,
        orgType:this.orgTypes(tabNum),
        familyType:familyType
      }
      window.open(`/inspector/xdCredit/index?params=${JSON.stringify(params)}`);
    }

  }
  render() {
    const {queryAppealDatas = {}} = this.props;
    // const {userInfo} = this.props
    return (
      <div style={{minHeight:'490px'}}>
          <div>
            {/* <TreeNames dimensions={queryAppealDatas.dimensions} clickTag={this.props.queryAppealDataPage}/> */}
            {
              this.props.loading?<BILoading isLoading={this.props.loading} height="354px" />:(
                queryAppealDatas.creaditDataList && queryAppealDatas.creaditDataList.length>0 &&
                <Echart
                  options={this.drawChart(queryAppealDatas.creaditDataList)}
                  style={{height:"354px"}}
                  // clickEvent={(item)=>this.clickEvent(queryAppealDatas.creaditDataList,item,userInfo)}
                />
              )
            }
            <EchartBottom/>
        </div>

      </div>
    );
  }
}

export default CollegeScore;
