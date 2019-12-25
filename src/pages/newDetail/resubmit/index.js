import React from 'react';
import { connect } from 'dva';
import PageTab from './components/pageTab';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { disabledDate } from '@/pages/indexPage/components/utils/utils';
import { handleDataTrace } from '@/utils/utils';
import styles from './style.less';

const { BIRangePicker } = BIDatePicker;

@connect(({ newDetailModal, resubmitModal }) => ({
  resubmitModal,
  // globalUserInfo: newDetailModal.globalUserInfo,
  // globalUserType: newDetailModal.globalUserType,
  globalDateMoment: newDetailModal.globalDateMoment,
  globalkpiDateRange: newDetailModal.globalkpiDateRange,
  paramsQuery: resubmitModal.paramsQuery,
}))
class Resubmit extends React.Component {
  componentDidMount() {
    this.onParamsChange(this.props.globalDateMoment);
    handleDataTrace({"widgetName":`创收_创收排名`,"traceName":`2.1/创收_创收排名`,traceType:200});
  }

  // select
  onParamsChange = (val, type = 'dateRange') => {
    this.props.dispatch({
      type: 'resubmitModal/saveParams',
      payload: { [type]: val },
    });
  };
  getTabs = () => {
    return [
      {
        title: '数据透视',
        children: (
          <></>
        ),
        dataTrace: '{"widgetName":"学分分析","traceName":"家族长工作台/学分分析"}',
      },
      {
        title: '创收明细',
        children: (
          <></>
        )
      },
    ] 
  }
  render() {
    const { paramsQuery = {} } = this.props;
    return (
      <div className={styles.resubmit}>
        <div className={styles.paramsQuery}>
          <span className={styles.dataRange}>
            <BIRangePicker
              value={paramsQuery.dateRange}
              placeholder={['选择起始时间', '选择截止时间']}
              format='YYYY-MM-DD'
              onChange={val => this.onParamsChange(val, 'dateRange')}
              allowClear={false}
              disabledDate={val => disabledDate(val, this.props.globalkpiDateRange)}
              style={{ width: 224 }}
            />
          </span>
        </div>
        <PageTab tabs={this.getTabs()} />
      </div>
    );
  }
}

export default Resubmit;
