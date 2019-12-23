import {  changeToThousandsForIncome } from '@/utils/utils';
export function getOptionBossR(list,sumData) {
  const  total = changeToThousandsForIncome(sumData,1);
  const  unit = '元';
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
    title: {
      text: total,
      subtext: `总流水(${unit})`,
      textStyle: {
        fontSize: 32,
        fontWeight:400,
        align: 'center',
        color:'rgba(40,40,40,1)',
        fontFamily:'DINCondensed-Bold,DINCondensed,Haettenschweiler',
      },
      subtextStyle: {
        fontSize: 12,
        color:'rgba(40,40,40,0.8)',
      },
      x: 'center',
      y: '30%',
    },
    grid: {
      bottom: 150,
      left: 0,
      right: '10%'
    },
    series: [
      {
        name:'访问来源',
        hoverAnimation:false,
        type:'pie',
        radius: ['50%', '60%'],
        center: ['50%', '40%'],
        startAngle: '135',
        label: {
          normal: {
            show: false,
          }
        },

        data:list
      }
    ]
  };

}
