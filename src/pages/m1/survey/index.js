import React from 'react';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import DatePickerDecorator from 'antd/lib/date-picker';
import moment from 'moment';
import Radio from '../components/Tabs';
import Select from './component/Select';
import Echart from '../../../components/Echart'
import styles from './style.less';
import ChinaMap from './component/ChinaMap';
import ProcessStep from './component/ProcessStep';


const { RangePicker } = DatePickerDecorator;
const dateFormat = 'YYYY-MM-DD';
export default class Survey extends React.Component {
  constructor(props){
    super(props);
    this.state={
      proVal:'报考省份',
      colVal:'学院',
      famVal:'家族',
      startTime:'',
      endTime:'',
    }
  }
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
  // 选择框修改
  handleChange = (value,id)=> {
    if(id === 'province'){
      this.setState({
        proVal:value,
      });
    }else if(id === 'college'){
      this.setState({
        colVal:value,
      });
    }else if(id === 'family'){
      this.setState({
        famVal:value,
      });
    }
  };
  // 日期修改
  dateChange=(value, dateString)=> {
    this.setState({
      startTime:dateString[0],
      endTime:dateString[1],
    });
  };
  search = () =>{
    console.log(this.state);
  };
  reset = () =>{
    this.setState({
      proVal:'报考省份',
      colVal:'学院',
      famVal:'家族',
      startTime:'',
      endTime:'',
    })
  };
  render(){
    console.log(this.state)
    const { proVal, colVal, famVal, startTime, endTime} =  this.state;
    const {option1,option2} = this.initChart();
    const options=[{name:'报考省份',id:1},{name:'jucy2',id:2},{name:'jucy3',id:3},];
    const options1=[{name:'学院',id:1},{name:'学院1',id:2},{name:'学院2',id:3},];
    const options2=[{name:'家族',id:1},{name:'家族1',id:2},{name:'家族2',id:3},];

    return (
      <div className={styles.container}>
        <Radio path='/m1/survey' />
        <div className={styles.mapContainer}>

        <ChinaMap></ChinaMap>
        <div className={styles.examinationState}>
        <ProcessStep />
        </div>

        </div>
        <div className={styles.histogram}>
          <div className={styles.headerCls}>
            数据概览
          </div>
          <div className={styles.formCls}>
            <div>
              <span className={styles.searchTxt}>查询条件：</span>
              <Select options={options} defaultValue={proVal} id='province' handleChange={this.handleChange} />
              <Select options={options1} defaultValue={colVal} id='college' handleChange={this.handleChange} />
              <Select options={options2} defaultValue={famVal} id='family' handleChange={this.handleChange} />
              <RangePicker placeholder={['开始时间','结束时间']} onChange={this.dateChange} value={startTime&&endTime?[moment(startTime, dateFormat), moment(endTime, dateFormat)]:''}/>
            </div>
            <div>
              <Button type="primary2" style={{marginRight:'20px'}} onClick={this.reset}>恢复默认</Button>
              <Button type="primary" onClick={this.search}>
                <Icon type="search" style={{fontSize:'16px'}} />
                查询
              </Button>
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
