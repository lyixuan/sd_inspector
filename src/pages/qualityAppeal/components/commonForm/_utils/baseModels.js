import moment from 'moment';

const format = 'YYYY-MM-DD';

export class BaseModels {
    constructor(props) {
        const { qualityDetail = {} } = props || {};
        this.initModel = {
            mail: '',                   // 邮箱
            role: '',                   // 归属人角色
            name: '',                   // 归属人
            collegeId: null,            // 学院ID
            familyId: null,             // 家族ID
            groupId: null,              // 小组ID
            familyType: null,           // 学院类型
            orderNum: null,             // 子订单编号
            violationDate: '',          // 质检违规日期
            reduceScoreDate: '',        // 质检扣分日期
            qualityType: null,          // 质检类型
            dimensionId: null,          // 分维ID
            primaryAssortmentId: null,  // 一级违规分类
            secondAssortmentId: null,   // 二级违规分类
            thirdAssortmentId: null,    // 三级违规分类	
            attUrl: '',                 // 附件地址	
            desc: '',                   // 违规详情	
            masterMail: '',              // 客诉主管邮箱
            masterQualityValue: null,     // 客诉主管扣除绩效
            qualityValue: null,          // 扣除学分/绩效
            userId: null,                 // 根据邮箱查出用户id
            id: null,                     // 质检单id
            collegeName: null,             // 学院名
            familyName: null,              // 家族名
            groupName: null,                // 小组名

        };
        this.modelData = this.handleInitData(qualityDetail);
    }
    handleInitData = (propsData = {}) => {
        const initModel = JSON.parse(JSON.stringify(this.initModel));
        if (!propsData || typeof propsData !== 'object') {
            return
        }
        return {
            ...initModel,
            ...propsData,
        }
    }
    HandleOrgMapByMail(obj) {
        if (!obj || typeof obj !== 'object') return;
        const { collegeId, familyId, groupId, collegeName, familyName, groupName, userType, id, name } = obj;

        const organize = [collegeId, familyId, groupId].filter(item => item);
        const organizeName = [collegeName, familyName, groupName].filter(item => item).join('|');
        return {
            collegeId, familyId, groupId, collegeName, familyName, groupName, role: userType, userId: id, name, organizeName, organize
        }
    }
    transOriginParams = (params = {}) => {
        const newParams = {};
        for (let key in this.initModel) {
            newParams[key] = params[key] || newParams[key];
        }

        const { primaryAssortmentId, secondAssortmentId, thirdAssortmentId, collegeId,            // 学院ID
            familyId, collegeName, familyName, groupName,
            groupId, violationDate, reduceScoreDate, ...others } = newParams || {};
        const organizeName = [collegeName, familyName, groupName].filter(item => item).join('|');

        // 暂不做回显处理
        const organize = [collegeId, familyId, groupId].filter(item => item);
        const groupObj = { collegeId, familyId, groupId, collegeName, familyName, groupName };
        const dimension = [primaryAssortmentId, secondAssortmentId, thirdAssortmentId].filter(item => item);
        const dateTimeObj = {
            violationDate: this.transMoment(violationDate),
            reduceScoreDate: this.transMoment(reduceScoreDate),
        }
        return { ...others, ...dateTimeObj, ...groupObj, dimension, organizeName, organize };
    }
    transMoment = (date) => {
        return date ? moment(date) : null;
    }
    transDateTime = (date) => {
        if (!date) return;
        return date.format(format);
    }
}