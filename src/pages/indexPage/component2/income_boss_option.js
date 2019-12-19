import {thousandsFormatDot} from '@/utils/utils';
export function getOptionBossR(list,sumData) {
  const  total = sumData>999999?thousandsFormatDot((sumData/10000).toFixed(2)):sumData;
  const  unit = sumData>999999?'万元':'元';
  return  {
    color: ['#FEC350', '#3ED097', '#6769DA'],
    title: {
      text: total,
      subtext: `总流水(${unit})`,
      textStyle: {
        fontSize: 32,
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
