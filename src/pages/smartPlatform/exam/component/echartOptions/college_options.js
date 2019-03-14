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
      top:120,
      bottom: 33,
      left: 75,
      height: 190,
      // width:980,
    },
    legend: {
      bottom: 20,
      textStyle: {
        color: '#bdc0c6',
        fontSize: 12
      },
      itemGap,
      itemWidth: 9,
      itemHeight: 9,
      data: legendData
    },
    tooltip: {
      // trigger: '',
      backgroundColor:'#fff',
      textStyle: {
        align: 'left',
        color:'#052664',
        fontSize:12,
      },
      formatter,
      padding: 15,
    },
    xAxis: [
      {
        axisLine: {
          lineStyle: {
            color: '#d8d8d8',
            fontSize:12
          }
        },
        axisLabel: {// 横坐标轴标签
          interval: 0,
          color: '#979797',
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
  console.log(param)
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
  const dataAll = {
    dateArr:['瑞博','瑞博1','瑞博2','瑞博3'],
    data3:[1000,2000,3000,4000],
    data4:[1000,2000,3000,4000],
    data1:[100,200,300,400],
    data2:[200,200,400,300],
  };
  const _html =function(i) {
    return `<div>
<div style="color:#052664;font-size:14px;width:183px;height:30px;border-bottom: 1px dashed darkblue;margin-bottom: 10px;">${dataAll.dateArr[i]}${param.name}:共1000人</div>
<div style="margin-bottom: 8px">${param.legend[0]}:${dataAll.data1[i]}人</div>
<div style="margin-bottom: 8px">${param.legend[1]}:${dataAll.data2[i]}人</div>
<div style="margin-bottom: 8px">${param.legend[2]}:${dataAll.data3[i]}人</div>
<div style="margin-bottom: 8px">${param.legend[3]}:${dataAll.data4[i]}人</div>
</div>`
  } ;

  const params2 = {
    text,
    legendData:param.legend,
    xData: dataAll.dateArr,
    color: ['#0080FF', "#FF4165", '#52C9C2','#FD9E3B'],
    formatter:function(params) {
      console.log(params);
      return `<div style=" width:213px;box-shadow:0 0 12px 0; border-radius: 3px;padding:12px 0 3px 16px ">${_html(params.dataIndex)}</div>`;
    },
      // '<div style=" width:193px;height:120px;box-shadow:0 0 12px 0; border-radius: 3px;padding:12px 0 0 16px ">{b}{333333}<br />{a2}: {c2}人<br />{a3}: {c3}人<br />{a0}: {c0}人<br />{a1}: {c1}人</div>',
    series: [ {
      name: param.legend[0],
      type: 'line',
      yAxisIndex: 1,
      symbol: 'circle',
      symbolSize: 6,
      data: dataAll.data1,
      smooth: true,
      itemStyle: { normal: { label: { show: true, formatter: '{c}' } } },
    }, {
      name: param.legend[1],
      type: 'line',
      yAxisIndex: 1,
      symbol: 'circle',
      symbolSize: 6,
      data: dataAll.data2,
      smooth: true,
      itemStyle: { normal: { label: { show: true, formatter: '{c}' } } },
    },{
      name: param.legend[2],
      type: 'bar',
      barWidth: 15,
      data: dataAll.data3
    }, {
      name: param.legend[3],
      type: 'bar',
      barWidth: 15,
      data: dataAll.data4
    }],
    yAxis: [{
      axisLine: {
        lineStyle: {
          color: '#d8d8d8'
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
        formatter: '{value}',
        color: '#979797',
      },
    },{
      show:false,
      type: 'value',
      position: 'right',
      offset: 50,
      splitLine: {
        show: false
      },
      axisTick: {
        show: false,
      },
    }, {
      // show:false,
      axisLine: {
        lineStyle: {
          color: '#d8d8d8'
        }
      },
      type: 'value',
      position: 'right',
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false
      },
      min:0,
      max:100,
      axisLabel: {
        formatter: '{value} %',
        color: '#979797',
      }
    }],
  };
  return commonOptions(params2);
}
