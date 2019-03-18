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
        fontSize: '12px'
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

export function blendChartOptions(param,mapInfo,id,pro,unit,type) {
  /*
  * @id:省份名称
  * @pro: 区分集团和省份  single、all
  * @unit: data1和data2的单位
  * @type:  examPlan, examNotice, examTicket
  * @mapInfo: 构造好的数据
   * {
        examNotice:{},
        examPlan:{},
        examTicket:{},
      };
  * */
  const emptyData = {
    province:[],
    data1:[],
    data2:[],
    data3:[],
    data4:[],
  };
  const myLegend = type ? param[`legend_${type}`]:param.legend;
  let text='';
  if(id === 'all'){
    text = `各学院${param.name}（集团）`
  }else if(id === 'single'){
    text = `学院${param.name}（${pro}）`
  }else {
    console.error('缺乏参数id：all是所有省份，single是点击省份进去的单个省份')
  }
  const dataAll = mapInfo && mapInfo[type] ? mapInfo[type] : emptyData;
  const _html =function(i) {
    return `<div>
<div style="color:#052664;font-size:14px;height:30px;border-bottom: 1px dashed darkblue;margin-bottom: 10px;">${dataAll.province[i]}${param.name}:共1000人</div>
<div style="margin-bottom: 8px">${ myLegend[0]}:${dataAll.data1[i]}${unit}</div>
<div style="margin-bottom: 8px">${ myLegend[1]}:${dataAll.data2[i]}${unit}</div>
<div style="margin-bottom: 8px">${ myLegend[2]}:${dataAll.data3[i]}人</div>
<div style="margin-bottom: 8px">${ myLegend[3]}:${dataAll.data4[i]}人</div>
</div>`
  } ;

  const params2 = {
    text,
    legendData: myLegend,
    xData: dataAll.province,
    color: ['#0080FF', "#FF4165", '#52C9C2','#FD9E3B'],
    formatter:function(params) {
      console.log(params);
      return `<div style=" box-shadow:0 0 12px 0; border-radius: 3px;padding:12px 3px 3px 16px ">${_html(params.dataIndex)}</div>`;
    },
      // '<div style=" width:193px;height:120px;box-shadow:0 0 12px 0; border-radius: 3px;padding:12px 0 0 16px ">{b}{333333}<br />{a2}: {c2}人<br />{a3}: {c3}人<br />{a0}: {c0}人<br />{a1}: {c1}人</div>',
    series: [ {
      name:  myLegend[0],
      type: 'line',
      yAxisIndex: 1,
      symbol: 'circle',
      symbolSize: 6,
      data: dataAll.data1,
      smooth: true,
      itemStyle: { normal: { label: { show: true, formatter: '{c}' } } },
    }, {
      name:  myLegend[1],
      type: 'line',
      yAxisIndex: 1,
      symbol: 'circle',
      symbolSize: 6,
      data: dataAll.data2,
      smooth: true,
      itemStyle: { normal: { label: { show: true, formatter: '{c}' } } },
    },{
      name:  myLegend[2],
      type: 'bar',
      barWidth: 15,
      data: dataAll.data3
    }, {
      name:  myLegend[3],
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
