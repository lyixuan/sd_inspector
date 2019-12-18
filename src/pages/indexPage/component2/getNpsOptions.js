const dataShadow = [];

export function getOption(data) {
  const newAxis = [];
  if (data.starList) {
    let maxArr = [];
    for (let i of data.starList) {
      maxArr.push(Number(i.value));
    }
    const max = Math.max.apply(null, maxArr);
    data.starList.map(item => {
      newAxis.push(item.name);
      dataShadow.push(max);
    });
  }

  return {
    title: {
      text: '',
      subtext: '',
    },
    xAxis: {
      data: newAxis,
      axisLabel: {
        // inside: true,
        textStyle: {
          color: '#7D90AA',
          fontSize: 12,
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        //网格线
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: '#7D90AA',
        },
      },
    },
    // dataZoom: [
    //   {
    //     type: 'inside',
    //   },
    // ],
    series: [
      {
        // For shadow
        type: 'bar',
        itemStyle: {
          color: '#F6F6F4',
          barBorderRadius: [10, 10, 0, 0],
        },
        barGap: '-100%',
        barWidth: 17, //柱图宽度
        data: dataShadow,
        animation: false,
      },
      {
        type: 'bar',
        barWidth: 17, //柱图宽度
        itemStyle: {
          normal: {
            barBorderRadius: [10, 10, 0, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#00BFCC', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#5384DF', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          emphasis: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#00BFCC', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#5384DF', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
        data: data.starList,
      },
    ],
  };
}
