export function getOption(obj) {
  function getData (str) {
    let r = [];
    obj.data && obj.data.forEach((v)=>{
      if(v.name===str ) {r = v.value}
    });
    return r;
  }
  let labels = [];
  f();
  function f() {
    obj.indicator && obj.indicator.forEach((v)=>[
      labels.push(v.name)
    ])
  }
  return {
    tooltip: {
      confine:true,
      formatter: function(params) {
        let results = '';
        for (let i = 0; i < labels.length; i++) {
          results += labels[i] + '：' + params.value[i] + '天<br>';
        }
        return results;
      }
    },
    legend: {
      data: [obj.data[0]&&obj.data[0].name,obj.data[1]&&obj.data[1].name],
      right:'right',
      bottom: 5,
      orient:'vertical',
      textStyle: {
        color: '#7B7C80',
        fontSize:13
      },
      itemWidth:10
    },
    radar: {
      name: {
        textStyle: {
          color: '#55595E'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#F0F0F0'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#F0F0F0'
        }
      },
      splitArea: {
        areaStyle: {
          color: '#fff',
        }
      },
      indicator: obj.indicator
    },
    series: [{
      name: '直播',
      type: 'radar',
      symbol: "circle",
      symbolSize:3,
      itemStyle: {
        normal: {
          color: 'rgba(0,204,195,1)',
          borderColor: "rgba(0,204,195,1)",
        }
      },
      areaStyle: {
        normal: {
          color: "rgba(0,204,195,0.1)"
        }
      },
      lineStyle: {
        normal: {
          color: "rgba(0,204,195,1)",
          width: 1,
        }
      },
      data : [getData('直播')]
    },
      {
        name: '重播',
        type: 'radar',
        symbol: "circle",
        symbolSize:3,
        itemStyle: {
          normal: {
            color: 'rgba(255,188,0,1)',
            borderColor: "rgba(255,188,0,1)",
          }
        },
        areaStyle: {
          normal: {
            color: "rgba(255,188,0,0.1)"
          }
        },
        lineStyle: {
          normal: {
            color: "rgba(255,188,0,1)",
            width: 1,
          }
        },
        data: [getData('重播')]
      }]
  };
}
