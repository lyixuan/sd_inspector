// name:人均，value:触达人数
export function groupOPtion(param,data){
  const {tabId} = param;
  const {dataPro = [],data1,data2,data3=[]} = data[tabId]?data[tabId]:{};

  const _html =function(i) {
    if(isEmpty(data3)){
      return `<div>
<div style="color:#052664;text-align:center;font-size:14px;width:183px;height:30px;border-bottom: 1px dashed darkblue;margin-bottom: 10px;">${dataPro[i].name}</div>
<div style="margin-bottom: 8px">${param.legendGroup[0].split('/')[0]}:${data1[i].name}人</div>
<div style="margin-bottom: 8px">${param.legendGroup[0].split('/')[1]}:${data1[i].value}人</div>
<div style="margin-bottom: 8px">${param.legendGroup[1].split('/')[0]}:${data2[i].name}人</div>
<div style="margin-bottom: 8px">${param.legendGroup[1].split('/')[1]}:${data2[i].value}人</div>
<div style="margin-bottom: 8px">${param.legendGroup[2].split('/')[0]}:${data3[i].name}人</div>
<div style="margin-bottom: 8px">${param.legendGroup[2].split('/')[1]}:${data3[i].value}人</div>
</div>`
    }else {
      return `<div>
<div style="color:#052664;text-align:center;font-size:14px;width:183px;height:30px;border-bottom: 1px dashed darkblue;margin-bottom: 10px;">${dataPro[i].name}</div>
<div style="margin-bottom: 8px">${param.legendGroup[0].split('/')[0]}:${data1[i].name}人</div>
<div style="margin-bottom: 8px">${param.legendGroup[0].split('/')[1]}:${data1[i].value}人</div>
<div style="margin-bottom: 8px">${param.legendGroup[1].split('/')[0]}:${data2[i].name}人</div>
<div style="margin-bottom: 8px">${param.legendGroup[1].split('/')[1]}:${data2[i].value}人</div>
</div>`
    }

  } ;
  const isEmpty = function(obj) {
    const bol = Array.prototype.isPrototypeOf(obj) && obj.length !== 0;
    return bol;
  };
  const dataSum = function() {
    let datas = [];
    if(isEmpty(data3)){
      for (let i = 0; i < data1.length; i++) {
        datas.push(data1[i].value + data2[i].value+ data3[i].value);
      }
    }else if(isEmpty(data1)) {
      for (let i = 0; i < data1.length; i++) {
        datas.push(data1[i].value + data2[i].value);
      }
    }

    return datas;
  }();
  const series = ()=>{
    if(isEmpty(data3)){
      return [{
        type: 'bar',
        stack: 'sum',
        label: {
          normal: {
            show: true,
            position: 'insideLeft',
            color:'#000'
          }
        },
        data: dataSum
      }]
    }else {
      return [ {
        name: `${param.legendGroup[2]}`,
        type: 'bar',
        barWidth: 20,
        stack: 'sum',
        label: {
          normal: {
            show: true,
            position: 'insideRight',
            formatter:function (params) {
              return `${params.value}/${params.name}`
            },
          }
        },
        data: data3
      },{
        type: 'bar',
        stack: 'sum',
        label: {
          normal: {
            show: true,
            position: 'insideLeft',
            color:'#000'
          }
        },
        data: dataSum
      }]
    }
  };
  const color=!isEmpty(data3)?['rgba(255,255,0,0)','#52C9C2','#FD9E3B','#46A3EF','#fff',]:['rgba(255,255,0,0)','#52C9C2','#FD9E3B','#fff',];
  const legendData = isEmpty(data3)?[param.legendGroup[0], param.legendGroup[1],param.legendGroup[2]]:[param.legendGroup[0], param.legendGroup[1]];
  return {
    title: {
      text: `各小组${param.name}（集团）`,
      x: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight:'normal',
      },
      top: 18,
    },
    tooltip : {
      // trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      backgroundColor:'#fff',
      textStyle: {
        align: 'left',
        color:'#052664',
        fontSize:12,
      },
      formatter:function(params) {
        return `<div style="width:213px;box-shadow:0 0 12px 0; border-radius: 3px;padding:12px 0 3px 16px ">${_html(params.dataIndex)}</div>`;
      },
    },
    legend: {
      bottom: 20,
      textStyle: {
        fontSize: '12px'
      },
      itemWidth: 10,
      itemHeight: 10,
      data: legendData,
    },
    color,
    grid: {
      top:48,
      left: 35,
      bottom: 33,
      containLabel: true
    },
    xAxis:  {
      type: 'value',
      show:false
    },
    yAxis: {
      type: 'category',
      show:false,
      inverse:true,
    },
    series: [
      {
        type: 'bar',
        barWidth: 38,
        barGap:'-60%',
        z:6,
        label: {
          show: true,
          formatter:function (params) {
            return params.name
          },
          position:  [0, 0],
          color:'#000',
          fontSize:'14px',
          borderWidth:100
        },
        data: dataPro
      },
      {
        name: `${param.legendGroup[0]}`,
        type: 'bar',
        barWidth: 20,
        stack: 'sum',
        label: {
          normal: {
            borderWidth:100,
            show: true,
            position: 'insideRight',
            formatter:function (params) {
              return `${params.value}/${params.name}`
            },
          }
        },
        data: data1
      },
      {
        name: `${param.legendGroup[1]}`,
        type: 'bar',
        barWidth: 20,
        stack: 'sum',
        label: {
          normal: {
            show: true,
            position: 'insideRight',
            formatter:function (params) {
              return `${params.value}/${params.name}`
            },
          }
        },
        data: data2
      },
      ...series(),
    ]
  };
}
