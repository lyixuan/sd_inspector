// name:人均，value:触达人数
export function groupOPtion(param,data){
  const {tabId} = param;
  const {dataPro = [],data1,data2,data3=[],data4=[],data5=[],dataRatio=[]} = data[tabId]?data[tabId]:{};

  const _html =function(i) {
    const name = param.name==='准考证填写人数'?'考试计划人数':param.name;
    if(isEmpty(data3)){
      return `<div>
<div style="color:#052664;text-align:center;font-size:14px;width:223px;height:30px;border-bottom: 1px dashed darkblue;margin-bottom: 15px;">${dataPro[i].name}</div>
<div style="margin-bottom: 15px">${name}:共${data4[i]}人</div>
<div style="margin-bottom: 15px">${param.legendGroup[3].split('/')[0]}:${data5[i].value}人</div>
<div style="margin-bottom: 15px">${param.legendGroup[3].split('/')[1]}:${data5[i].name}</div>
<div style="margin-bottom: 15px">${param.legendGroup[2].split('/')[0]}:${data3[i].value}人</div>
<div style="margin-bottom: 15px">${param.legendGroup[2].split('/')[1]}:${data3[i].name}</div>
<div style="margin-bottom: 15px">${param.legendGroup[0].split('/')[0]}:${data1[i].value}</div>
<div style="margin-bottom: 15px">${param.legendGroup[0].split('/')[1]}:${data1[i].name}</div>
<div style="margin-bottom: 15px">${param.legendGroup[1].split('/')[0]}:${data2[i].value}</div>
<div style="margin-bottom: 15px">${param.legendGroup[1].split('/')[1]}:${data2[i].name}</div>
</div>`
    }else {
      return `<div>
<div style="color:#052664;text-align:center;font-size:14px;width:223px;height:30px;border-bottom: 1px dashed darkblue;margin-bottom: 15px;">${dataPro[i].name}</div>
<div style="margin-bottom: 15px">${name}:共${data4[i]}人</div>
<div style="margin-bottom: 15px">${param.legendGroup[0].split('/')[0]}:${data1[i].value}人</div>
<div style="margin-bottom: 15px">${param.legendGroup[0].split('/')[1]}:${data1[i].name}人</div>
<div style="margin-bottom: 15px">${param.legendGroup[1].split('/')[0]}:${data2[i].value}人</div>
<div style="margin-bottom: 15px">${param.legendGroup[1].split('/')[1]}:${data2[i].name}人</div>
</div>`
    }

  } ;
  const isEmpty = function(obj) {
    return Array.prototype.isPrototypeOf(obj) && obj.length !== 0;
  };
  const dataSum = function() {
    let datas = [];
    if(isEmpty(data3)){
      for (let i = 0; i < dataRatio.length; i++) {
        datas.push({name:dataRatio[i],value:data1[i].value + data2[i].value+ data3[i].value});
      }
    }else if(isEmpty(data1)) {
      for (let i = 0; i < data1.length; i++) {
        datas.push(data1[i].value + data2[i].value);
      }
    }

    return datas;
  }();
  const series = ()=>{
    if(!isEmpty(data3)){
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
            position: 'insideLeft',
            formatter:function (params) {
              return `${params.value}/${params.name}`
            },
          }
        },
        data:data3
      },{
        type: 'bar',
        stack: 'sum',
        label: {
          normal: {
            show: true,
            position: 'insideLeft',
            formatter:function (params) {
              return `${params.name}%`
            },
            color:'#000'
          }
        },
        data: dataSum
      }]
    }
  };
  const color=isEmpty(data3)?['rgba(255,255,0,0)','#52C9C2','#FD9E3B','#46A3EF','#fff',]:['rgba(255,255,0,0)','#52C9C2','#FD9E3B','#fff',];
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
        type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
      },
      backgroundColor:'#fff',
      textStyle: {
        align: 'left',
        color:'#052664',
        fontSize:12,
      },
      formatter:function(params) {
        return `<div style="min-width:200px;box-shadow:0 0 12px 0; border-radius: 5px;padding:12px 16px 8px ">${_html(params.dataIndex)}</div>`;
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
        name: `${param.legendGroup[1]}`,
        type: 'bar',
        barWidth: 20,
        stack: 'sum',
        label: {
          normal: {
            show: true,
            position: 'insideLeft',
            formatter:function (params) {
              return `${params.value}/${params.name}`
            },
          }
        },
        data: data2
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
            position: 'insideLeft',
            formatter:function (params) {
              return `${params.value}/${params.name}`
            },
          }
        },
        data: data1
      },
      ...series(),
    ]
  };
}
