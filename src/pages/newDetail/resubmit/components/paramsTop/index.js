import React from 'react';
import { connect } from 'dva';
import { BiFilter } from '@/utils/utils';
import BISelect from '@/ant_components/BISelect';
import BICascader from '@/ant_components/BICascader';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { disabledDate } from '@/pages/indexPage/components/utils/utils';
import { handleDataTrace } from '@/utils/utils';

const { Option } = BISelect;
const { BIRangePicker } = BIDatePicker;
@connect(({ newDetailModal, resubmitModal }) => ({
  globalUserInfo: newDetailModal.globalUserInfo,
  globalDateMoment: newDetailModal.globalDateMoment,
  globalkpiDateRange: newDetailModal.globalkpiDateRange,
  paramsQuery: resubmitModal.paramsQuery,
  collegeList: resubmitModal.collegeList
}))
class Resubmit extends React.Component {
  componentDidMount() {
    // 初始化参数
    this.props.dispatch({
      type: 'resubmitModal/saveParams',
      payload: { orgId: this.getInitOrg(), dateRange: this.props.globalDateMoment},
    });
  }
  // 组织初始化---角色属于什么组织默认什么组织---默认到学院家族
  getInitOrg = () => {
    const { collegeId, familyId } = this.props.globalUserInfo;
    const orgId = [];
    if (collegeId && familyId) {
      orgId.push(collegeId, familyId);
    } else if (collegeId) {
      orgId.push(collegeId);
    } 
    return orgId;
  }
  render() {
    const { paramsQuery = {}, collegeList, onDateChange, onParamsChange } = this.props;
    return (
      <>
        <span>
          <BICascader
            placeholder="选择组织"
            changeOnSelect
            options={collegeList}
            fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
            getPopupContainer={triggerNode => triggerNode.parentNode}
            displayRender={this.renderCascader}
            value={paramsQuery.orgId}
            onChange={val => onParamsChange(val, 'orgId')}
            allowClear
            style={{ width: 170 }}
          />
        </span>
        <span>
          <BISelect style={{ width: 136 }} placeholder="全部" value={paramsQuery.originPackageName} onChange={val => onParamsChange(val, 'originPackageName')} allowClear>
            {collegeList.map(item => <Option key={item.id} value={item.id} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
              {item.name}
            </Option>)}
          </BISelect>
        </span>
        <span>
          <BISelect style={{ width: 136 }} placeholder="全部" value={paramsQuery.packageName} onChange={val => onParamsChange(val, 'packageName')} allowClear>
            {collegeList.map(item => <Option key={item.id} value={item.id} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
              {item.name}
            </Option>)}
          </BISelect>
        </span>
        <span>
          <BISelect style={{ width: 90 }} placeholder="全部" value={paramsQuery.path} onChange={val => onParamsChange(val, 'path')} allowClear>
            {BiFilter('WB_PATH_LIST').map(item => <Option key={item.id} value={item.id} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
              {item.name}
            </Option>)}
          </BISelect>
        </span>
        <span>
          <BISelect style={{ width: 90 }} placeholder="全部" value={paramsQuery.lifeCycle} onChange={val => onParamsChange(val, 'lifeCycle')} allowClear>
            {BiFilter('WB_LIFE_CYCLE').map(item => <Option key={item.id} value={item.id} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
              {item.name}
            </Option>)}
          </BISelect>
        </span>
        <span>
          <BIRangePicker
            value={paramsQuery.dateRange}
            placeholder={['选择起始时间', '选择截止时间']}
            format='YYYY-MM-DD'
            onChange={val => onDateChange(val, 'dateRange')}
            allowClear={false}
            disabledDate={val => disabledDate(val, this.props.globalkpiDateRange)}
            style={{ width: 224 }}
          />
        </span>
      </>
    );
  }
}

export default Resubmit;
