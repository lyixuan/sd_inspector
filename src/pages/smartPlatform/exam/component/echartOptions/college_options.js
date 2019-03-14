function commonOptions(params) {
  const { text, legendData = [], series, xData = [], color, yAxis, itemGap = 19, formatter } = params;
  return {
    title: {
      text,
      x: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight:'normal',
      },
      top: 18,
    },
    grid: {
      top:80,
      bottom: 33,
      left: 75,
      height: 234,
    },
    legend: {
      bottom: 20,
      textStyle: {
        color: '#bdc0c6',
        fontSize: 12
      },
      itemGap,
      itemWidth: 10,
      itemHeight: 10,
      data: legendData
    },
    tooltip: {
      trigger: 'axis',
      textStyle: {
        align: 'left',
        // color:'#103069',
        // fontSize:12,
      },
      formatter,
      padding: 15,
    },
    xAxis: [
      {
        axisLine: {
          lineStyle: {
            color: '#979797',
            fontSize:12
          }
        },
        axisLabel: {// 横坐标轴标签
          interval: 0
        },
        axisTick: {
          show: false,
        },
        type: 'category',
        data: xData,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis,
    color,
    series,
  };
}
export function blendChartOptions(param,data,id,pro) {
  let text='';
  if(id === 'all'){
    text = `各学院${param.name}（集团）`
  }else if(id === 'single'){
    text = `学院${param.name}（${pro}）`
  }else {
    console.error('缺乏参数id：all是所有省份，single是点击省份进去的单个省份')
  }
  const { dataList = {} } = data;
  const { data2 = {} } = dataList;
  const params2 = {
    text,
    legendData:param.legend,
    xData: data2.dateArr,
    color: ['#0080FF', "#FF4165", '#52C9C2','#FD9E3B'],
    formatter: '{b}<br />{a2}: {c2}人<br />{a3}: {c3}人<br />{a0}: {c0}人<br />{a1}: {c1}人',
    series: [ {
      name: param.legend[0],
      type: 'line',
      yAxisIndex: 1,
      symbol: 'circle',
      symbolSize: 6,
      data: data2.dataArr3,
      itemStyle: { normal: { label: { show: true, formatter: '{c}' } } },
    }, {
      name: param.legend[1],
      type: 'line',
      yAxisIndex: 1,
      symbol: 'circle',
      symbolSize: 6,
      data: data2.dataArr2,
      itemStyle: { normal: { label: { show: true, formatter: '{c}' } } },
    },{
      name: param.legend[2],
      type: 'bar',
      barWidth: 15,
      data: data2.dataArr1
    }, {
      name: param.legend[3],
      type: 'bar',
      barWidth: 15,
      data: data2.dataArr2
    }],
    yAxis: [{
      axisLine: {
        lineStyle: {
          color: '#979797'
        }
      },
      axisTick: {
        show: false,
      },
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        formatter: '{value}'
      },
    },{
      show:false,
      type: 'value',
      position: 'right',
      offset: 50,
      axisTick: {
        show: false,
      },
    }, {
      type: 'value',
      min: 0,
      max: 100,
      position: 'right',
      axisTick: {
        show: false,
      },
      axisLabel: {
        formatter: '{value} %'
      }
    }],
  };
  return commonOptions(params2);
}
