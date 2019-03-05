import React from 'react';
import { connect } from 'dva';
import Radio from '../components/Tabs';
import Echart from '../../../components/Echart'
import styles from './style.less';
import ChinaMap from './component/ChinaMap';
import SearchForm from './component/SearchForm';
import {commonOptions} from './component/EchartCommonOptions';
import {provinceData}from './component/test';

@connect(({ survey, loading }) => ({
  survey,
  loading: loading.models.survey,
  isLoading: loading.effects['survey/getExamDateRange'],
}))
class Survey extends React.Component {
  constructor(props){
    super(props);
    this.state={
      params:{"province":"北京市","collegeId":104,"familyId":155,"beginDate":"2019-02-22","endDate":"2019-02-27"},
      data1:{},
      data2:{},
    }
    // this.state={
    //   province:'',
    //   collegeId:'',
    //   familyId:'',
    //   beginDate:'',
    //   endDate:'',
    // };

  }
  componentDidMount(){
    this.queryHistogramData(this.state.params)
  }
  queryHistogramData = params =>{
    this.props.dispatch({
      type: 'survey/queryHistogramData',
      payload: params,
    });
  };
  initChart= () =>{
    const {dataList={}} = this.props.survey;
    const{data1={},data2={}}=dataList;
    const {dateArr=[]} = data1;
    console.log(dateArr);
    const params1 = {
      text:'微信推送整体数据',
      legendData:[{name:'考试计划人数',icon:'rect'},{name:'推送人数',icon:'rect'},{name:'已读人数',icon:'rect'}],
      xData:['2019/1/1','2019/1/2','2019/1/3','2019/1/4','2019/1/5','2019/1/6','2019/1/7'],
      // xData:dateArr,
      color:['#1e93ff',"#7363ec",'#1ec47a'],
      formatter:'{b}<br />{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}',
      series:[{
        type:'bar',
        barCategoryGap:'40%',
        data: [43000.0, 35000.9, 18300.0, 28600.2, 37200.6, 37200.7, 37200.6]
        // data: data1.dataArr1
      },{
        type:'bar',
        data: [25300.6, 25300.9, 18300.0, 18300, 18300.7, 18300.7, 18300.6]
        // data: data1.dataArr2
      },{
        type:'bar',
        data: [20300.6, 18300.9, 13000.0, 13000, 13000.7, 13000.7, 13000.6]
        // data: data1.dataArr3
      }],
      max:50000,
      interval:10000,
      itemGap:52,
    };
    const params2 = {
      text:'准考证填写趋势',
      legendData:[{name:'考试计划人数',icon:'rect'},{name:'准考证填写人数',icon:'rect'},{
        name:'准考证填写占比',
        icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAEAQMAAABSuEaRAAAAAXNSR0IB2cksfwAAAAZQTFRF+zd3AAAAP9uspgAAAAJ0Uk5T/wDltzBKAAAAEUlEQVR4nGNgYGhggOH//xsAEwsD/x/9IEYAAAAASUVORK5CYII=',
      }],
      xData:['2019/1/1','2019/1/2','2019/1/3','2019/1/4','2019/1/5','2019/1/6','2019/1/7'],
      color:['#1e93ff',"#fc595b",'#fc3676'],
      formatter:'{b}<br />{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}%',
      series:[{
        type:'bar',
        barCategoryGap:'60%',
        data: [3000.0, 5000.9, 18300.0, 8600.2, 7200.6, 7200.7, 7200.6],
      },{
        type:'bar',
        data: [5300.6, 5300.9, 8300.0, 8300, 18300.7, 18300.7, 18300.6],
      },{
        type:'line',
        yAxisIndex: 1,
        symbol:'circle',
        symbolSize:6,
        data: [20.6, 31.9, 35.0, 42, 52.7, 61.7, 71.6],
        itemStyle : { normal: {label : {show: true,formatter:'{c}%'}}},
      }],
      yAxis: {
        show:false,
        type: 'value',
        min: 0,
        max: 75,
        interval: 15,
        axisLabel: {
          formatter: '{value} %'
        }
      },
      max:25000,
      interval:5000,
    };
    const option1 = commonOptions(params1);
    const option2 = commonOptions(params2);
    return {option1,option2}
  };
  searchData = param => {
    // const { province, collegeId, familyId, beginDate, endDate} = param;
    this.setState(param);
    this.queryHistogramData(param)
  };
  render(){
    const {dataList={}} = this.props.survey;
    const{data1={},data2={}}=dataList;
    const {option1,option2} = this.initChart();
    return (
      <div className={styles.container}>
        {/* 页面切换 */}
        <Radio path='/smartPlatform/survey' />
        {/* 地图 */}
        <div className={styles.mapContainer}>
          <ChinaMap data={provinceData}/>
        </div>
        <div className={styles.histogram}>
          <div className={styles.headerCls}>
            数据概览
          </div>
          {/* 搜索条件 */}
          <div className={styles.formCls}>
            <SearchForm searchData={this.searchData}/>
          </div>
          {/* 图表 */}
          <div className={styles.echartCls}>
            <Echart update={data1} style={{width:'46%', height:"510px"}} options={option1} />
            <Echart update='2' style={{width:'46%', height:"510px"}} options={option2} />
          </div>
        </div>
      </div>
    );
  }

}
export default Survey;
