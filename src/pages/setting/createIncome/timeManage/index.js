import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIButton from '@/ant_components/BIButton';
import BISelect from '@/ant_components/BISelect';
import style from './style.less';
import moment from 'moment/moment';
import { message } from 'antd/lib/index';

const { Option } = BISelect;

@connect(({ createIncome, loading }) => ({
  createIncome,
  loadingTime: loading.effects['createIncome/getTimeRange'],
}))
class TimeManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayDownload: undefined,
      monthDownload: undefined,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'createIncome/getTimeRange',
      payload: { params: {} },
    });
  }

  onFormChange = (value,vname)=>{
    this.setState({
      [vname]:value
    });
  };

  onTimeChange = (value, vname) => {
    this.props.dispatch({
      type: 'createIncome/saveTime',
      payload: { [vname]: value },
    });
  };

  timeSave = () => {
    const { startDate, endDate } = this.props.createIncome || {};
    this.props.dispatch({
      type: 'createIncome/putTimeRange',
      payload: { startDate, endDate },
    });
  };

  download = (type) => {
    const {dayDownload,monthDownload} = this.state;
    let kpiPackageStartDate;
    let kpiPackageEndDate;
    let arr = [];
    if (type===1) {
      if (!dayDownload) {
        message.warn('请选择绩效包');
        return;
      }
      arr = dayDownload.split('至');
    }
    if (type===2) {
      if (!monthDownload) {
        message.warn('请选择绩效包');
        return;
      }
      arr = monthDownload.split('至');
    }
    kpiPackageStartDate = arr[0];
    kpiPackageEndDate = arr[1];
    this.props.dispatch({
      type: 'createIncome/reportDownload',
      payload: { type,kpiPackageStartDate,kpiPackageEndDate },
    });
  };

  render() {
    const { startDate, endDate } = this.props.createIncome || {};
    const { achievementList, loadingTime, loading } = this.props;
    const { dayDownload, monthDownload } = this.state;
    return (
      <>
        <Spin spinning={loadingTime}>
          <div className={style.box}>
            <div className={style.title}>创收绩效时间管理</div>
            <div className={style.line}><span>开始日期：</span>
              <BIDatePicker style={{ width: 230 }}
                            allowClear={false}
                            value={startDate ? moment(startDate) : undefined}
                            onChange={(val, valStr) => this.onTimeChange(valStr, 'startDate')}/>
            </div>
            <div className={style.line}><span>结束日期：</span>
              <BIDatePicker style={{ width: 230 }}
                            allowClear={false}
                            value={endDate ? moment(endDate) : undefined}
                            onChange={(val, valStr) => this.onTimeChange(valStr, 'endDate')}/>&nbsp;&nbsp;
              <BIButton type="primary" onClick={this.timeSave}>保存</BIButton></div>
          </div>
        </Spin>
        <Spin spinning={loading}>
          <div className={style.box}>
            <div className={style.title}>创收绩效底表下载</div>
            <div className={style.line}><span>日报下载：</span>
              <BISelect style={{ width: 230 }} placeholder="请选择绩效包" value={dayDownload}
                        onChange={(val) => this.onFormChange(val, 'dayDownload')}>
                {achievementList.map(item => (
                  <Option key={`${moment(item.effectiveDate).format('YYYY-MM-DD')}至${moment(item.expiryDate).format('YYYY-MM-DD')}`}>
                    {`${moment(item.effectiveDate).format('YYYY-MM-DD')}至${moment(item.expiryDate).format('YYYY-MM-DD')}`}
                  </Option>
                ))}
              </BISelect>
              &nbsp;&nbsp;
              <BIButton type="primary" onClick={()=>this.download(1)}>下载</BIButton></div>
            <div className={style.line}><span>月报下载：</span>
              <BISelect style={{ width: 230 }} placeholder="请选择绩效包" value={monthDownload}
                        onChange={(val) => this.onFormChange(val, 'monthDownload')}>
                {achievementList.map(item => (
                  <Option key={`${moment(item.effectiveDate).format('YYYY-MM-DD')}至${moment(item.expiryDate).format('YYYY-MM-DD')}`}>
                    {`${moment(item.effectiveDate).format('YYYY-MM-DD')}至${moment(item.expiryDate).format('YYYY-MM-DD')}`}
                  </Option>
                ))}
              </BISelect>
              &nbsp;&nbsp;
              <BIButton type="primary" onClick={()=>this.download(2)}>下载</BIButton>
            </div>
          </div>
        </Spin>
      </>
    );
  }
}

export default TimeManage;
