export function getOption(data) {
  const itemStyle1 = {
    normal: {
      color: '#FFC342',
    },
  };
  const itemStyle2 = {
    normal: {
      color: '#33D095',
    },
  };
  const itemStyle3 = {
    normal: {
      color: '#4A90E2',
    },
  };
  const itemStyle4 = {
    normal: {
      color: '#FF602F',
    },
  };
  const itemStyle5 = {
    normal: {
      color: '#4A5F75',
    },
  };
  const itemStyle6 = {
    normal: {
      color: '#9860E5',
    },
  };
  const itemStyle7 = {
    normal: {
      color: '#FFC342',
    },
  };
  const itemStyle8 = {
    normal: {
      color: '#33D095',
    },
  };
  const itemStyle9 = {
    normal: {
      color: '#4A90E2',
    },
  };
  const itemStyle10 = {
    normal: {
      color: '#FF602F',
    },
  };
  const itemStyle11 = {
    normal: {
      color: '#4A5F75',
    },
  };
  const itemStyle12 = {
    normal: {
      color: '#9860E5',
    },
  };

  return {
    tooltip: {
      trigger: 'axis',
    },
    // legend: {
    //   data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
    // },
    grid: {
      left: 70,
      top: 20,
      right: 50,
      bottom: 80,
      // containLabel: true,
    },
    legend: {
      data: [
        '工程管理(新)',
        '北京人力(新)',
        '英语(新)',
        '江苏人力(新)',
        'MBA北上广',
        'MBA外阜',
        '连锁家族',
        '现代企管',
        '江苏工商(新)',
        '计算机信管(新)',
        '金融学',
        '商金家族',
      ],
      bottom: 1,
      itemHeight: 30,
      right: 0,
      left: 30,
      orient: 'horizontal',
      textStyle: {
        color: '#7B7C80',
        fontSize: 13,
      },
      icon: 'circle',
      itemWidth: 10,
    },
    toolbox: {
      // feature: {
      //   saveAsImage: {},
      // },
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false,
      },
      axisLabel: {
        // y轴文字颜色
        interval:'auto',
      },
      splitLine: { show: false },
      splitArea: { show: false },
      boundaryGap: false,
      axisLine: { show: false },
      data: [
        '2019 08-01',
        '2019 08-02',
        '2019 08-03',
        '2019 08-04',
        '2019 08-05',
        '2019 08-06',
        '2019 08-07',
        '2019 08-08',
        '2019 08-09',
        '2019 08-10',
        '2019 08-11',
        '2019 08-12',
        '2019 08-13',
        '2019 08-14',
      ],
    },
    yAxis: {
      type: 'value',
      splitLine: {
        // 网格线
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#E5E5E5',
        },
      },
      axisLine: { show: false },
      axisLabel: {
        // y轴文字颜色
        show: true,
        textStyle: {
          color: '#7D90AA',
        },
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: '工程管理(新)',
        type: 'line',
        stack: '总量',
        smooth: true,
        data: [0, 132, 101, 134, 90, 230, 210, 101, 134, 90],
        itemStyle: itemStyle1,
      },
      {
        name: '北京人力(新)',
        type: 'line',
        stack: '总量',
        smooth: true,
        itemStyle: itemStyle2,
        data: [0, 182, 191, 234, 290, 330, 310],
      },
      {
        name: '英语(新)',
        type: 'line',
        stack: '总量',
        smooth: true,
        itemStyle: itemStyle3,
        data: [10, 232, 10, 154, 90, 330, 410],
      },
      {
        name: '江苏人力(新)',
        type: 'line',
        stack: '总量',
        smooth: true,
        itemStyle: itemStyle4,
        data: [320, 10, 301, 334, 390, 330, 320],
      },
      {
        name: 'MBA北上广',
        type: 'line',
        stack: '总量',
        smooth: true,
        itemStyle: itemStyle5,
        data: [820, 932, 101, 934, 1290, 1330, 1320],
      },
      {
        name: 'MBA外阜',
        type: 'line',
        stack: '总量',
        smooth: true,
        itemStyle: itemStyle6,
        data: [820, 932, 1, 934, 1290, 1330, 1320],
      },
      {
        name: '连锁家族',
        type: 'line',
        stack: '总量',
        smooth: true,
        data: [0, 132, 10, 134, 90, 230, 210],
        itemStyle: itemStyle7,
      },
      {
        name: '现代企管',
        type: 'line',
        stack: '总量',
        smooth: true,
        itemStyle: itemStyle8,
        data: [0, 182, 191, 234, 290, 330, 30],
      },
      {
        name: '江苏工商(新)',
        type: 'line',
        stack: '总量',
        smooth: true,
        itemStyle: itemStyle9,
        data: [10, 232, 10, 54, 90, 330, 410],
      },
      {
        name: '计算机信管(新)',
        type: 'line',
        stack: '总量',
        smooth: true,
        itemStyle: itemStyle10,
        data: [320, 10, 301, 334, 39, 330, 320],
      },
      {
        name: '金融学',
        type: 'line',
        stack: '总量',
        smooth: true,
        itemStyle: itemStyle11,
        data: [820, 932, 101, 94, 1290, 1330, 1320],
      },
      {
        name: '商金家族',
        type: 'line',
        stack: '总量',
        smooth: true,
        itemStyle: itemStyle12,
        data: [820, 932, 10, 934, 1290, 1330, 1320],
      },
    ],
  };
}
