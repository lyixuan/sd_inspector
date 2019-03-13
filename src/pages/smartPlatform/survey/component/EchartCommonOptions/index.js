function commonOptions(params) {
  const { text, legendData = [], series, xData = [], color, yAxis, itemGap = 19, formatter } = params;
  return {
    title: {
      text,
      x: 30,
      textStyle: {
        fontSize:16,
        color: '#18191A',
        fontWeight:'normal'
      },
      top: 15,
    },
    grid: {
      top: 80,
      left:90,
      right:30,
      height: 200,
    },
    legend: {
      bottom: 40,
      textStyle: {
        color: '#bdc0c6',
        fontSize: 12
      },
      itemGap,
      itemWidth: 7,
      itemHeight: 7,
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
      // backgroundColor:'rgba(255,255,255,0.8)' ,
    },
    xAxis: [
      {
        axisLine: {
          lineStyle: {
            color: '#F5F6F7',
            fontSize:12
          }
        },
        axisLabel: {// 横坐标轴标签
          color: '#787A7F',
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
export function chartOptions(data) {
  const { dataList = {} } = data;
  const { data1 = {}, data2 = {} } = dataList;
  const params1 = {
    text: '报考通知数据概览',
    legendData: [{ name: '考试计划人数', icon: 'circle' }, { name: '通知人数', icon: 'circle' }, { name: '触达人数', icon: 'circle' }, {
      name: '触达率',
    }],
    xData: data1.dateArr,
    color: ['#52C9C2', "#30B0E6", '#FD9E3B', '#CC73FF'],
    formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}<br />{a3}: {c3}%',
    series: [{
      name: '考试计划人数',
      type: 'bar',
      barCategoryGap: '20%',
      barWidth: 9,
      data: data1.dataArr1
    }, {
      name: '通知人数',
      type: 'bar',
      barWidth: 9,
      data: data1.dataArr2
    }, {
      name: '触达人数',
      type: 'bar',
      barWidth: 9,
      data: data1.dataArr3
    }, {
      name: '触达率',
      type: 'line',
      yAxisIndex: 1,
      symbol: 'circle',
      symbolSize: 6,
      data: data1.dataArr4,
      // itemStyle: { normal: { label: { show: true, formatter: '{c}%' } } },
    }],
    yAxis: [{
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      },
      splitLine:{
        lineStyle: {
          color: '#F5F6F7'
        }
      },
      axisTick: {
        show: false,
      },
      type: 'value',
      // min: 0,
      // max:25000,
      // interval:5000,
      axisLabel: {
        formatter: '{value}',
        color:'#787A7F'
      },
    }, {
      show: false,
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: {
        formatter: '{value} %'
      }
    }],
    itemGap: 30,
  };
  const params2 = {
    text: '准考证填写趋势',
    legendData: [{ name: '考试计划人数', icon: 'circle' }, { name: '准考证填写人数', icon: 'circle' }, {
      name: '准考证填写占比', }],
    xData: data2.dateArr,
    color: ['#52C9C2', '#FD9E3B', '#CC73FF'],
    formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}%',
    series: [{
      name: '考试计划人数',
      type: 'bar',
      barWidth: 9,
      data: data2.dataArr1
    }, {
      name: '准考证填写人数',
      type: 'bar',
      barWidth: 9,
      data: data2.dataArr2
    }, {
      name: '准考证填写占比',
      type: 'line',
      yAxisIndex: 1,
      symbol: 'circle',
      symbolSize: 6,
      data: data2.dataArr3,
      // itemStyle: { normal: { label: { show: true, formatter: '{c}%' } } },
    }],
    yAxis: [{
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      },
      axisTick: {
        show: false,
      },
      type: 'value',
      splitLine:{
        lineStyle: {
          color: '#F5F6F7'
        }
      },
      // min: 0,
      // max:25000,
      // interval:5000,
      axisLabel: {
        formatter: '{value}',
        color:'#787A7F'
      },
    }, {
      show: false,
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: {
        formatter: '{value} %'
      }
    }],
  };
  const option1 = commonOptions(params1);
  const option2 = commonOptions(params2);
  return { option1, option2 }
}
