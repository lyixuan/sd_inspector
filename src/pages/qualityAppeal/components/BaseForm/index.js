import React from 'react';
import { connect } from 'dva';
import BaseForm from '@/pages/qualityAppeal/components/BaseForm/form';

@connect(({ loading, qualityAppealHome }) => ({
  loading,
  qualityAppealHome,
  loadingMail: loading.effects['qualityAppealHome/getOrgMapByMail'],
  loadingOrder: loading.effects['qualityAppealHome/getOrderNum'],
}))

class FormIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = { };
  }

  // 根据邮箱获取基本信息
  getOrgMapByMail = (mail) => {
    this.props.dispatch({
      type: 'qualityAppealHome/getOrgMapByMail',
      payload: { mail },
    }).then((res) => {
      let obj = { role: undefined, name: undefined, organize: undefined };
      if (res) {
        obj = { role: res.userType, name: res.name, organize: [res.collegeId, res.familyId, res.groupId] };
      }
      this.setState(obj);
    });
  };

  // 获取子订单信息
  getSubOrderDetail = (orderNum) => {
    this.props.dispatch({
      type: 'qualityAppealHome/getOrderNum',
      payload: { orderNum: orderNum ? orderNum : '' },
    });
  };

  // 根据分维获取违规分类
  getDimensionTreeList = (dimensionId, qualityType) => {
    this.props.dispatch({
      type: 'qualityAppealHome/queryDimensionTreeList',
      payload: { dimensionId, qualityType },
    });
  };

  // 修改违规分类
  changeDimensionTree = (object) => {
    const { qualityType, violationLevel } = object || {};
    let obj = { qualityType, violationLevel };
    this.setState(obj);
  };

  getPunishInfo(violationLevel, role, qualityType) {
    const params = {
      violationLevel: violationLevel,
      userType: role,
      qualityType: qualityType,
    };
    this.props.dispatch({
      type: 'qualityAppealHome/getPunishInfoList',
      payload: { params },
    }).then(res => {
      const params = {
        punishType: res.punishType,
        qualityValue: res.qualityValue,
      };
    });
  }

  onSubmit = (params) => {
    this.props.onSubmit(params);
  };

  render() {
    const { formType, upLoadType, params, loadingMail, loadingOrder } = this.props || {};
    const { orgList, orgMapByMailData, orderNumData, dimensionList1, dimensionList2, dimensionTreeList }
      = this.props.qualityAppealHome || {};
    if(!params || !params.attachedPersonList || params.attachedPersonList.length<2){
      params.attachedPersonList = [{},{}];
    }
    const allParams = { ...params, ...this.state };

    return (
      <BaseForm formType={formType}
                upLoadType={upLoadType}
                orgList={orgList}
                orderNumData={orderNumData}
                dimensionList1={dimensionList1}
                dimensionList2={dimensionList2}
                dimensionTreeList={dimensionTreeList}
                orgMapByMailData={orgMapByMailData}
                loadingMail={loadingMail}
                loadingOrder={loadingOrder}
                params={allParams}
                getOrgMapByMail={this.getOrgMapByMail}
                getSubOrderDetail={this.getSubOrderDetail}
                getDimensionTreeList={this.getDimensionTreeList}
                changeDimensionTree={this.changeDimensionTree}
                onSubmit={this.onSubmit}/>
    );
  }
}

export default FormIndex;
