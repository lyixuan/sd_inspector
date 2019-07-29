import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIButton from '@/ant_components/BIButton';
import BISelect from '@/ant_components/BISelect';
import style from './style.less';
import { BiFilter } from '@/utils/utils';
import moment from 'moment/moment';

const { Option } = BISelect;

@connect(({ createIncome }) => ({
  createIncome
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
  onTimeChange = (value, vname) => {
    this.props.dispatch({
      type: 'createIncome/saveTime',
      payload: { [vname]:value },
    });
  };

  render() {
    const {startDate,endDate} = this.props.createIncome||{};
    const {achievementList} = this.props;
    const {dayDownload,monthDownload} = this.state;
    return (
      <Spin spinning={false}>
        <div className={style.box}>
          <div className={style.title}>创收绩效时间管理</div>
          <div className={style.line}><span>开始日期：</span>
            <BIDatePicker style={{ width: 230 }}
                          allowClear={false}
                          value={startDate?moment(startDate):undefined}
                          onChange={(val, valStr) => this.onTimeChange(valStr, 'startDate')}/>
          </div>
          <div className={style.line}><span>结束日期：</span>
            <BIDatePicker style={{ width: 230 }}
                          allowClear={false}
                          value={endDate?moment(endDate):undefined}
                          onChange={(val, valStr) => this.onTimeChange(valStr, 'endDate')}/>&nbsp;&nbsp;
            <BIButton type="primary">保存</BIButton></div>
        </div>

        <div className={style.box}>
          <div className={style.title}>创收绩效底表下载</div>
          <div className={style.line}><span>日报下载：</span>
            <BISelect style={{ width: 230 }} placeholder="请选择绩效包" value={dayDownload}
                      onChange={(val) => this.onFormChange(val, 'dayDownload')}>
              {achievementList.map(item => (
                <Option key={item.id}>
                  {item.name}
                </Option>
              ))}
            </BISelect>
            &nbsp;&nbsp;
            <BIButton type="primary">下载</BIButton></div>
          <div className={style.line}><span>月报下载：</span>
            <BISelect style={{ width: 230 }} placeholder="请选择绩效包" value={monthDownload}
                      onChange={(val) => this.onFormChange(val, 'monthDownload')}>
              {achievementList.map(item => (
                <Option key={item.id}>
                  {item.name}
                </Option>
              ))}
            </BISelect>
            &nbsp;&nbsp;
            <BIButton type="primary">下载</BIButton>
          </div>
        </div>
      </Spin>
    );
  }
}

export default TimeManage;
