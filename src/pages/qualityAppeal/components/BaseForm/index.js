import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import BaseForm from '@/pages/qualityAppeal/components/BaseForm/form';

@connect(({ loading, qualityAppealHome }) => ({
  loading,
  qualityAppealHome,
  loadingMail: loading.effects['qualityAppealHome/getOrgMapByMail'],
  loadingOrder: loading.effects['qualityAppealHome/getOrderNum'],
}))

class FormIndex extends React.Component {

  // 根据邮箱获取基本信息
  getOrgMapByMail = (mail, form) => {
    this.props.dispatch({
      type: 'qualityAppealHome/getOrgMapByMail',
      payload: { mail },
    }).then((res) => {
      let obj = { role: undefined, name: undefined, organize: undefined };
      if (res) {
        obj = { role: res.userType, name: res.name, organize: [res.collegeId, res.familyId, res.groupId] };
      }
      form.setFieldsValue({ ...form.getFieldsValue(), ...obj });
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
    const { qualityType, role, violationLevel, form } = object || {};
    let obj = { violationLevel };
    form.setFieldsValue({ ...form.getFieldsValue(), ...obj });
    if (!role) {
      message.warn('您没有选择归属人角色，无法自动计算处罚');
      return;
    }
    this.getPunishInfo(violationLevel, role, qualityType, form);
  };

  changeViolationLevel = (violationLevel, form) => {
    const { qualityType, role } = form.getFieldsValue() || {};
    if (!role) {
      message.warn('您没有选择归属人角色，无法自动计算处罚');
      return;
    }
    if (!qualityType) {
      message.warn('您没有选择质检类型，无法自动计算处罚');
      return;
    }
    this.getPunishInfo(violationLevel, role, qualityType, form);
  };

  getPunishInfo(violationLevel, role, qualityType, form) {
    const params = {
      violationLevel: violationLevel,
      userType: role,
      qualityType: qualityType,
    };
    this.props.dispatch({
      type: 'qualityAppealHome/getPunishInfoList',
      payload: { params },
    }).then(res => {
      console.log(1, { ...form.getFieldsValue(), ...res });
      // 需要对分裂的字段分别初始化，使更新能全部覆盖
      let obj = {
        'roleName-0': undefined, 'roleName-1': undefined, 'roleName-2': undefined, 'roleName-3': undefined,
        'userName-0': undefined, 'userName-1': undefined, 'userName-2': undefined, 'userName-3': undefined,
        'punishType-0': undefined, 'punishType-1': undefined, 'punishType-2': undefined, 'punishType-3': undefined,
        'qualityValue-0': undefined, 'qualityValue-1': undefined, 'qualityValue-2': undefined,
        'qualityValue-3': undefined,
        'punishTypeUnit-0': '--', 'punishTypeUnit-1': '--', 'punishTypeUnit-2': '--', 'punishTypeUnit-3': '--',
      };
      if (res && res.attachedPersonList) {
        res.attachedPersonList.forEach((v, i) => {
          obj[`roleName-${i}`] = v.roleName;
          obj[`userName-${i}`] = v.userName;
          obj[`punishType-${i}`] = v.punishType;
          obj[`qualityValue-${i}`] = v.qualityValue;
          obj[`'punishTypeUnit'-${i}`] = v.punishType ? v.punishType === 2 ? '分' : '元' : '--';
        });
      }
      form.setFieldsValue({ ...form.getFieldsValue(), ...res, ...obj });
    });
  }

  onSubmit = (params) => {
    this.props.onSubmit(params);
  };

  render() {
    const { formType, upLoadType, params, loadingMail, loadingOrder } = this.props || {};
    const { orgList, orgMapByMailData, orderNumData, dimensionList1, dimensionList2, dimensionTreeList }
      = this.props.qualityAppealHome || {};

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
                params={params}
                getOrgMapByMail={this.getOrgMapByMail}
                getSubOrderDetail={this.getSubOrderDetail}
                getDimensionTreeList={this.getDimensionTreeList}
                changeDimensionTree={this.changeDimensionTree}
                changeViolationLevel={this.changeViolationLevel}
                onSubmit={this.onSubmit}/>
    );
  }
}

export default FormIndex;
