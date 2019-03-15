
export function groupOPtion(param,data){
  const dataPro= [
    {name:'巴西',value:820},
    {name:'印尼',value:820},
    {name:'美国',value:820},
    {name:'印度',value:820},
    {name:'中国',value:820},
    {name:'北京',value:820}
  ];
  const data1 = [
    {name:'120',value:320},
    {name:'130',value:120},
    {name:'220',value:220},
    {name:'320',value:320},
    {name:'120',value:120},
    {name:'120',value:320},
  ];
  const data2 = [
    {name:'120',value:120},
    {name:'130',value:120},
    {name:'220',value:220},
    {name:'320',value:320},
    {name:'120',value:520},
    {name:'120',value:180},
  ];
  const dataSum = function() {
    let datas = [];
    for (let i = 0; i < data1.length; i++) {

      datas.push(data1[i].value + data2[i].value);
    }
    return datas;
  }();
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
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      bottom: 20,
      textStyle: {
        fontSize: '12px'
      },
      itemWidth: 10,
      itemHeight: 10,
      data: [`${param.legendGroup[0]}`, `${param.legendGroup[1]}`]
    },
    color:['#fff','#52C9C2','#FD9E3B','#fff',],
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
    },
    series: [
      {
        type: 'bar',
        barWidth: 15,
        label: {
          show: true,
          formatter:function (params) {
            return params.name
          },
          position:  [0, 0],
          color:'#000',
          fontSize:'14px'
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
      {
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
      },
    ]
  };
}
