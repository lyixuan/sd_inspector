export function getOption(data) {
  return {
    angleAxis: {
      type: 'category',
      data: [
        '7天',
        '',
        '60天',
        '90天',
        '120天',
        '150天',
        '180天',
        '210天',
        '230天',
        '250天',
        '270天',
        '300天',
      ],
      z: 10,
      axisTick: {
        //y轴刻度线
        inside: true,
      },
      splitLine: {
        //网格线
        // show: true,
        // lineStyle: {
        //   type: 'dashed',
        //   color: '#999999',
        // },
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
      // show : false,
      // axisTick:{       //y轴刻度线
      //   "show":false
      // },
      // splitLine: {     //网格线
      //   "show": false
      // },
      // axisLabel: {
      //      show:false,
      //  },
    },
    polar: {
      // show:true,
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
        data: [1, 1, 1, 4, 3, 5, 1, 1, 2, 3, 4, 3],
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
