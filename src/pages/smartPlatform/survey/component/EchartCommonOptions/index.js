function commonOptions(params) {
  const { text, legendData = [], series, xData = [], color, yAxis, itemGap = 19,formatter } = params;
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
      // trigger: 'line',
      textStyle: {
        align: 'left',
        color:'#103069',
        fontSize:12,
      },
      formatter,
      padding: 15,
      backgroundColor:'#fff' ,
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
  const _html1 = function(i,name) {
    return `<div>
        <div style="color:#052664;text-align:center;font-size:14px;height:30px;border-bottom: 1px dashed darkblue;margin-bottom: 15px;">${name}</div>
        <div style="margin-bottom: 15px">考试计划人数:${data1.dataArr1[i]}人</div>
        <div style="margin-bottom: 15px">通知人数:${data1.dataArr2[i]}人</div>
        <div style="margin-bottom: 15px">触达人数:${data1.dataArr3[i]}人</div>
        <div style="margin-bottom: 15px">触达率:${data1.dataArr4[i]}%</div>
    </div>`
  };
  const _html2 = function(i,name) {
    return `<div>
            <div style="color:#052664;text-align:center;font-size:14px;height:30px;border-bottom: 1px dashed darkblue;margin-bottom: 15px;">${name}</div>
            <div style="margin-bottom: 15px">考试计划人数:${data2.dataArr1[i]}人</div>
            <div style="margin-bottom: 15px">准考证填写人数:${data2.dataArr2[i]}人</div>
            <div style="margin-bottom: 15px">准考证填写率:${data2.dataArr3[i]}%</div>
        </div>`
  };
  const params1 = {
    text: '报考通知数据概览',
    legendData: [{ name: '考试计划人数', icon: 'circle' }, { name: '通知人数', icon: 'circle' }, { name: '触达人数', icon: 'circle' }, {
      name: '触达率',
    }],
    xData: data1.dateArr,
    color: ['#52C9C2', "#30B0E6", '#FD9E3B', '#CC73FF'],
    formatter: function(params) {
      return `<div style="min-width:200px;box-shadow:0 0 12px 0; border-radius: 5px;padding:12px 16px 8px ">${_html1(params.dataIndex,params.name)}</div>`;
    },
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
      symbolSize: 2,
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
      name: '准考证填写率', }],
    xData: data2.dateArr,
    color: ['#52C9C2', '#FD9E3B', '#CC73FF'],
    formatter:  function(params) {
      return `<div style="min-width:200px;box-shadow:0 0 12px 0; border-radius: 5px;padding:12px 16px 8px ">${_html2(params.dataIndex,params.name)}</div>`;
    },
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
      name: '准考证填写率',
      type: 'line',
      yAxisIndex: 1,
      symbolSize: 2,
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
