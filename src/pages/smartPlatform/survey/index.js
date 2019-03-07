import React from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import Empty from 'antd/lib/empty'
import Radio from '../components/Tabs';
import Echart from '@/components/Echart'
import styles from './style.less';
import ChinaMap from './component/ChinaMap';
import SearchForm from './component/SearchForm';
import { chartOptions } from './component/EchartCommonOptions';

@connect(({ survey, home, loading }) => ({
  survey,
  home,
  loading: loading.models.survey,
  mapInfo: survey.mapInfo || [],
  mapInfoLoading: loading.effects['survey/getMapInfo'],
  echartLoading: loading.effects['survey/queryHistogramData'],
}))
class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      province:null,
      collegeId:null,
      familyId:null,
      beginDate: "",
      endDate: ""
    };

  }
  componentDidMount() {
    this.getMapInfo();// 组织架构
    this.getProvinceJson();// 省份
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
  getProvinceJson = () => {
    this.props.dispatch({
      type: 'home/getProvinceJson',
    });
  };

  searchData = param => {
    this.setState(param);
    this.queryHistogramData(param)
  };
  render() {
    const { mapInfo, survey } = this.props;

    const { dataList = {} } = survey;
    const { data1 = {}, data2 = {} } = dataList;
    const { option1, option2 } = chartOptions(survey);

    return (
      <Spin spinning={false}>
        <div className={styles.container}>
          {/* 页面切换 */}
          <Radio path='/smartPlatform/survey' />
          {/* 地图 */}
          <Spin spinning={this.props.mapInfoLoading}>
            <div className={styles.mapContainer}>
              <ChinaMap data={mapInfo} />
            </div>

          </Spin>

          <div className={styles.histogram}>
            <div className={styles.headerCls}>
              数据概览
            </div>
            {/* 搜索条件 */}
            <div className={styles.formCls}>
              <SearchForm searchData={this.searchData} />
            </div>
            {/* 图表 */}
            <Spin spinning={this.props.echartLoading}>
              <div className={styles.echartCls}>
                {
                  JSON.stringify(data1)==='{}'?
                    <Empty className={styles.emptyCls} />:
                    <Echart update={data1} style={{ width: '49%', height: "510px" }} options={option1} />
                }
                {
                  JSON.stringify(data2)==='{}'?
                  <Empty className={styles.emptyCls} />:
                  <Echart update={data2} style={{ width: '49%', height: "510px" }} options={option2} />
                }
              </div>
            </Spin>
          </div>
        </div>
      </Spin>
    );
  }

}
export default Survey;
