export function fillCollege(dataX,dataY) {
  const option = {
    xAxis: {
      type: 'category',
      data: dataX,
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#F5F6F7'
        }
      },
      axisLabel: {
        color: '#5e5e5e'
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLine: {
        lineStyle: {
          color: '#F5F6F7'
        }
      },
      axisLabel: {
        formatter: '{value}%',
         color: '#8a8c91'
      },
      splitLine:false,
      axisTick: {
        show: false,
      },
    },
    series: [{
      label: {
        normal: {
          show: true,
          position: 'top',
          fontSize: 12,
          formatter: '{c}%',
          color:'#000'
        }
      },
      barWidth: 34,
      data: [
        {value:dataY[0],itemStyle:{color:'#ff6d6d'}},
        {value:dataY[1],itemStyle:{color:'#ff8e57'}},
        {value:dataY[2],itemStyle:{color:'#f29f38'}},
        {value:dataY[3],itemStyle:{color:'#52c9c2'}},
        {value:dataY[4],itemStyle:{color:'#52c9c2'}},
        {value:dataY[5],itemStyle:{color:'#52c9c2'}},
        {value:dataY[6],itemStyle:{color:'#52c9c2'}},
        ],
      type: 'bar'
    }]
  };
  return option
}
