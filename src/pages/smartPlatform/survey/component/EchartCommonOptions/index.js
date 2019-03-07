function commonOptions(params) {
  const { text, legendData = [], series, xData = [], color, yAxis, itemGap = 19, formatter } = params;
  return {
    title: {
      text,
      x: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 18
      },
      top: 54,
    },
    grid: {
      top: 166,
      left: 64,
      right:20,
      height: 234,
    },
    legend: {
      bottom: 34,
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
      // backgroundColor:'rgba(255,255,255,0.8)' ,
    },
    xAxis: [
      {
        axisLine: {
          lineStyle: {
            color: '#bdc0c6',
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
    series ,
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
    legendData: [{ name: '考试计划人数', icon: 'rect' }, { name: '通知人数', icon: 'rect' }, { name: '触达人数', icon: 'rect' },{ name: '触达率', icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAEAQMAAABSuEaRAAAAAXNSR0IB2cksfwAAAAZQTFRF+zd3AAAAP9uspgAAAAJ0Uk5T/wDltzBKAAAAEUlEQVR4nGNgYGhggOH//xsAEwsD/x/9IEYAAAAASUVORK5CYII=',
    }],
    xData: data1.dateArr,
    color: ['#1e93ff', "#7363ec", '#1ec47a', '#fc3676'],
    formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}',
    series: [{
      name: '考试计划人数',
      type: 'bar',
      barWidth: 15,
      barCategoryGap: '40%',
      data: data1.dataArr1
    }, {
      name: '通知人数',
      type: 'bar',
      barWidth: 15,
      data: data1.dataArr2
    }, {
      name: '触达人数',
      type: 'bar',
      barWidth: 15,
      data: data1.dataArr3
    },{
      name: '触达率',
      type: 'line',
      yAxisIndex: 1,
      symbol: 'circle',
      symbolSize: 6,
      data: data1.dataArr4,
      itemStyle: { normal: { label: { show: true, formatter: '{c}%' } } },
    }],
    yAxis: [{
      axisLine: {
        lineStyle: {
          color: '#bdc0c6'
        }
      },
      axisTick: {
        show: false,
      },
      type: 'value',
      splitLine: {
        show: false
      },
      // min: 0,
      // max:25000,
      // interval:5000,
      axisLabel: {
        formatter: '{value}'
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
    legendData: [{ name: '考试计划人数', icon: 'rect' }, { name: '准考证填写人数', icon: 'rect' }, {
      name: '准考证填写占比',
      icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAEAQMAAABSuEaRAAAAAXNSR0IB2cksfwAAAAZQTFRF+zd3AAAAP9uspgAAAAJ0Uk5T/wDltzBKAAAAEUlEQVR4nGNgYGhggOH//xsAEwsD/x/9IEYAAAAASUVORK5CYII=',
    }],
    xData: data2.dateArr,
    color: ['#1e93ff', "#fc595b", '#fc3676'],
    formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}%',
    series: [{
      name: '考试计划人数',
      type: 'bar',
      barWidth: 15,
      barCategoryGap: '60%',
      data: data2.dataArr1
    }, {
      name: '准考证填写人数',
      type: 'bar',
      barWidth: 15,
      data: data2.dataArr2
    }, {
      name: '准考证填写占比',
      type: 'line',
      yAxisIndex: 1,
      symbol: 'circle',
      symbolSize: 6,
      data: data2.dataArr3,
      itemStyle: { normal: { label: { show: true, formatter: '{c}%' } } },
    }],
    yAxis: [{
      axisLine: {
        lineStyle: {
          color: '#bdc0c6'
        }
      },
      axisTick: {
        show: false,
      },
      type: 'value',
      splitLine: {
        show: false
      },
      // min: 0,
      // max:25000,
      // interval:5000,
      axisLabel: {
        formatter: '{value}'
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
