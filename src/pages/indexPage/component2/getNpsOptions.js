import echarts from 'echarts';

const dataShadow = [];

export function getOption(data) {
  const newAxis = [];
  if (data.starList) {
    let maxArr = [];
    for (let i of data.tagImageDtoList) {
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
    grid: {
      left: 50,
      right: 20,
      top: 30,
      bottom: 60,
    },
    xAxis: {
      data: newAxis,
      axisLabel: {
        // inside: true,
        textStyle: {
          color: '#7D90AA',
          fontSize: 12,
        },
        interval:0,  
        rotate:40  
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      }
    //   z: 10,
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
          color: '#999',
        },
      },
    },
    series: [
      {
        // For shadow
        type: 'bar',
        itemStyle: {
          normal: { color: '#F6F6F4' },
        },

        barGap: '-100%',
        barWidth: 17, //柱图宽度
        // barCategoryGap: '100%',
        data: dataShadow,
        // animation: false,
        itemStyle: {
          barBorderRadius: [10, 10, 0, 0],
          color: '#F6F6F4',
        },
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
