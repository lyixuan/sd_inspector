import React from 'react';
import { connect } from 'dva';
import PageTab from './components/pageTab';
import { BiFilter } from '@/utils/utils';
import BISelect from '@/ant_components/BISelect';
import BICascader from '@/ant_components/BICascader';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { disabledDate } from '@/pages/indexPage/components/utils/utils';
import { handleDataTrace } from '@/utils/utils';
import styles from './style.less';
import CollegeFamily from './components/collegeFamily';
import CyclePath from './components/cyclePath';

const { Option } = BISelect;
const { BIRangePicker } = BIDatePicker;
@connect(({ newDetailModal, resubmitModal }) => ({
  resubmitModal,
  globalUserInfo: newDetailModal.globalUserInfo,
  // globalUserType: newDetailModal.globalUserType,
  globalDateMoment: newDetailModal.globalDateMoment,
  globalkpiDateRange: newDetailModal.globalkpiDateRange,
  paramsQuery: resubmitModal.paramsQuery,
  collegeList: resubmitModal.collegeList
}))
class Resubmit extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'resubmitModal/getCollegeList',
    });
    this.onParamsChange(this.props.globalDateMoment);
    handleDataTrace({
      widgetName: `创收_创收排名`,
      traceName: `2.1/创收_创收排名`,
      traceType: 200,
    });
  }
  // 搜索条件值改变
  onParamsChange = (val, type = 'dateRange') => {
    this.props.dispatch({
      type: 'resubmitModal/saveParams',
      payload: { [type]: val },
    });
  };
  // 时间
  onDateChange = (val, type = 'dateRange') => {
    this.props.dispatch({
      type: 'resubmitModal/saveParams',
      payload: { [type]: val,  originPackageName: undefined, packageName: undefined},
    });
  }
  getTabs = () => {
    return [
      {
        title: '数据透视',
        children: (
          <>
            <CollegeFamily />
            <CyclePath />
          </>
        ),
        dataTrace: '{"widgetName":"学分分析","traceName":"家族长工作台/学分分析"}',
      },
      {
        title: '创收明细',
        children: <></>,
      },
    ];
  };
  render() {
    const { paramsQuery = {}, collegeList } = this.props;
    return (
      <div className={styles.resubmit}>
        <div className={styles.paramsQuery}>
          <span>
            <BICascader
              placeholder="选择组织"
              changeOnSelect
              options={collegeList}
              fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
              getPopupContainer={triggerNode => triggerNode.parentNode}
              displayRender={this.renderCascader}
              value={paramsQuery.groupId}
              onChange={val => this.onParamsChange(val, 'groupId')}
              allowClear
              style={{ width: 170 }}
            />
          </span>
          <span>
            <BISelect style={{ width: 136 }} placeholder="全部" value={paramsQuery.originPackageName} onChange={val => this.onParamsChange(val, 'originPackageName')} allowClear>
              {collegeList.map(item => <Option key={item.id} value={item.id} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
                {item.name}
              </Option>)}
            </BISelect>
          </span>
          <span>
            <BISelect style={{ width: 136 }} placeholder="全部" value={paramsQuery.packageName} onChange={val => this.onParamsChange(val, 'packageName')} allowClear>
              {collegeList.map(item => <Option key={item.id} value={item.id} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
                {item.name}
              </Option>)}
            </BISelect>
          </span>
          <span>
            <BISelect style={{ width: 90 }} placeholder="全部" value={paramsQuery.path} onChange={val => this.onParamsChange(val, 'path')} allowClear>
              {BiFilter('WB_PATH_LIST').map(item => <Option key={item.id} value={item.id} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
                {item.name}
              </Option>)}
            </BISelect>
          </span>
          <span>
            <BISelect style={{ width: 90 }} placeholder="全部" value={paramsQuery.lifeCycle} onChange={val => this.onParamsChange(val, 'lifeCycle')} allowClear>
              {BiFilter('WB_LIFE_CYCLE').map(item => <Option key={item.id} value={item.id} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
                {item.name}
              </Option>)}
            </BISelect>
          </span>
          <span className={styles.dataRange}>
            <BIRangePicker
              value={paramsQuery.dateRange}
              placeholder={['选择起始时间', '选择截止时间']}
              format='YYYY-MM-DD'
              onChange={val => this.onDateChange(val, 'dateRange')}
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
