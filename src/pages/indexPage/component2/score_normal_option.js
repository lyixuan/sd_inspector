import echarts from 'echarts';

export function getOption(obj) {
  // function getData (str) {
  //   let r = [];
  //   obj.data && obj.data.forEach((v)=>{
  //     if(v.name===str ) {r = v.value}
  //   });
  //   return r;
  // }
  // let labels = [];
  // f();
  // function f() {
  //   obj.indicator && obj.indicator.forEach((v)=>[
  //     labels.push(v.name)
  //   ])
  // }
  return {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      formatter: function(param) {
        const { data } = param;
        const { name = undefined } = data;
        return `<div style='font-size: 12px;background: #fff;color: #414D55;width: 100%'>${name}</div>`;
      },
    },
    xAxis: {
      show: false,
      type: 'category',
      data: [1, 2, 3, 4, 5],
    },
    yAxis: {
      show: false,
      type: 'value',
    },
    grid: {
      top: 50,
      left: 10,
      right: 10,
      bottom: 30,
    },
    series: [{
      name: 'scatter',
      type: 'scatter',
      itemStyle: {
        normal: {
          borderWidth: '2',
          borderType: 'solid',
          borderColor: '#fff',
          color: 'rgba(61,213,152,1)',
          shadowColor: '#68b837',
          shadowBlur: 10,
        },
      },

      data: [{ name: 1, value: 1 },{ name: 2, value: 2 },{ name: 4, value: 4 },{ name: 6, value: 6 },{ name: 7, value: 10 }],
    },
      {
        smooth: true,
        data: [1, 2, 4, 6, 10],
        type: 'line',
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [{
              offset: 0,
              color: 'rgba(61,213,152,0.9)',
            }, {
              offset: 1,
              color: 'rgba(61,213,152,0.1)',
            }]),
          },
        },
        symbol: 'none',

        lineStyle: {
          normal: {
            color: 'rgba(61,213,152,1)',
            width: 2,
          },
        },
      },
    ],
  };
}
