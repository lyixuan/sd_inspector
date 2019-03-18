
export function famProOPtion(param, mapInfo,id,pro,unit,type){
  /*
  * @id: 区分集团和省份  pro、fam
  * @pro: 省份名称
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
  const myLegend = pro ? param[`legend_${type}`]: param.legend;
  const dataAll = mapInfo && mapInfo[type] ? mapInfo[type] : emptyData;
  let text='';
  if(id === 'pro'){
    // 省级查询
    text=`各省${param.name}`
  }else if(id === 'fam'){
    // 家族查询
    if(pro){
      text=`家族${param.name}（${pro}）`
    }else {
      text=`各家族${param.name}（集团）`
    }
  }
  const _html =function(i) {
    return `<div>
<div style="color:#052664;font-size:14px;height:30px;border-bottom: 1px dashed darkblue;margin-bottom: 10px;">${dataAll.province[i]}${param.name}:共1000人</div>
<div style="margin-bottom: 8px">${ myLegend[0]}:${dataAll.data1[i]}${unit}</div>
<div style="margin-bottom: 8px">${ myLegend[1]}:${dataAll.data2[i]}${unit}</div>
<div style="margin-bottom: 8px">${ myLegend[2]}:${dataAll.data3[i]}人</div>
<div style="margin-bottom: 8px">${ myLegend[3]}:${dataAll.data4[i]}人</div>
</div>`
  } ;
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
    tooltip: {
      // trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      backgroundColor:'#fff',
      textStyle: {
        align: 'left',
        color:'#052664',
        fontSize:12,
      },
      // formatter:'<div style=" width:193px;height:120px;box-shadow:0 0 12px 0; border-radius: 3px;padding:12px 0 0 16px ">{b}<br />{a2}: {c2}人<br />{a3}: {c3}人<br />{a0}: {c0}人<br />{a1}: {c1}人</div>',
      formatter:function(params) {
        return `<div style=" box-shadow:0 0 12px 0; border-radius: 3px;padding:12px 3px 3px 16px ">${_html(params.dataIndex)}</div>`;
      },
      padding: 15,
    },
    legend: {
      bottom: 20,
      textStyle: {
        fontSize: '12px'
      },
      itemWidth: 10,
      itemHeight: 10,
      data:  myLegend
    },
    color:['#0080FF','#FF4165','rgba(255,255,255,0)','#52C9C2','#FD9E3B'],
    grid: {
      // width:980,
      top:48,
      left: 35,
      bottom: 33,
      // containLabel: true
    },
    xAxis: [{
      type: 'value',
      axisTick: {
        show: false,
      },
      show:false,
    },{
      type: 'value',
      show:false,
    }],
    yAxis: {
      inverse:true,
      type: 'category',
      axisTick: {
        show: false,
      },
      show:false,
    },
    series: [{
      name:  myLegend[0],
      type: 'line',
      xAxisIndex: 1,
      symbol: 'circle',
      symbolSize: 6,
      data:  dataAll.data1
    },{
      name:  myLegend[1],
      type: 'line',
      xAxisIndex: 1,
      symbol: 'circle',
      symbolSize: 6,
      data: dataAll.data2
    }, {
      type: 'bar',
      barWidth: 10,
      label: {
        show: true,
        formatter:function (params) {
          return params.name
        },
        position:  [0, 0],
        color:'#000',
        fontSize:'14px'
      },
      data:  dataAll.province
    }, {
      name:   myLegend[2],
      type: 'bar',
      barWidth: 10,
      label: {
        show: true,
        position: 'right',
        color:'#000',
        fontSize:'12px',
      },
      data: dataAll.data3
    }, {
      name:   myLegend[3],
      type: 'bar',
      barWidth: 10,
      label: {
        show: true,
        position: 'right',
        color:'#000',
        fontSize:'12px',
      },
      data: dataAll.data4
    }
    ]
  };
}
