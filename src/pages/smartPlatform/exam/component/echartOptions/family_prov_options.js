
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
    yName:[],
    data1:[],
    data2:[],
    data3:[],
    data4:[],
  };
  const myLegend = pro ? param[`legend_${type}`]: param.legend;
  const dataAll = mapInfo && mapInfo[type] ? mapInfo[type] : emptyData;
  dataAll.yName = [];
  dataAll.dataMap1 = [];
  dataAll.dataMap2 = [];
  dataAll.dataMap3 = [];
  dataAll.dataMap4 = [];
  dataAll.province.forEach((v,i)=>{
    const familyName = dataAll.familyName?dataAll.familyName:undefined;
    if(familyName){
      dataAll.yName.push({name:`${v}|${familyName[i]}`,value:400})
    }else {
      dataAll.yName.push({name:`${v}`,value:400})
    }
    dataAll.dataMap1.push({name:v,value:dataAll.data1[i]});
    dataAll.dataMap2.push({name:v,value:dataAll.data2[i]});
    dataAll.dataMap3.push({name:v,value:dataAll.data3[i]});
    dataAll.dataMap4.push({name:v,value:dataAll.data4[i]});
  });
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
    const total = parseFloat(dataAll.data3[i]) + parseFloat(dataAll.data4[i]);
    return `<div>
<div style="color:#052664;font-size:14px;height:30px;border-bottom: 1px dashed darkblue;margin-bottom: 10px;">${dataAll.yName[i].name}${param.name}:共${total}人</div>
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
      // axisPointer: { // 坐标轴指示器，坐标轴触发有效
      //   type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      // },
      backgroundColor:'rgba(255,255,255,.8)',
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
      data:  dataAll.dataMap1
    },{
      name:  myLegend[1],
      type: 'line',
      xAxisIndex: 1,
      symbol: 'circle',
      symbolSize: 6,
      data: dataAll.dataMap2
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
      data:  dataAll.yName
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
      data: dataAll.dataMap3
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
      data: dataAll.dataMap4
    }
    ]
  };
}
