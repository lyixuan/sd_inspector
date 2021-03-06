import React from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import Echart from '@/components/Echart';
import BITabs from '@/ant_components/BITabs';
import BIDatePicker from '@/ant_components/BIDatePicker';
import staticMap from '@/assets/staticMap.svg';
import styles from './style.less';
import { blendChartOptions } from './component/echartOptions/college_options';
import { famProOPtion } from './component/echartOptions/family_prov_options';
import { groupOPtion } from './component/echartOptions/group_options';
import moment from 'moment/moment';
import config from '../../../../config/config';
import BIButton from '@/components/BIButtonGreen';

const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY-MM-DD';
@connect(({ exam, loading }) => ({
  exam,
  loading: loading.models.exam,
}))
class Survey extends React.Component {
  constructor(props) {
    super(props);
    const day = (new Date()).getTime() - 24 * 60 * 60 * 1000;
    this.state = {
      isShowMore: false,
      loading: props.loading || null,
      beginDate: moment(day).format('YYYY-MM-DD'),
      // beginDate: '2019-03-01',
      endDate: moment(day).format('YYYY-MM-DD'),
      tabId: 'examPlan',
      name: '考试计划人数',
      legend: ['人均服务老生', '人均服务新生', '老生考试计划人数', '新生考试计划人数'],
      legendGroup: ['新生考试计划人数/人均服务新生', '老生考试计划人数/人均服务老生'],
    };
  }
  componentDidMount() {
    const { beginDate, endDate } = this.state;
    const param = { beginDate, endDate };
    this.examTotal();
    this.province(param);
    this.examOrg('college', param);
    this.examOrg('family', param);
    this.examOrg('group', param);
  }
  examTotal = () => {
    this.props.dispatch({
      type: 'exam/examTotal',
    })
  };
  province = (param) => {
    const { beginDate, endDate } = param;
    this.props.dispatch({
      type: 'exam/province',
      payload: { beginDate, endDate },
    })
  };
  examOrg = (orgType, params) => {
    const { beginDate, endDate } = params;
    const param = {
      beginDate, endDate, orgType
    };
    this.props.dispatch({
      type: 'exam/examOrg',
      payload: param,
    })
  };

