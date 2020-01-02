export function getOption(data) {
  const dataAxis = [];
  const seriesData = [];
  if (Array.isArray(data)) {
    data.map(item => {
      dataAxis.push(item.name);
      seriesData.push(item.value);
    });
  }

  const max = Math.ceil(Math.max.apply(null, dataAxis));

  return {
    angleAxis: {
      type: 'category',
      data: dataAxis,
      z: 10,
      axisTick: {
        //y轴刻度线
        inside: true,
      },

      splitLine: {
        // 网格线
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#999999',
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#999999',
        },
      },
    },
    tooltip: {},
    radiusAxis: {
      min: 0,
      max: max,
      show: false,
      nameTextStyle: {
        verticalAlign: 'center',
      },
      axisTick: {
        //y轴刻度线
        show: false,
      },
      splitLine: {
        //网格线
        show: false,
        lineStyle: {
          type: 'dashed',
          color: '#999999',
        },
      },
      // axisLabel: {
      //      show:false,
      //  },
    },
    polar: {
      show: true,
      center: ['50%', '50%'],
    },
    grid: {
      left: 200,
      // right: 20,
      // top: 10,
      // bottom: 30,
    },
    series: [
      {
        type: 'bar',
        barCategoryGap: '1px',
        data: seriesData,
        coordinateSystem: 'polar',
        // name: 'A',
        stack: 'a',
        itemStyle: {
          color: function(params) {
            var colorList = [
              '#47A5FD',
              '#7FBFFF',
              '#66DFCD',
              '#57CB73',
              '#ACEA79',
              '#FDD34D',
              '#ECA577',
              '#42538B',
              '#899AEA',
              '#8C7CD4',
              '#9860E5',
              '#B28CF1',
            ];
            return colorList[params.dataIndex];
          },

          //  borderColor:'red'
        },
        label: {
          normal: {
            show: true,
          },
        },
      },
    ],
    legend: {
      show: true,
      data: ['A'],
    },
  };
}
