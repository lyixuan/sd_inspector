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
      right: '4%',
      bottom: 40,
      // containLabel: true,
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
      splitLine: { show: false },
      splitArea: { show: false },
      boundaryGap: false,
      axisLine: { show: false },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
        name: '邮件营销',
        type: 'line',
        stack: '总量',
        smooth: true,
        data: [0, 132, 101, 134, 90, 230, 210],
        itemStyle: itemStyle1,
      },
      {
        name: '联盟广告',
        type: 'line',
        stack: '总量',
        smooth: true,
        itemStyle: itemStyle2,
        data: [0, 182, 191, 234, 290, 330, 310],
      },
      {
        name: '视频广告',
        type: 'line',
        stack: '总量',
        smooth: true,
        itemStyle: itemStyle3,
        data: [10, 232, 10, 154, 90, 330, 410],
      },
      {
        name: '直接访问',
        type: 'line',
        stack: '总量',
        smooth: true,
        itemStyle: itemStyle4,
        data: [320, 10, 301, 334, 390, 330, 320],
      },
      {
        name: '搜索引擎',
        type: 'line',
        stack: '总量',
        smooth: true,
        itemStyle: itemStyle5,
        data: [820, 932, 101, 934, 1290, 1330, 1320],
      },
      {
        name: '搜索引擎',
        type: 'line',
        stack: '总量',
        smooth: true,
        itemStyle: itemStyle6,
        data: [820, 932, 101, 934, 1290, 1330, 1320],
      },
    ],
  };
}
