import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Tooltip } from 'antd';
import { BiFilter } from '@/utils/utils';
import BISelect from '@/ant_components/BISelect';
import BICascader from '@/ant_components/BICascader';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { disabledDate } from '@/pages/indexPage/components/utils/utils';

const { Option } = BISelect;
const { BIRangePicker } = BIDatePicker;
const hasSubtractTime = (n, cTime) => {
  return moment(cTime).subtract(n, 'days');
}
@connect(({ newDetailModal, npsAnalyzeModel }) => ({
  npsAnalyzeModel,
  globalUserInfo: newDetailModal.globalUserInfo,
  globalDateRange: newDetailModal.globalDateRange,
  globalkpiDateRange: newDetailModal.globalkpiDateRange,
}))
class ParamsTop extends React.Component {
  componentDidMount() {
    // 初始化参数
    const params = this.props.location.query.params;
    const paramsQuery = params ? JSON.parse(params) : undefined;
    const nps_analyze_query = localStorage.getItem('nps_analyze_query');
    let paramsAllQuery =  {};
    if (paramsQuery) {
      const { dateRange, ...others} = paramsQuery;
      paramsAllQuery = { ...others, dateRange: dateRange ? [moment(dateRange[0]), moment(dateRange[1])] : []}
    } else if (nps_analyze_query) {
      paramsAllQuery = JSON.parse(nps_analyze_query) || {};
      paramsAllQuery.dateRange = [moment(paramsAllQuery.dateRange[0]), moment(paramsAllQuery.dateRange[1])];
    } else {
      const cTime = this.props.globalDateRange.endTime;
      paramsAllQuery = { orgId: this.getInitOrg(), dateRange: [hasSubtractTime(6, cTime), moment(cTime)]};
    }
    // 默认值
    // if (!paramsAllQuery.reasonType) {
    //   paramsAllQuery.reasonType = [1];
    // }
    // if (!paramsAllQuery.tagId) {
    //   paramsAllQuery.tagId = [30];
    // }
    this.props.onObjChange(paramsAllQuery);
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
  render() {
    const { onParamsChange } = this.props;
    const { paramsQuery = {}, collegeList, tagQueryData = [], reasonList = [], evaluateList = [] } = this.props.npsAnalyzeModel;
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
            {evaluateList.map((item, index) => <Option key={item.id} value={item.id}>
              <Tooltip title={item.name}>{item.name}</Tooltip>
            </Option>)}
          </BISelect>
        </span>
        <span>
          <BICascader
            placeholder="原因分类"
            changeOnSelect
            options={reasonList}
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
            options={tagQueryData}
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
            {BiFilter('WB_STAR').map(item => <Option key={item.id} value={item.id}>
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
            onChange={val => onParamsChange(val)}
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
