import React from 'react';
import { connect } from 'dva';
// import styles from './style'
import TreeNames from '../components/treeNames'
import Echart from '../components/Echart'
import EchartBottom from '../components/echartBottom'
@connect((xdManagementBench) => ({
  xdManagementBench,
}))
class CollegeScore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      queryAppealDatas:{},
    }
  }
  componentDidMount() {

  }

  drawChart = (arr) =>{
    console.log(22,arr)

    let creaditValue = [];
    let familyName = [];
    let qoqValue = []
    let yMax = 8
    let yMin = -8
    let dataShadow = []
    let maxShadow = []
    arr.map((item,index)=>{
      creaditValue.push(item.creaditValue);
      familyName.push(item.name);
      qoqValue.push(item.qoqValue)
    })
    for (let i = 0; i < creaditValue.length; i++) {
      dataShadow.push(yMin);
      maxShadow.push(yMax);
    }
    // for (let i = 0; i < data.length; i++) {
    //   maxShadow.push(yMax);
    // }
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
          data: familyName,//['自变量学员','睿博学院','派学院','芝士学院','芒格学院','狐逻&泰罗'],

        }
      ],
      yAxis: [
        {
          type: 'value',
          min: -8,
          max: 8,
          interval: 4,
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          min: -300.00,
          max: 300.00,
          interval: 150,
          axisLabel: {
            formatter: '{value} %'
          }
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
  // clickTag = (dimensionId) =>{
  //   this.props.queryAppealDataPage(dimensionId)
  // }
  render() {
    const {queryAppealDatas = {}} = this.props.queryAppealDatas.state;
    return (
      <div>
        {queryAppealDatas.dimensions && queryAppealDatas.dimensions.length>0 && <TreeNames dimensions={queryAppealDatas.dimensions} clickTag={this.props.queryAppealDataPage}/>}
        {queryAppealDatas.creaditDataList && queryAppealDatas.creaditDataList.length>0 && <Echart options={this.drawChart(queryAppealDatas.creaditDataList)} style={{height:"354px"}}/>}
        <EchartBottom/>
      </div>
    );
  }
}

export default CollegeScore;
