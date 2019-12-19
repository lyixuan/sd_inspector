export function getOptionR2(list) {
  list.forEach((item)=>{
    if(item.name==='好推'){
      item['itemStyle']={
        color:'#45D199'
      }
    }
    if(item.name==='续报'){
      item['itemStyle']={
        color:'#FEC350'
      }
    }
    if(item.name==='成考专本套'){
      item['itemStyle']={
        color:'#6769DA'
      }
    }

  });
  return  {
    // color: ['#FEC350', '#6769DA', '#3ED097'],
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
