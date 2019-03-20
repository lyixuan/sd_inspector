import React from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import Echart from '@/components/Echart';
import moment from 'moment';
import memoizeOne from 'memoize-one';
import styles from './style.less';
import Empty from '@/components/Empty';
import ChinaMap from './component/ChinaMap';
import SearchForm from './component/SearchForm';
import { chartOptions } from './component/EchartCommonOptions';
import EchartTitle from './component/EchartCommonOptions/echartTitle';
import SelfProgress from './component/EchartCommonOptions/fillRateFamily';
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
      HistogramDataParams: {
        province: null,
        collegeId: null,
        familyId: null,
        beginDate: "",
        endDate: "",
      },
      familyExamOrgParams: {
        province: '',
        beginDate: this.getLastDateParams(),
        endDate: this.getLastDateParams(),
        orgType: 'family',
      },
      collegeExamOrgParams: {
        province: '',
        beginDate: this.getLastDateParams(),
        endDate: this.getLastDateParams(),
        orgType: 'college',
      }

    };

  }
  componentDidMount() {
    const { HistogramDataParams, familyExamOrgParams, collegeExamOrgParams } = this.state;
    this.getMapInfo();// 组织架构
    this.getProvinceJson();// 省份
    this.queryHistogramData(HistogramDataParams);
    this.getExamOrgData(familyExamOrgParams);    //  获取省份对应家族排行榜数据
    this.getExamOrgData(collegeExamOrgParams);   //  获取省份对应学院排行榜数据
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
  getExamOrgData = (payload = {}) => {
    this.props.dispatch({
      type: 'survey/examProvinceOrg',
      payload,
    })
  }

  searchData = param => {
    this.setState(param);
    this.queryHistogramData(param)
  };
  onChangeExamOrg = (value = {}) => {
    const { orgType } = value;
    const paramsObj = {};
    if (!orgType) {
      return;
    }
    const originParams = this.state[`${orgType}ExamOrgParams`];
    const newParams = { ...originParams, ...value }
    paramsObj[`${orgType}ExamOrgParams`] = newParams;
    this.setState({ ...paramsObj });
    this.getExamOrgData(newParams);

  }
  getLastDateParams = () => {
    return moment().add(-1, 'days').format('YYYY-MM-DD');
  }
  handleFamilyExamOrgData = (data = []) => {
    return data.sort((a, b) => b.admissionFillRatio - a.admissionFillRatio).map(item => ({
      ...item,
      name: `${item.collegeName}|${item.familyName}`,
      per: (item.admissionFillRatio || 0) * 100,
      color: '#52C9C2'
    }));
  }
  handleCollegeExamOrgData = (data = []) => {
    return fillCollege(data)
  }
  momenyFamilyExamOrgData = memoizeOne(this.handleFamilyExamOrgData);
  momenyCollegeExamOrgData = memoizeOne(this.handleCollegeExamOrgData);
  render() {
    const { mapInfo, survey } = this.props;
    const { familyExamOrgParams, collegeExamOrgParams } = this.state;
    const { dataList = {}, familyExamOrgData = [], collegeExamOrgData = [] } = survey;
    const { data1 = {}, data2 = {} } = dataList;
    const { option1, option2 } = chartOptions(survey);
    const familyExamOptionsData = this.momenyFamilyExamOrgData(familyExamOrgData);
    const collegeExamOptionsData = this.momenyCollegeExamOrgData(collegeExamOrgData)
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
                    <Echart update={data1} style={{ width: '49.5%', height: "380px", backgroundColor: ' #fff' }} options={option1} />
                }
                {
                  JSON.stringify(data2) === '{}' ?
                    <Empty className={styles.emptyCls} /> :
                    <Echart update={data2} style={{ width: '49.5%', height: "380px", backgroundColor: ' #fff' }} options={option2} />
                }
              </div>
              <div className={styles.echartFamily}>
                <EchartTitle onChangeExamOrg={this.onChangeExamOrg} paramsData={collegeExamOrgParams} />
                <Echart update={data1} style={{ width: '100%', height: "293px" }}
                  options={collegeExamOptionsData}
                  isEmpty={collegeExamOrgData.length === 0}
                />
              </div>
              <div className={styles.echartFamily}>
                <EchartTitle onChangeExamOrg={this.onChangeExamOrg} paramsData={familyExamOrgParams} />
                <SelfProgress dataList={familyExamOptionsData} isEmpty={familyExamOrgData.length === 0} />
              </div>
            </Spin>
          </div>
        </div>
      </Spin>
    );
  }

}
export default Survey;