  switchContent = (val) => {
    if (val === 'examPlan') {
      this.setState({
        tabId: "examPlan",
        name: '考试计划人数',
        legend: ['人均服务老生', '人均服务新生', '老生考试计划人数', '新生考试计划人数'],
        legendGroup: ['新生考试计划人数/人均服务新生', '老生考试计划人数/人均服务老生'],
      })
    } else if (val === 'examNotice') {
      this.setState({
        tabId: "examNotice",
        name: '报考通知人数',
        legend: ['老生触达率', '新生触达率', '应通知老生人数', '应通知新生人数', '触达人数', '触达率'],
        legendGroup: ['新生应通知人数/新生触达率', '老生应通知人数/老生触达率', '未触达人数/未触达率', '触达人数/触达率']
      })
    } else if (val === 'examTicket') {
      this.setState({
        tabId: "examTicket",
        name: '准考证填写人数',
        legend: ['老生填写率', '新生填写率', '老生填写人数', '新生填写人数', '填写人数', '填写率'],
        legendGroup: ['新生填写人数/新生填写率', '老生填写人数/老生填写率', '未填写人数/未填写率', '填写人数/填写率']
      })
    }
    this.getMoreData(false)
  };
  // 时间控件可展示的时间范围
  disabledDate = current => {
    const day1 = new Date();
    day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
    return current < moment('2018-10-23') || current > moment(day1, dateFormat);
  };
  // 日期修改
  dateChange = (value, dateString) => {
    const date = {
      beginDate: dateString[0],
      endDate: dateString[1],
    };
    this.setState(date);
    this.province(date);
    this.examOrg('college', date);
    this.examOrg('family', date);
    this.examOrg('group', date);
  };
  getMoreData = (isShow) => {
    if (isShow) {
      this.setState({
        isShowMore: isShow,
        loading: true,
      });
      setTimeout(() => {
        this.setState({
          isShowMore: isShow,
          loading: false,
        });
      }, 800)
    } else {
      this.setState({
        isShowMore: isShow
      });
    }
  };
  eConsole = (e) => {
    const { tabId, beginDate, endDate } = this.state;
    const proName = e.data && e.data.name ? e.data.name : '';
    const origin = window.location.origin;
    window.open(`${origin}${config.base}smartPlatform/exam/collegeinfo?name=${proName}&type=${tabId}&beginDate=${beginDate}&endDate=${endDate}`);
  };
  isEmptyArr = (data) => {
    const { tabId } = this.state;
    return data[tabId] && data[tabId].data1.length;
  };
  render() {
    const { tabId, endDate, beginDate, isShowMore, loading } = this.state;
    const { exam } = this.props;

    const unit = tabId === 'examPlan' ? '人' : '%';
    const { porDataList = {}, colDataList = {}, famDataMap = {}, groDataList = {}, examTotal = {} } = exam;

    const tabData = [{ name: '考试计划', id: 'examPlan', data: [] }, { name: '报考通知', id: 'examNotice', data: [] }, { name: '准考证填写', id: 'examTicket', data: [] }];
    return (
      <Spin spinning={loading ? loading : this.props.loading}>
        <BITabs onChange={this.switchContent} type="card" tabBarStyle={{ backgroundColor: '#fff', padding: '19px 0 0 30px' }}>
          {tabData.map(item => <BITabs.TabPane tab={item.name} key={item.id} />)}
        </BITabs>
        <div className={styles.m_container}>
          <div className={styles.map_container}>
            <div style={{ width: '928px', margin: '0 auto' }}>
              <img src={staticMap} alt="" width='631' height='526' style={{ margin: '29px 47px 20px 0' }} />
              <div className={styles.m_mapInfo}>
                {
                  examTotal[tabId] ? examTotal[tabId].map((itemList, i) => {
                    return <p key={itemList.name} className={i === 0 ? styles.map_title : styles.map_txt}>{itemList.name}{itemList.value}</p>
                  }) : null
                }
              </div>
            </div>
          </div>
          <div className={styles.selectTime}>
            <span className={styles.selectTxt}>筛选日期</span>
            <BIRangePicker
              placeholder={['开始时间', '结束时间']}
              onChange={this.dateChange}
              style={{ width: '230px' }}
              disabledDate={this.disabledDate}
              allowClear={false}
              value={beginDate && endDate ? [moment(beginDate, dateFormat), moment(endDate, dateFormat)] : ''}
            />
          </div>
          <div className={styles.echartCls}>
            <div className='m_box'>
              <p className={styles.proTip}>点击省份可查看该省份的学院及家族数据</p>
              <Echart isEmpty={this.isEmptyArr(porDataList) === 0} clickEvent={this.eConsole} style={{ width: '100%', height: `${this.isEmptyArr(porDataList) !== 0 ? this.isEmptyArr(porDataList) * 50 : 400}px` }} options={famProOPtion(this.state, porDataList, 'pro', undefined, unit, tabId)} />
            </div>
            <div className='m_box'><Echart isEmpty={this.isEmptyArr(colDataList) === 0} style={{ width: '100%', height: "410px" }} options={blendChartOptions(this.state, colDataList, 'all', undefined, unit, tabId)} /></div>
            <div className='m_box'><Echart isEmpty={this.isEmptyArr(famDataMap) === 0} style={{ width: '100%', height: `${this.isEmptyArr(famDataMap) !== 0 ? this.isEmptyArr(famDataMap) * 50 : 400}px` }} options={famProOPtion(this.state, famDataMap, 'fam', undefined, unit, tabId)} /></div>
            <div className='m_box'>
              <Echart isEmpty={this.isEmptyArr(groDataList) === 0} style={{ width: '100%', height: `${this.isEmptyArr(groDataList) !== 0 ? isShowMore ? this.isEmptyArr(groDataList) * 48 : 960 : 400}px` }} options={groupOPtion(this.state, groDataList, isShowMore)} />
              {!isShowMore && this.isEmptyArr(groDataList) !== 0 ? <BIButton type="primary" style={{ marginBottom: '20px' }} onClick={this.getMoreData.bind(this, true)}>查看更多</BIButton> : null}
            </div>
          </div>
        </div>
      </Spin>
    );
  }

}
export default Survey;
