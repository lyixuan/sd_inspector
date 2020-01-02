import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Tooltip } from 'antd';
import { BiFilter } from '@/utils/utils';
import BISelect from '@/ant_components/BISelect';
import BICascader from '@/ant_components/BICascader';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { disabledDate } from '@/pages/indexPage/components/utils/utils';
import styles from './style.less';

const { Option } = BISelect;
const { BIRangePicker } = BIDatePicker;
@connect(({ newDetailModal, resubmitModal }) => ({
  resubmitModal,
  globalUserInfo: newDetailModal.globalUserInfo,
  globalDateMoment: newDetailModal.globalDateMoment,
  globalkpiDateRange: newDetailModal.globalkpiDateRange,
}))
class ParamsTop extends React.Component {
  componentDidMount() {
    // 初始化参数
    const resubmit_query = localStorage.getItem('resubmit_query');
    console.log('resubmit_query', 'mmmmmmm', this.props.globalUserInfo)
    if (resubmit_query) {
      const query = JSON.parse(resubmit_query) || {};
      query.dateRange = [moment(query.dateRange[0]), moment(query.dateRange[1])];
      this.props.onObjChange(query);
    } else {
      this.props.onObjChange({ orgId: this.getInitOrg(), dateRange: this.props.globalDateMoment})
    }
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
  onDateChange = dateRange => {
    const { onObjChange } = this.props;
    if (onObjChange && typeof onObjChange === 'function') {
      this.props.onObjChange({ dateRange, originPackageName: undefined, packageName: undefined})
    }
  }
  render() {
    const { onParamsChange } = this.props;
    const { paramsQuery = {}, collegeList, originSelectData = [], packageSelectData = [] } = this.props.resubmitModal;
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
          <BISelect style={{ width: 136 }} placeholder="原产品包" value={paramsQuery.originPackageName} onChange={val => onParamsChange(val, 'originPackageName')} allowClear>
            {originSelectData.map(item => <Option key={item.packageName} value={item.packageName} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
              <Tooltip title={item.packageName}>{item.packageName}</Tooltip>
            </Option>)}
          </BISelect>
        </span>
        <span>
          <BISelect style={{ width: 136 }} placeholder="续报产品包" value={paramsQuery.packageName} onChange={val => onParamsChange(val, 'packageName')} allowClear>
            {packageSelectData.map(item => <Option key={item.packageName} value={item.packageName} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
              <Tooltip title={item.packageName}>{item.packageName}</Tooltip>
            </Option>)}
          </BISelect>
        </span>
        <span>
          <BISelect 
          style={{ width: 104 }} 
          placeholder="续报路径" 
          value={paramsQuery.path} 
          onChange={val => onParamsChange(val, 'path')} 
          allowClear
          dropdownClassName={styles.path}
          >
            {BiFilter('WB_PATH_LIST').map(item => <Option key={item.id} value={item.id} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
              {item.name}
            </Option>)}
          </BISelect>
        </span>
        <span>
          <BISelect 
          style={{ width: 90 }} 
          placeholder="周期" 
          value={paramsQuery.lifeCycle}
          onChange={val => onParamsChange(val, 'lifeCycle')} 
          allowClear
          >
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
            onChange={this.onDateChange}
            allowClear={false}
            disabledDate={val => disabledDate(val, this.props.globalkpiDateRange)}
            style={{ width: 224 }}
          />
        </span>
      </>
    );
  }
}

export default ParamsTop;
