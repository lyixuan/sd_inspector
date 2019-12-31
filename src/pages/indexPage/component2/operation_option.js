export function getOption(touchRatio) {
  const list = [
    {value:touchRatio*100,name:'触达率',
      itemStyle: {
        normal: {
          color: '#FF7291'
        },
        emphasis: {
          color: '#FF7291'
        }
      }},
    {value:100-touchRatio*100,name:'未触达率',
      itemStyle: {
        normal: {
          color: '#EAEEF5'
        },
        emphasis: {
          color: '#EAEEF5'
        }
      }},
  ];
  return  {
    // color: ['#FF7291', '#EAEEF5'],
    title: {
      text: Math.round(touchRatio*10000)/100+'%',
      subtext: `触达率`,
      textStyle: {
        fontSize: 18,
        fontWeight:400,
        align: 'center',
        color:'#092058',
        fontFamily:'DINCondensed-Bold,DINCondensed,Haettenschweiler',
      },
      subtextStyle: {
        fontSize: 10,
        color:'#092058',
      },
      x: 'center',
      y: '35%',
    },
    grid: {
      bottom: 150,
      left: 0,
    },
    series: [
      {
        name:'访问来源',
        type:'pie',
        hoverAnimation:false,
        animationType:'scale',
        radius: ['58%', '70%'],
        center: ['50%', '50%'],
        // startAngle: '135',
        label: {
          normal: {
            show: false,
          }
        },
        legendHoverLink:false,
        avoidLabelOverlap:false,
        itemStyle: {
          normal: {
            label:{
              show: false,
	            position:'inside',
              formatter: '{d}%'
            },
            // borderColor: '#ffffff',
            // borderWidth: 5,
          },
        },
        data:list||[]
      }
    ]
  };

}
