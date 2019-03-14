import React from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import Empty from 'antd/lib/empty'
import Echart from '@/components/Echart'
import styles from './style.less';
import ChinaMap from './component/ChinaMap.1';
import SearchForm from './component/SearchForm';
import { chartOptions } from './component/EchartCommonOptions';
import EchartTitle  from './component/EchartCommonOptions/echartTitle';
import SelfProgress  from './component/EchartCommonOptions/fillRateFamily';
import { fillCollege } from './component/EchartCommonOptions/fillRateOptions';

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
      province: null,
      collegeId: null,
      familyId: null,
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
            <Spin spinning={this.props.echartLoading}>
              {/* 搜索条件 */}
              <div className={styles.formCls}>
                <SearchForm searchData={this.searchData} />
              </div>
              {/* 图表 */}
              <div className={styles.echartCls}>
                {
                  JSON.stringify(data1) === '{}' ?
                    <Empty className={styles.emptyCls} /> :
                    <Echart update={data1} style={{ width: '49%', height: "380px", backgroundColor:' #fff' }} options={option1} />
                }
                {
                  JSON.stringify(data2) === '{}' ?
                    <Empty className={styles.emptyCls} /> :
                    <Echart update={data2} style={{ width: '49%', height: "380px", backgroundColor:' #fff' }} options={option2} />
                }
              </div>
              <div className={styles.echartFamily}>
                <EchartTitle name='准考证填写率排行榜（学院）' />
                <Echart update={data1} style={{ width: '100%', height: "293px" }} options={fillCollege(['瑞博','虎落','虎落','瑞博','虎落','虎落','瑞博'],[20,30,50,30,50,30,70])} />
              </div>
              <div className={styles.echartFamily}>
                <EchartTitle name='准考证填写率排行榜（家族）' />
                <div style={{padding:'35px 80px 35px 110px'}}>
                  <SelfProgress dataList={[{name:'派学院|商进家族',per:30,color:'#ff6d6d'},{name:'2',per:50,color:'#ff8e57'},{name:'1',per:70,color:'#ffaa4d'},{name:'1',per:90}]} />
                </div>
              </div>
            </Spin>
          </div>
        </div>
      </Spin>
    );
  }

}
export default Survey;
