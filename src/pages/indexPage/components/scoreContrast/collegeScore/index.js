import React from 'react';
import { connect } from 'dva';
import EchartBottom from '../components/echartBottom';
import BILoading from '@/components/BILoading';
import TreeNames from '../components/treeNames';
import Echart from '../components/echart';
import { jumpGobalRouter } from '@/pages/ko/utils/utils';
import BIScrollbar from '@/ant_components/BIScrollbar';


@connect(({xdWorkModal,loading}) => ({
  userInfo: xdWorkModal.userInfo,
  loading: loading.effects['xdWorkModal/queryAppealDataPage'],
}))
class CollegeScore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      queryAppealDatas:{},
      familyName:[]
    }
  }
  getItemStyle = v =>{
    if (v > 0) {
      return {
        color: "#47D3FF",
        barBorderRadius: [4,4,0,0]
      }
    } else {
      return {
        color: "#FF8086",
        barBorderRadius: [0,0,4,4]
      }
    }
  }
  drawChart = (arr) =>{
    let creaditValue = [];
    let familyName = [];
    let qoqValue = []
    let dataShadow = []
    let maxShadow = [];
    const seriesDatas = [];
    arr.map((item, index)=>{
      creaditValue.push(item.creaditValue);
      qoqValue.push((item.qoqValue*100).toFixed(2));
      // x坐标轴
      familyName.push({
        value: item.name,
        textStyle: {
          color: item.selfOrg ? '#FF9E00' : '#000'
        }
      });
      // 柱状图
      seriesDatas.push({
        itemStyle: this.getItemStyle(item.creaditValue),
        value: item.creaditValue,
      })
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
        textStyle: {
          cursor: 'no-drop'
        },
        formatter: '{a2}: {c2}<br />{a3}: {c3}%'
      },
      xAxis: [
        {
          type: 'category',
          data: familyName,
          axisLabel: {
            interval:0,
            rotate:familyName.length >= 12 ? 30:0,
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
          barWidth:barWidth,
          label: {
            normal: {
              show: true,
              position: 'top',
              color: '#56595E',
              fontSize:13
            }
          },
          data: seriesDatas,
        },
        {
          name:'环比',
          type:'line',
          yAxisIndex: 1,
          itemStyle: {
            normal: {color: '#F5A623'}
          },
          data: qoqValue,
        }
      ]

    }
    return options
  }
  orgTypes = (tabNum)=>{
    let orgType = ""
   if(tabNum === 1|| tabNum === 4){
     orgType = "college"
    }else if(tabNum === 2){
      orgType = "family"
    }else if(tabNum === 3){
     orgType = "group"
   }
    return orgType

  }
  clickEvent = (arr, item, userInfo)=>{
    const { queryParams = {}, tabNum = 1, queryAppealDatas = {} } = this.props;
    let paramsArr = queryAppealDatas.creaditDataList || arr;
    if (!paramsArr[item.dataIndex].selfOrLower) {
      return;
    }
    let orgId = "";
    if (tabNum === 1 || tabNum ===2 || tabNum ===3) {
      orgId = paramsArr.find(subItem => subItem.name === item.name);
    } else if (tabNum === 4) {
      orgId = userInfo.collegeId;
    }
    // if( orgId === userInfo.collegeId && userInfo.userType === "college" || userInfo.userType === "boss" || tabNum !== 1 ){
      const { allTimes = {}  } = this.props;
      const { dimensionId, familyType } = queryParams;
      let params={
        ...allTimes,
        dementionId: dimensionId ? dimensionId : 37,
        orgType: this.orgTypes(tabNum),
        familyType,
        reasonTypeId: 0,
        orgId,
      }
      // window.open(`/inspector/xdCredit/index?params=${JSON.stringify(params)}`);
      jumpGobalRouter('xdCredit/index', params);
    // }
  }
  getEchartRender = creaditDataList => {
    return <>
      {
        creaditDataList && creaditDataList.length > 0 &&
          <Echart
            options={this.drawChart(creaditDataList)}
            style={{height: 354, width: creaditDataList.length * 50}}
            clickEvent={(item)=>this.clickEvent(creaditDataList, item, this.props.userInfo)}
          />
      }
    </>
  }
  render() {
    const { queryAppealDatas = {} } = this.props;
    const { creaditDataList = [] } = queryAppealDatas;
    return (
      <div style={{minHeight:'490px'}}>
          <div>
            <TreeNames dimensions={queryAppealDatas.dimensions} clickTag={this.props.queryAppealDataPage}/>
            <BILoading isLoading={this.props.loading}> 
              <BIScrollbar style={{ minHeight: 354 }}>
                {this.props.loading ? '' : this.getEchartRender(creaditDataList)}
              </BIScrollbar>            
              <EchartBottom/>
            </BILoading>
        </div>
      </div>
    );
  }
}
export default CollegeScore;
