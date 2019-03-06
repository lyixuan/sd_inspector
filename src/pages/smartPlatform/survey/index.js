import React from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import Radio from '../components/Tabs';
import Echart from '@/components/Echart'
import styles from './style.less';
import ChinaMap from './component/ChinaMap';
import SearchForm from './component/SearchForm';
import { commonOptions } from './component/EchartCommonOptions';

@connect(({ survey, loading }) => ({
  survey,
  loading: loading.models.survey,
  mapInfo: survey.mapInfo || [],
  isLoading: loading.effects['survey/getExamDateRange'],
}))
class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = { "province": "北京市", "collegeId": 104, "familyId": 155, "beginDate": "2019-02-22", "endDate": "2019-02-27" }
    // this.state={
    //   province:'',
    //   collegeId:'',
    //   familyId:'',
    //   beginDate:'',
    //   endDate:'',
    // };

  }
  componentDidMount() {
    this.getMapInfo();
    this.queryHistogramData(this.state)
  }
  getMapInfo = () => {
    const { mapInfo } = this.props;
    if (Array.isArray(mapInfo) && mapInfo.length > 0) {
      return;
    }
    this.props.dispatch({
      type: 'survey/getMapInfo',
    })
  };
  queryHistogramData = params => {
    this.props.dispatch({
      type: 'survey/queryHistogramData',
      payload: params,
    });
  };
  initChart = () => {
    const { dataList = {} } = this.props.survey;
    const { data1 = {}, data2 = {} } = dataList;
    const params1 = {
      text: '微信推送整体数据',
      legendData: [{ name: '考试计划人数', icon: 'rect' }, { name: '推送人数', icon: 'rect' }, { name: '已读人数', icon: 'rect' }],
      xData: data1.dateArr,
      color: ['#1e93ff', "#7363ec", '#1ec47a'],
      formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}',
      series: [{
        type: 'bar',
        barCategoryGap: '40%',
        data: data1.dataArr1
      }, {
        type: 'bar',
        data: data1.dataArr2
      }, {
        type: 'bar',
        data: data1.dataArr3
      }],
      yAxis: {
        axisLine: {
          lineStyle: {
            color: '#bdc0c6'
          }
        },
        axisTick: {
          show: false,
        },
        type: 'value',
        splitLine: {
          show: false
        },
        // min: 0,
        // max:50000,
        // interval:10000,
        axisLabel: {
          formatter: '{value}'
        },
      },
      itemGap: 52,
    };
    const params2 = {
      text: '准考证填写趋势',
      legendData: [{ name: '考试计划人数', icon: 'rect' }, { name: '准考证填写人数', icon: 'rect' }, {
        name: '准考证填写占比',
        icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAEAQMAAABSuEaRAAAAAXNSR0IB2cksfwAAAAZQTFRF+zd3AAAAP9uspgAAAAJ0Uk5T/wDltzBKAAAAEUlEQVR4nGNgYGhggOH//xsAEwsD/x/9IEYAAAAASUVORK5CYII=',
      }],
      xData: data2.dateArr,
      color: ['#1e93ff', "#fc595b", '#fc3676'],
      formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}%',
      series: [{
        type: 'bar',
        barCategoryGap: '60%',
        data: data2.dataArr1
      }, {
        type: 'bar',
        data: data2.dataArr2
      }, {
        type: 'line',
        yAxisIndex: 1,
        symbol: 'circle',
        symbolSize: 6,
        data: data2.dataArr3,
        itemStyle: { normal: { label: { show: true, formatter: '{c}%' } } },
      }],
      yAxis: [{
        axisLine: {
          lineStyle: {
            color: '#bdc0c6'
          }
        },
        axisTick: {
          show: false,
        },
        type: 'value',
        splitLine: {
          show: false
        },
        // min: 0,
        // max:25000,
        // interval:5000,
        axisLabel: {
          formatter: '{value}'
        },
      }, {
        show: false,
        type: 'value',
        min: 0,
        max: 75,
        interval: 15,
        axisLabel: {
          formatter: '{value} %'
        }
      }],
    };
    const option1 = commonOptions(params1);
    const option2 = commonOptions(params2);
    return { option1, option2 }
  };
  searchData = param => {
    // const { province, collegeId, familyId, beginDate, endDate} = param;
    this.setState(param);
    this.queryHistogramData(param)
  };
  render() {
    const { option1, option2 } = this.initChart();
    const { mapInfo } = this.props;
    return (
      <Spin spinning={false}>
        <div className={styles.container}>
          {/* 页面切换 */}
          <Radio path='/smartPlatform/survey' />
          {/* 地图 */}
          <div className={styles.mapContainer}>
            <ChinaMap data={mapInfo} />
          </div>
          <div className={styles.histogram}>
            <div className={styles.headerCls}>
              数据概览
            </div>
            {/* 搜索条件 */}
            <div className={styles.formCls}>
              <SearchForm searchData={this.searchData} />
            </div>
            {/* 图表 */}
            <div className={styles.echartCls}>
              <Echart update={option1} style={{ width: '46%', height: "510px" }} options={option1} />
              <Echart update={option2} style={{ width: '46%', height: "510px" }} options={option2} />
            </div>
          </div>
        </div>
      </Spin>
    );
  }

}
export default Survey;
