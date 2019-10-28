import React from 'react';
import { connect } from 'dva';
// import styles from './style'
import TreeNames from '../components/treeNames'
import Echart from '../components/Echart'
import EchartBottom from '../components/echartBottom'
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class CollegeScore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      queryAppealDatas:{}
    }
  }
  componentDidMount() {

  }

  drawChart = () =>{
    let data = [6.89, 4.00, 2.00, 3.76, 5.08, 7.00]
    let yMax = 8
    let yMin = -8
    let dataShadow = []
    let maxShadow = []

    for (let i = 0; i < data.length; i++) {
      dataShadow.push(yMin);
    }
    for (let i = 0; i < data.length; i++) {
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
          data: ['自变量学员','睿博学院','派学院','芝士学院','芒格学院','狐逻&泰罗'],
          axisPointer: {
            type: 'shadow'
          }
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
          data:data
        },{
          name:'环比',
          type:'line',
          yAxisIndex: 1,
          itemStyle: {
            normal: {color: '#F5A623'}
          },
          data:[10.00, 100.00, 20.00, 120.00, -20.00, 40.00]
        }
      ]

    }
    return options
  }
  clickTag = (dimensionId) =>{
    this.props.queryAppealDataPage(dimensionId)
  }
  render() {
    const {queryAppealDatas} = this.props.queryAppealDatas.state;
    return (
      <div>
        <TreeNames dimensions={queryAppealDatas.dimensions} clickTag={this.clickTag}/>
        <Echart options={this.drawChart()} style={{height:"354px"}}/>
        <EchartBottom/>
      </div>
    );
  }
}

export default CollegeScore;
