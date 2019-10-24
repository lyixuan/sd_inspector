export function getOption(obj) {
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
        let results = '活跃汇总<br>';
        for (let i = 0; i < labels.length; i++) {
          results += labels[i] + '：' + params.value[i] + '天<br>';
        }
        return results;
      }
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
      name: '活跃汇总',
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
      data : obj.data
    }]
  };
}
