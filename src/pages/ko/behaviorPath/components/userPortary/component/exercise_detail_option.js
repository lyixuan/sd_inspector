export function getOption(obj) {
  const newX = [];
  obj.xAxis &&
    obj.xAxis.forEach(item => {
      let arr = [];
      let newDate = '';
      arr = item.split('-');
      newDate = `${arr[1]}-${arr[2]}\n${arr[0]}`;
      newX.push(newDate);
    });

  const newCorrectRatio = [];
  obj.correctRatio &&
    obj.correctRatio.forEach(item => {
      newCorrectRatio.push((item * 100).toFixed(2));
    });

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        label: {
          backgroundColor: '#6a7985',
        },
      },
      formatter: function(params) {
        const newDate = params[0].name;
        const zb = params[0] ? '<br>做题数量：' + params[0].value + '个' : '';
        const cb = params[1] ? '<br>正确数量：' + params[1].value + '个' : '';
        const accuracy = params[2] ? '<br>准确率：' + params[2].value + '%' : '';
        return newDate.split(/[\s\n]/)[1] + '-' + newDate.split(/[\s\n]/)[0] + zb + cb + accuracy;
      },
    },
    legend: {
      data: ['做题数量', '正确数量', '准确率'],
      bottom: 5,
      itemHeight: 30,
      right: 30,
      orient: 'horizontal',
      textStyle: {
        color: '#7B7C80',
        fontSize: 13,
      },
      icon: 'circle',
      itemWidth: 10,
    },
    grid: {
      top: '3%',
      left: 50,
      right: 60,
      bottom: 50,
      containLabel: true,
    },
    xAxis: [
      {
        // type : 'time',
        boundaryGap: false,
        data: newX,
        axisLine: {
          lineStyle: {
            type: 'dotted',
            color: 'RGBA(229, 229, 229, 0.8)',
          },
        },
        axisLabel: {
          color: '#000000 ',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          color: '#000000 ',
        },
        axisLine: {
          lineStyle: {
            type: 'dotted',
            color: 'RGBA(229, 229, 229, 0.8)',
          },
        },
        splitLine: {
          lineStyle: {
            type: 'dotted',
            color: 'RGBA(229, 229, 229, 0.8)',
          },
        },
      },
      {
        type: 'value',
        name: '准确率',
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          formatter: '{value} %',
        },
      },
    ],
    color: ['#FDBB2C', '#22CBC2'],
    series: [
      {
        name: '做题数量',
        type: 'line',
        data: obj.totalNum,
        lineStyle: {
          color: '#FDBB2C',
        },
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#FDBB2C', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#FFFDF8', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      {
        name: '正确数量',
        type: 'line',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#22CBC2', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#ECFBFA', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        data: obj.correctNum,
        lineStyle: {
          color: '#22CBC2',
        },
        smooth: true,
      },
      {
        name: '准确率',
        type: 'line',
        yAxisIndex: 1,
        data: newCorrectRatio,
        lineStyle: {
          color: '#BD10E0',
        },
        // smooth: true,
      },
    ],
  };
}
