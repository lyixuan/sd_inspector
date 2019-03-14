export function famProOPtion(param,data,id){
  let text='';
  if(id === 'pro'){
    text=`各省${param.name}`
  }else if(id === 'fam'){
    text=`各家族${param.name}（集团）`
  }
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
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      bottom: 20,
      textStyle: {
        fontSize: '12px'
      },
      itemWidth: 10,
      itemHeight: 10,
      data: param.legend
    },
    color:['#0080FF','#FF4165','#fff','#52C9C2','#FD9E3B'],
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
      type: 'category',
      axisTick: {
        show: false,
      },
      show:false,
    },
    series: [{
      name: param.legend[0],
      type: 'line',
      xAxisIndex: 1,
      symbol: 'circle',
      symbolSize: 6,
      data: [18203, 23489, 29034, 104970, 131744, 630230]
    },{
      name: param.legend[1],
      type: 'line',
      xAxisIndex: 1,
      symbol: 'circle',
      symbolSize: 6,
      data: [19325, 23438, 31000, 121594, 134141, 681807]
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
      data:  [{name:'巴西',value:134141},
        {name:'印尼',value:134141},
        {name:'美国',value:134141},
        {name:'印度',value:134141},
        {name:'中国',value:134141},
        {name:'北京',value:134141}]
    }, {
      name:  param.legend[2],
      type: 'bar',
      barWidth: 10,
      label: {
        show: true,
        position: 'right',
        color:'#000',
        fontSize:'12px',
      },
      data: [18203, 23489, 29034, 104970, 131744, 630230]
    }, {
      name:  param.legend[3],
      type: 'bar',
      barWidth: 10,
      label: {
        show: true,
        position: 'right',
        color:'#000',
        fontSize:'12px',
      },
      data: [19325, 23438, 31000, 121594, 134141, 681807]
    }
    ]
  };
}
