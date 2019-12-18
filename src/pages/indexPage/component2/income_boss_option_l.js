export function getOptionL(obj) {
  return  {
    color: ['#FEC350', '#3ED097', '#6769DA'],
    title: {
      text: '总1数',
      subtext: '12222',
      textStyle: {
        fontSize: 32,
        align: 'center',
        color:'rgba(40,40,40,1)',
        fontFamily:'DINCondensed-Bold,DINCondensed',
      },
      subtextStyle: {
        fontSize: 24,
        color:'rgba(40,40,40,0.8)',
      },
      x: 'center',
      y: '25%',
    },
    grid: {
      bottom: 150,
      left: 0,
      right: '10%'
    },
    series: [
      {
        name:'访问来源',
        type:'pie',
        radius: ['60%', '70%'],
        center: ['50%', '35%'],
        startAngle: '135',
        label: {
          normal: {
            show: false,
          }
        },
        data:[
          {value:335, name:'直接访问'},
          {value:310, name:'邮件营销'},
          {value:234, name:'联盟广告'},
        ]
      }
    ]
  };

}
