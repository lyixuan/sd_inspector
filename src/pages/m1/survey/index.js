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
import {commonOptions} from './component/EchartCommonOptions';
import {provinceJson} from '../../../../utils/constants'


const { RangePicker } = DatePickerDecorator;
const dateFormat = 'YYYY-MM-DD';
export default class Survey extends React.Component {
  constructor(props){
    super(props);
    this.state={
      province:'报考省份',
      collegeId:'学院',
      familyId:'家族',
      beginDate:'',
      endDate:'',
      familyData:[], // 家族的下拉框options
    };
  }
  collegeData = ()=>{
    return [
      {name:'学院',code:111,children:[{name:'家族1',code:11},{name:'家族11',code:12},{name:'家族12',code:13}]},
      {name:'学院1',code:211,children:[{name:'家族2',code:21},{name:'家族21',code:22},{name:'家族22',code:23}]},
      {name:'学院2',code:311,children:[{name:'家族3',code:31},{name:'家族31',code:32},{name:'家族32',code:33}]},];
  };
  initChart= () =>{
    const data1 = commonOptions('微信推送整体数据',['考试计划人数', '推送人数', '已读人数'],['2019/1/1','2019/1/2','2019/1/3','2019/1/4','2019/1/5','2019/1/6','2019/1/7'],50000,10000);
    const data2 = commonOptions('准考证填写趋势',['考试计划人数','准考证填写人数','准考证填写占比'],['2019/1/1','2019/1/2','2019/1/3','2019/1/4','2019/1/5','2019/1/6','2019/1/7'],25000,5000);
    const option1 = {
      ...data1,
      color:['#1e93ff',"#7363ec",'#1ec47a'],
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
          // yAxisIndex: 1,
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
        province:value,
      });
    }else if(id === 'college'){
      const familyData = this.collegeData().filter(item => item.code===value)[0].children ;
      this.setState({
        collegeId:value,
        familyId:familyData[0].name,
        familyData,
      });
    }else if(id === 'family'){
      this.setState({
        familyId:value,
      });
    }
  };
  // 日期修改
  dateChange=(value, dateString)=> {
    this.setState({
      beginDate:dateString[0],
      endDate:dateString[1],
    });
  };
  search = () =>{
    console.log(this.state);
  };
  reset = () =>{
    this.setState({
      province:'报考省份',
      collegeId:'学院',
      familyId:'家族',
      beginDate:'',
      endDate:'',
      familyData:[]
    })
  };
  render(){
    const { province, collegeId, familyId, beginDate, endDate,familyData} =  this.state;
    const {option1,option2} = this.initChart();

    return (
      <div className={styles.container}>
        <Radio path='/m1/survey' />
        <div className={styles.mapContainer}>
        <ChinaMap></ChinaMap>
        <div className={styles.examinationState}></div>

        </div>
        <div className={styles.histogram}>
          <div className={styles.headerCls}>
            数据概览
          </div>
          <div className={styles.formCls}>
            <div>
              <span className={styles.searchTxt}>查询条件：</span>
              <Select options={provinceJson} defaultValue={province} id='province' handleChange={this.handleChange} />
              <Select options={this.collegeData()} defaultValue={collegeId} id='college' handleChange={this.handleChange} />
              <Select options={familyData} defaultValue={familyId} id='family' handleChange={this.handleChange} />
              <RangePicker placeholder={['开始时间','结束时间']} onChange={this.dateChange} value={beginDate&&endDate?[moment(beginDate, dateFormat), moment(endDate, dateFormat)]:''}/>
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
