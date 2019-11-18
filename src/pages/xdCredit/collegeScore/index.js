import React from 'react';
import { connect } from 'dva';
import BILoading from '@/components/BILoading'
import Echart from '../components/echart'
import EchartBottom from '@/pages/indexPage/ManagementBench/scoreContrast/components/echartBottom';
import Scrollbar from 'react-smooth-scrollbar';

@connect(({xdCreditModal, loading}) => ({
  loading:loading.effects['xdCreditModal/queryAppealDataPage'],
  appealDatas: xdCreditModal.appealDatas || {},
}))
class CollegeScore extends React.Component {
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
    let maxShadow = []
    const seriesDatas = [];
    arr.map((item,index)=>{
      creaditValue.push(item.creaditValue);
      familyName.push(item.name);
      qoqValue.push((item.qoqValue*100).toFixed(2));
      seriesDatas.push({
        itemStyle: this.getItemStyle(item.creaditValue),
        value: item.creaditValue
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
    const barWidth = familyName.length >= 10 ? 20 : 50
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
            rotate: familyName.length >= 10 ? 30:0,
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
          min: yMin>0 ? 0: yMin,
          max: yMax<0 ? 0: yMax,
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
          barWidth,
          data: dataShadow
        },
        { // For shadow
          type: 'bar',
          itemStyle: {
            normal: {color: 'rgba(71,211,255,0.06)'}
          },
          barGap:'-100%',
          barWidth,
          data: maxShadow,
          animation: false
        },
        {
          name:'均分',
          type:'bar',
          // itemStyle: {
          //   normal: {color: barBackground,barBorderRadius:borderRadius}
          // },
          barWidth,
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
   if(tabNum === 1||tabNum === 4){
     orgType = "college"
    }else if(tabNum === 2){
      orgType = "family"
    }else if(tabNum === 3){
     orgType = "group"
   }
    return orgType
  }
  getEchartRender = creaditDataList => {
    return <>
      {
        creaditDataList && creaditDataList.length > 0 &&
          <Echart
            options={this.drawChart(creaditDataList)}
            style={{ height:"300px", width: creaditDataList.length * 50}}
          />
      }
    </>
  }
  render() {
    const {creaditDataList = []} = this.props.appealDatas;
    return (
      <div>
        <BILoading isLoading={this.props.loading}> 
            {/* <div className={styles.collegeScore}>
              
            </div> */}
            <Scrollbar
              // style={{ width: '100%', height: 340 }}
             >
              {this.getEchartRender(creaditDataList)}
            </Scrollbar>
            <EchartBottom/>
        </BILoading>
      </div>
    );
  }
}

export default CollegeScore;
