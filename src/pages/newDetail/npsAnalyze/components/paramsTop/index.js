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
@connect(({ newDetailModal, npsAnalyzeModel }) => ({
  npsAnalyzeModel,
  globalUserInfo: newDetailModal.globalUserInfo,
  globalDateMoment: newDetailModal.globalDateMoment,
  globalkpiDateRange: newDetailModal.globalkpiDateRange,
}))
class ParamsTop extends React.Component {
  componentDidMount() {
    // 初始化参数
    const nps_analyze_query = localStorage.getItem('nps_analyze_query');
    if (nps_analyze_query) {
      const query = JSON.parse(nps_analyze_query) || {};
      query.dateRange = [moment(query.dateRange[0]), moment(query.dateRange[1])];
      this.props.onObjChange(query);
    } else {
      this.props.onObjChange({ orgId: this.getInitOrg(), dateRange: this.props.globalDateMoment})
    }
  }
  // 组织初始化---角色属于什么组织默认什么组织---默认到学院家族
  getInitOrg = () => {
    const { collegeId, familyId, groupId } = this.props.globalUserInfo;
    const orgId = [];
    if (collegeId && familyId && groupId) {
      orgId.push(collegeId, familyId, groupId);
    } else if (collegeId) {
      orgId.push(collegeId, familyId);
    } else if (collegeId) {
      orgId.push(collegeId);
    }
    return orgId;
  }
  onDateChange = dateRange => {
    const { onObjChange } = this.props;
    // if (onObjChange && typeof onObjChange === 'function') {
    //   this.props.onObjChange({ dateRange, originPackageName: undefined, packageName: undefined})
    // }
  }
  render() {
    const { onParamsChange } = this.props;
    const { paramsQuery = {}, collegeList, originSelectData = [], packageSelectData = [] } = this.props.npsAnalyzeModel;
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
          <BISelect style={{ width: 100 }} placeholder="自主评价" value={paramsQuery.evaluateType} onChange={val => onParamsChange(val, 'evaluateType')} allowClear>
            {originSelectData.map(item => <Option key={item.packageName} value={item.packageName}>
              <Tooltip title={item.packageName}>{item.packageName}</Tooltip>
            </Option>)}
          </BISelect>
        </span>
        <span>
          <BICascader
            placeholder="原因分类"
            changeOnSelect
            options={collegeList}
            fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
            getPopupContainer={triggerNode => triggerNode.parentNode}
            displayRender={this.renderCascader}
            value={paramsQuery.reasonType}
            onChange={val => onParamsChange(val, 'reasonType')}
            allowClear
            style={{ width: 90 }}
          />
        </span>
        <span>
          <BICascader
            placeholder="NPS标签"
            changeOnSelect
            options={collegeList}
            fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
            getPopupContainer={triggerNode => triggerNode.parentNode}
            displayRender={this.renderCascader}
            value={paramsQuery.tagId}
            onChange={val => onParamsChange(val, 'tagId')}
            allowClear
            style={{ width: 90 }}
          />
        </span>
        <span>
          <BISelect 
          style={{ width: 90 }} 
          placeholder="星级" 
          value={paramsQuery.star} 
          onChange={val => onParamsChange(val, 'star')} 
          allowClear
          >
            {BiFilter('WB_PATH_LIST').map(item => <Option key={item.id} value={item.id}>
              {item.name}
            </Option>)}
          </BISelect>
        </span>
        <span>
          <BISelect 
          style={{ width: 90 }} 
          placeholder="周期" 
          value={paramsQuery.cycle}
          onChange={val => onParamsChange(val, 'cycle')} 
          allowClear
          >
            {BiFilter('WB_LIFE_CYCLE').map(item => <Option key={item.id} value={item.id}>
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