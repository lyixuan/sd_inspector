import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIButton from '@/ant_components/BIButton';
import BISelect from '@/ant_components/BISelect';
import style from './style.less';
import { BiFilter } from '@/utils/utils';

const { Option } = BISelect;

@connect(({ timeManage, loading }) => ({
  timeManage,
  loading: loading.models.examOrg,
}))
class TimeManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayDownload: null,
      monthDownload: null,
    };
  }

  onFormChange = (value, vname) => {
    this.setState({
      [vname]: value,
    });
  };

  render() {
    const {beginDate,endDate,dayDownload,monthDownload} = this.props.timeManage;
    return (
      <Spin spinning={false}>
        <div className={style.box}>
          <div className={style.title}>创收绩效时间管理</div>
          <div className={style.line}><span>开始日期：</span><BIDatePicker style={{ width: 230 }}
                                                                      onChange={(val, valStr) => this.onFormChange(valStr, 'beginDate')}/>
          </div>
          <div className={style.line}><span>结束日期：</span><BIDatePicker style={{ width: 230 }}
                                                                      onChange={(val, valStr) => this.onFormChange(valStr, 'endDate')}/>&nbsp;&nbsp;
            <BIButton type="primary">保存</BIButton></div>
        </div>

        <div className={style.box}>
          <div className={style.title}>创收绩效底表下载</div>
          <div className={style.line}><span>日报下载：</span>
            <BISelect style={{ width: 230 }} placeholder="请选择" value={dayDownload}
                      onChange={(val) => this.onFormChange(val, 'dayDownload')}>
              {BiFilter('QUALITY_TYPE').map(item => (
                <Option key={item.id}>
                  {item.name}
                </Option>
              ))}
            </BISelect>
            &nbsp;&nbsp;
            <BIButton type="primary">下载</BIButton></div>
          <div className={style.line}><span>月报下载：</span>
            <BISelect style={{ width: 230 }} placeholder="请选择" value={monthDownload}
                      onChange={(val) => this.onFormChange(val, 'monthDownload')}>
              {BiFilter('QUALITY_TYPE').map(item => (
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
