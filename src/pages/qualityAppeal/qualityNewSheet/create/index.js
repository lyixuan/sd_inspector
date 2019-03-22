import React from 'react';
import { connect } from 'dva';

import styles from './style.less';
import SubOrderDetail from './../../components/subOrderDetail';
import FormComponent from '../component/form';
import { BaseModels } from '../_utils/baseModels';

@connect(({ createQualityNewSheet1, qualityAppealHome, qualityNewSheet, loading }) => ({
  createQualityNewSheet1,
  orgList: qualityAppealHome.orgList,
  orgMapByMailData: qualityAppealHome.orgMapByMailData,
  orderNumData: qualityAppealHome.orderNumData,
  dimensionTreeList: qualityNewSheet.dimensionTreeList,
  dimensionList1: qualityAppealHome.dimensionList1, // 客诉分维
  dimensionList2: qualityAppealHome.dimensionList2, // 班主任分维
  mailDataLoading: loading.effects['qualityAppealHome/getOrgMapByMail'],
  getOrderNumLoading: loading.effects['qualityAppealHome/getOrderNum'],
}))
class CreateQualityNewSheet extends React.Component {
  constructor(props) {
    super(props);
    this.paramsModel = new BaseModels();
    this.state = {
      params: this.paramsModel.initModel,
    };
  }
  componentDidMount() {
    const { orgMapByMailData } = this.props;
    // 初始化更新form的value
    this.handleOrgMapByMailParams(orgMapByMailData);
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.orgMapByMailData) !== JSON.stringify(this.props.orgMapByMailData)) {
      // 使用邮箱获取组织机构信息
      this.handleOrgMapByMailParams(nextProps.orgMapByMailData);
    }
  }
  handleOrgMapByMailParams = (params) => {
    const newParams = this.paramsModel.HandleOrgMapByMail(params);
    this.upDateFormParams(newParams);
  }
  getOrgMapByMail = (mail, values) => {
    if (!mail) return;
    this.props.dispatch({
      type: 'qualityAppealHome/getOrgMapByMail',
      payload: { mail },
    });
    this.saveParams(values);
  }
  getOrderNum = (orderNum, values) => {
    if (!orderNum) return;
    this.props.dispatch({
      type: 'qualityAppealHome/getOrderNum',
      payload: { orderNum },
    });
    this.saveParams(values);
  }
  changeDimension = (params = {}, values) => {
    this.props.dispatch({
      type: 'qualityNewSheet/queryDimensionTreeList',
      payload: { ...params },
    });
    this.saveParams(values);

  }
  upDateFormParams = (newParams = {}) => {
    this.saveParams(newParams);
  }
  saveParams = (nextParams = {}) => {
    const { params } = this.state;
    const newParams = { ...params, ...nextParams };
    this.setState({ params: newParams });
  }
  onSubmit = (params) => {
    console.log(params)
  }
  render() {
    const { params } = this.state;
    const { orgList } = this.props;
    return (<div>
      {/* form区域 */}
      <FormComponent
        {...this.props}
        params={params}
        orgList={orgList}
        getOrgMapByMail={this.getOrgMapByMail}
        getOrderNum={this.getOrderNum}
        changeDimension={this.changeDimension}
        onSubmit={this.onSubmit}
      />
    </div>)
  }
}
export default CreateQualityNewSheet;