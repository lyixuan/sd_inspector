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
            qualityValue: null,          // 扣除学分/绩效
            userId: null,                 // 根据邮箱查出用户id
            id: null,                     // 质检单id 
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
        const { collegeId, familyId, groupId, userType, id, name } = obj;

        const organize = [collegeId, familyId, groupId].filter(item => item);
        return {
            organize, role: userType, userId: id, name,
        }
    }
    transOriginParams = (params = {}) => {
        const newParams = {};
        Object.keys(this.initModel).forEach(item => {
            newParams[item] = params[item];
        })
        const { primaryAssortmentId, secondAssortmentId, thirdAssortmentId, collegeId,            // 学院ID
            familyId,
            groupId, violationDate, reduceScoreDate, ...others } = newParams || {};
        const organize = [collegeId, familyId, groupId].filter(item => item);
        const dimension = [primaryAssortmentId, secondAssortmentId, thirdAssortmentId].filter(item => item);
        const dateTimeObj = {
            violationDate: this.transMoment(violationDate),
            reduceScoreDate: this.transMoment(reduceScoreDate),
        }
        return { ...others, ...dateTimeObj, organize, dimension };

    }
    transMoment = (date) => {
        return date ? moment(date) : null;
    }
    transDateTime = (date) => {
        if (!date) return;
        return date.format(format);
    }
}