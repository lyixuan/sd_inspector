import React from 'react';
import { Select } from 'antd';
import Radio from '../components/Tabs'
import Echart from '../../../components/Echart'
import styles from './style.less'

const Option = Select.Option;
export default class Survey extends React.Component {
  commonOption = (text,legendData=[],xData=[]) => {
    const option={
      title: {
        text,
        x:'center',
        textStyle:{
          color:'#fff',
          fontSize:'16px'
        },
        top:20
      },
      grid:{
        top:80
      },
      legend: {
        bottom: 0,
        textStyle:{
          color:'#bdc0c6'
        },
        itemWidth:10,
        itemHeight:10,
        data:legendData
      },
      tooltip: {
        trigger: 'axis',
        // axisPointer: {
        //   type: 'cross',
        //   crossStyle: {
        //     color: '#999'
        //   }
        // }
      },
      xAxis: [
        {
          axisLine:{
            lineStyle:{
              color:'#bdc0c6'
            }
          },
          axisLabel:{// 横坐标轴标签
            interval:0
          },
          axisTick:{
            show:false,
          },
          type: 'category',
          data: xData,
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
    };
    return option;
  };
  initChart= () =>{
    const data1 = this.commonOption('微信推送整体数据',['考试计划人数', '推送人数', '已读人数'],['2019/1/1','2019/1/2','2019/1/3','2019/1/4','2019/1/5','2019/1/6','2019/1/7']);
    const data2 = this.commonOption('准考证填写趋势',['考试计划人数','准考证填写人数','准考证填写占比'],['2019/1/1','2019/1/2','2019/1/3','2019/1/4','2019/1/5','2019/1/6','2019/1/7']);
    const option1 = {
      ...data1,
      color:['#1e93ff',"#7363ec",'#1ec47a'],
      yAxis: {
        axisLine:{
          lineStyle:{
            color:'#bdc0c6'
          }
        },
        axisTick:{
          show:false,
        },
        type: 'value',
        min: 0,
        max: 50000,
        interval: 10000,
        axisLabel: {
          formatter: '{value}'
        },
        splitLine:{
          show:false
        }
      },
      series: [
        {
          name:'考试计划人数',
          type:'bar',
          barCategoryGap:'40%',
          data:[43000.0, 35000.9, 18300.0, 28600.2, 37200.6, 37200.7, 37200.6]
        },
        {
          name:'推送人数',
          type:'bar',
          data:[25300.6, 25300.9, 18300.0, 18300, 18300.7, 18300.7, 18300.6]
        },
        {
          name:'已读人数',
          type:'bar',
          data:[20300.6, 18300.9, 13000.0, 13000, 13000.7, 13000.7, 13000.6]
        },
      ],
    };

    const option2 = {
      ...data2,
      color:['#1e93ff',"#fc595b",'#fc3676'],
      // toolbox: {
      //   feature: {
      //     dataView: {show: true, readOnly: false},
      //     magicType: {show: true, type: ['line', 'bar']},
      //     restore: {show: true},
      //     saveAsImage: {show: true}
      //   }
      // },
      yAxis: [
        {
          axisLine:{
            lineStyle:{
              color:'#bdc0c6'
            }
          },
          axisTick:{
            show:false,
          },
          splitLine:{
            show:false
          },
          type: 'value',
          min: 0,
          max: 25000,
          interval: 5000,
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          axisLine:{
            lineStyle:{
              color:'#bdc0c6'
            }
          },
          axisTick:{
            show:false,
          },
          splitLine:{
            show:false
          },
          type: 'value',
          min: 0,
          max: 75,
          interval: 15,
          axisLabel: {
            formatter: '{value} %'
          }
        }
      ],
      series: [
        {
          name:'考试计划人数',
          type:'bar',
          barCategoryGap:'60%',
          data:[20000.0, 14333.9, 17222.0, 20003.2, 25000.6, 17006.7, 13005.6]
        },
        {
          name:'准考证填写人数',
          type:'bar',
          data:[12222.6, 15333.9, 9999.0, 20000, 20800.7, 10070.7, 17005.6]
        },
        {
          name:'准考证填写占比',
          type:'line',
          yAxisIndex: 1,
          data:[20, 32.2, 43.3, 52.5, 62.3, 69.2, 70.3],
          symbol:'circle',
          symbolSize:6,
          hoverAnimation:false,
          // smooth:true
        }
      ]
    };
    return {option1,option2}
  };
  handleChange = (value)=> {
    console.log(`selected ${value}`);
  }
  render(){
    const {option1,option2} = this.initChart();
    return (
      <div className={styles.container}>
        <Radio path='/m1/survey' />
        <div className={styles.histogram}>
          <div className={styles.headerCls}>

          </div>
          <div className={styles.formCls}>
            <div>
             <span className={styles.searchTxt}>查询条件：</span>
              <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
           <div>

           </div>
          </div>
          <div className={styles.echartCls}>
            <Echart update='1' style={{width:'46%', height:"510px"}} options={option1} />
            <Echart update='1' style={{width:'46%', height:"510px"}} options={option2} />
          </div>
        </div>

      </div>
    );
  }

}
