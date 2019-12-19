export function getOptionR2(list) {
  return  {
    color: ['#FEC350', '#3ED097', '#6769DA'],
    grid: {
      bottom: 150,
      left: 0,
      right: '10%'
    },
    series: [
      {
        name:'访问来源',
        type:'pie',
        hoverAnimation:false,
        radius: ['0', '70%'],
        center: ['50%', '35%'],
        startAngle: '135',
        label: {
          normal: {
            // show: false,
          }
        },
        itemStyle: {
          normal: {
            label:{
              show: true,
	            position:'inside',
              formatter: '{d}%'
            },
            borderColor: '#ffffff',
            borderWidth: 5,
          },
        },
        data:list
      }
    ]
  };

}
