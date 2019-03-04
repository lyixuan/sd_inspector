export function commonOptions(params) {
  const {text,legendData=[],xData=[],max,interval,color,series,yAxis,itemGap=19} = params;
  return {
    title: {
      text,
      x:'center',
      textStyle:{
        color:'#fff',
        fontSize:18
      },
      top:54,
    },
    grid:{
      top:166 ,
      left:64,
      height:234,
    },
    legend: {
      bottom: 34,
      textStyle:{
        color:'#bdc0c6',
        fontSize:12
      },
      itemGap,
      itemWidth:10,
      itemHeight:10,
      data:legendData
    },
    tooltip: {
      trigger: 'axis',
      textStyle:{
        align:'left',
        // color:'#103069',
        // fontSize:12,
      },
      // padding:20,
      // backgroundColor:'rgba(255,255,255,0.8)' ,
  // axisPointer: {
      //   type: 'cross',
      //   crossStyle: {
      //     color: '#999'
      //   }
      // }
    },
    xAxis: [
      {
        axisLine:{
          lineStyle:{
            color:'#bdc0c6'
          }
        },
        axisLabel:{// 横坐标轴标签
          interval:0
        },
        axisTick:{
          show:false,
        },
        type: 'category',
        data: xData,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [{
      axisLine:{
        lineStyle:{
          color:'#bdc0c6'
        }
      },
      axisTick:{
        show:false,
      },
      type: 'value',
      splitLine:{
        show:false
      },
      min: 0,
      max,
      interval,
      axisLabel: {
        formatter: '{value}'
      },
    },yAxis?yAxis:null],
    color,
    series: [
      {
        name:legendData[0].name,
        ...series[0],
      },
      {
        name:legendData[1].name,
        ...series[1],
      },
      {
        name:legendData[2].name,
        ...series[2],
      },
    ],
    // toolbox: {
    //   feature: {
    //     dataView: {show: true, readOnly: false},
    //     magicType: {show: true, type: ['line', 'bar']},
    //     restore: {show: true},
    //     saveAsImage: {show: true}
    //   }
    // },
  };
}
