import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import BaseForm from '@/pages/qualityAppeal/components/BaseForm/form';
import BIModal from '@/ant_components/BIModal';
import moment from 'moment/moment';

const confirm = BIModal.confirm;

@connect(({ loading, qualityAppealHome }) => ({
  loading,
  qualityAppealHome,
  loadingMail: loading.effects['qualityAppealHome/getOrgMapByMail'],
  loadingOrder: loading.effects['qualityAppealHome/getOrderNum'],
}))

class FormIndex extends React.Component {

  componentDidMount() {
    this.getDimensionTreeList(this.props.params.dimensionId, this.props.params.qualityType);
    this.getSubOrderDetail(this.props.params.orderNum);
  }

  UNSAFE_componentWillReceiveProps(next) {
    const newDimensionId = next.params.dimensionId;
    const oldDimensionId = this.props.params.dimensionId;
    if (newDimensionId !== oldDimensionId) {
      this.getDimensionTreeList(newDimensionId, next.params.qualityType);
    }
  }

  // 根据邮箱获取基本信息
  getOrgMapByMail = (mail, form) => {
    this.props.dispatch({
      type: 'qualityAppealHome/getOrgMapByMail',
      payload: { mail },
    }).then((res) => {
      let obj = { role: undefined, name: undefined, organize: undefined, userId: undefined };
      if (res) {
        obj = {
          role: res.userType,
          name: res.name,
          organize: [res.collegeId, res.familyId, res.groupId],
        };

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
      // 对分裂的字段分别初始化
      let obj = {};
      for (let i = 0;i < 4; i++) {
        obj[`roleName-${i}`] = undefined;
        obj[`userName-${i}`] = undefined;
        obj[`punishType-${i}`] = undefined;
        obj[`qualityValue-${i}`] = undefined;
        obj[`punishTypeUnit-${i}`] = '--';
      }

      // 赋值
      if (res && res.attachedPersonList) {
        res.attachedPersonList.forEach((v, i) => {
          obj[`roleName-${i}`] = v.roleName;
          obj[`userName-${i}`] = v.userName;
          obj[`punishType-${i}`] = v.punishType;
          obj[`qualityValue-${i}`] = v.qualityValue;
          obj[`punishTypeUnit-${i}`] = v.punishType ? v.punishType === 2 ? '分' : '元' : '--';
        });
      }
      if (res && !res.punishType) res.punishType = undefined;
      form.setFieldsValue({ ...form.getFieldsValue(), ...res, ...obj });
    });
  }

  onSubmit = (paramsBf) => {
    const that = this;
    const params = this.processData(paramsBf);
    this.props.dispatch({
      type: 'qualityAppealHome/checkRepeatQualityInspection',
      payload: { params },
    }).then((res) => {
      if (res) {
        const { code, msg } = res || {};
        let msgDetail = '是否确认提交?';
        let buttonText = '确认';
        if (code !== 20000) {
          msgDetail = msg;
          buttonText = '继续提交';
        }
        confirm({
          className: 'BIConfirm',
          title: msgDetail,
          cancelText: '取消',
          okText: buttonText,
          onOk() {
            that.props.onSubmit(params);
          },
          onCancel() {
          },
        });
      }
    });
  };

  onCancel = ()=>{
    this.props.onCancel();
  };

  processData = (srcData) => {
    const arr = [];
    const orgList = this.props.qualityAppealHome.orgList || [];
    for (let i = 0; i < 4; i++) {
      arr.push({
        roleName: srcData[`roleName-${i}`] || null,
        userName: srcData[`userName-${i}`] || null,
        punishType: srcData[`punishType-${i}`] || null,
        qualityValue: (Number(srcData[`qualityValue-${i}`]) || Number(srcData[`qualityValue-${i}`]) === 0) ? Number(srcData[`qualityValue-${i}`]): null,
      });
    }

    const params = {
      mail: srcData.mail,                   // 邮箱
      role: srcData.role,                   // 归属人角色
      name: srcData.name,                   // 归属人
      collegeId: srcData.organize[0],            // 学院ID
      familyId: srcData.organize[1],             // 家族ID
      groupId: srcData.organize[2],              // 小组ID
      collegeName: null,                          // 学院名
      familyName: null,                           // 家族名
      groupName: null,                            // 小组名
      familyType: srcData.familyType,             // 学院类型
      orderNum: srcData.orderNum,                 // 子订单编号
      violationDate: moment(srcData.violationDate).format('YYYY-MM-DD'),          // 质检违规日期
      reduceScoreDate: moment(srcData.reduceScoreDate).format('YYYY-MM-DD'),        // 质检扣分日期
      qualityType: srcData.qualityType,             // 质检类型
      dimensionId: srcData.dimensionId,             // 分维ID
      primaryAssortmentId: srcData.dimension[0],    // 一级违规分类
      secondAssortmentId: srcData.dimension[1],     // 二级违规分类
      thirdAssortmentId: srcData.dimension[2],      // 三级违规分类
      attUrl: srcData.attUrl,                       // 附件地址
      desc: srcData.desc,                           // 违规详情
      punishType: srcData.punishType,                // 处罚方式
      qualityValue: srcData.ownQualityValue,          // 责任人处罚力度
      attachedPersonList: arr,
      id: srcData.id,                                 // 质检单id
      violationLevel: srcData.violationLevel,
    };
    orgList.forEach((v) => {
      if (v.id === params.collegeId) {
        params.collegeName = v.name;
        v['nodeList'].forEach((v2) => {
          if (v2.id === params.familyId) {
            params.familyName = v2.name;
            v2['nodeList'].forEach((v3) => {
              if (v3.id === params.groupId) {
                params.groupName = v3.name;
              }
            });
          }
        });
      }
    });
    return params;
  };

  render() {
    const { params, backType, loadingMail, loadingOrder } = this.props || {};
    const { orgList, orgMapByMailData, orderNumData, dimensionList1, dimensionList2, dimensionTreeList }
      = this.props.qualityAppealHome || {};
    params.organize = (params.collegeId || params.familyId || params.groupId) ? [params.collegeId, params.familyId, params.groupId]:[];
    params.dimension = (params.primaryAssortmentId || params.secondAssortmentId || params.thirdAssortmentId) ? [params.primaryAssortmentId, params.secondAssortmentId, params.thirdAssortmentId]:[];
    params.violationDate = moment(params.violationDate);
    params.reduceScoreDate = moment(params.reduceScoreDate);

    return (
      <BaseForm backType={backType}
                orgList={orgList}
                orderNumData={ orderNumData }
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
                onCancel={this.onCancel}
                onSubmit={this.onSubmit}/>
    );
  }
}

export default FormIndex;
