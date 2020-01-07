export function getOption(data) {
  const colorArr = ['#FC5B5C', '#00B27B', '#F5A623', '#FF57D5', '#4A90E2', '#8B572A', '#4AE2BD'];
  return {
    title: {
      x: 'center',
      textStyle: {
        fontSize: 16,
        color: '#FFFFFF',
      },
    },
    tooltip: {
      backgroundColor: '#fff',
      borderColor: '#eee',
      borderWidth: 1,
      borderRadius: 10,
      shadowBlur: 10,
      shadowOffsetX: 1,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0,0,0,0.8)',
      textStyle: {
        color: '#666',
        fontSize: 12,
      },
      // trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'none', // 默认为直线，可选为：'line' | 'shadow'
      },
      animation: false,
      formatter: function(params) {
        var str = params.data.name + ':' + params.data.value;
        return str;
      },
    },
    series: [
      {
        type: 'wordCloud',
        left: 'center',
        top: 'center',
        width: '90%',
        height: '90%',
        right: null,
        bottom: null,
        sizeRange: [14, 30],
        textPadding: 60,
        rotationRange: [0, 0],
        rotationStep: 0,
        gridSize: 12,
        autoSize: {
          enable: true,
          minSize: 12,
        },
        textStyle: {
          normal: {
            color: function() {
              return colorArr[Math.floor(Math.random() * colorArr.length)];
            },
            fontFamily: 'sans-serif',
            fontWeight: '500',
          },
          emphasis: {
            // shadowBlur: 10,
            // shadowColor: '#333'
          },
        },
        data: data,
      },
    ],
  };
}
