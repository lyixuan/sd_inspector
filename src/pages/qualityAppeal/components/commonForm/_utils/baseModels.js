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
            qualityNum: null                 // 质检单号

        };
        this.modelData = this.handleInitData(qualityDetail);
    }
    static checkoutQualityScore = (params = {}) => {
        const { qualityType, role } = params;
        const isShowCreate = qualityType === 2 && role !== 'class' && role !== 'group' && role !== 'family';
        return isShowCreate;
    }
    static checkoutQualityPerfor = (params) => {
        const { qualityType, role } = params;
        const isShowPerformance = qualityType === 1 && role !== 'csleader' && role !== 'csofficer';
        return isShowPerformance;
    }
    static checkoutQualityMaster = (params = {}, violationLevelObj = {}) => {
        const { qualityType, role } = params;
        const isShowMasterPerformance = (role === 'csleader' || role === 'csofficer') && qualityType === 1 && (violationLevelObj.violationLevelName === '一级违规' || violationLevelObj.violationLevelName === '特级违规');
        return isShowMasterPerformance;
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
    HandleOrgMapByMail(obj, orgList) {
        if (!obj || typeof obj !== 'object') return;
        const { userType, id, name } = obj;
        const orgObj = this.findOrganizeName(orgList, obj);
        const { collegeId, familyId, groupId, collegeName, familyName, groupName } = orgObj;
        const organize = [collegeId, familyId, groupId].filter(item => item);
        const organizeName = [collegeName, familyName, groupName].filter(item => item).join('|');
        return {
            collegeId, familyId, groupId, collegeName, familyName, groupName, role: userType, userId: id, name, organizeName, organize
        }
    }
    findOrganizeName(organize = [], orgObj) {
        const { collegeId, familyId, groupId } = orgObj || {};
        let { returnObj = {}, familyObj = {}, groupObj = {} } = {};
        for (let i = 0, len = organize.length; i < len; i += 1) {
            const obj = organize[i];
            if (collegeId === obj.id) {
                if (obj.nodeList) {
                    familyObj = obj.nodeList.find(item => item.id === familyId) || {};
                    if (familyObj.nodeList) {
                        groupObj = familyObj.nodeList.find(item => item.id === groupId) || {};
                    }
                }
                returnObj = {
                    collegeId: obj.id,
                    collegeName: obj.name,
                    familyId: familyObj.id,
                    familyName: familyObj.name,
                    groupId: groupObj.id,
                    groupName: groupObj.name,
                }
                break;
            }
        }
        return returnObj


    }
    getQualityValueFamter = (params) => {
        const { qualityValue } = params;
        const isPerformance = BaseModels.checkoutQualityPerfor(params);
        console.log('isPerformance',isPerformance)
        return isPerformance && qualityValue && qualityValue > 0 ? (Number(qualityValue) * 100).toFixed(2) : qualityValue;
    }
    getMasterQualityValueFamter = (params) => {
        const { masterQualityValue } = params;
        // 暂不对其做处理
        // const isMasterPerformance = BaseModels.checkoutQualityMaster(params);
        return masterQualityValue && masterQualityValue > 0 ? (Number(masterQualityValue) * 100).toFixed(2) : masterQualityValue;
    }
    setQualityValueFamter = (params) => {
        const { qualityValue } = params;
        const isPerformance = BaseModels.checkoutQualityPerfor(params);
        console.log(1,isPerformance)
        return isPerformance && qualityValue && qualityValue > 0 ? Number(qualityValue || 0) * 100 / 10000 : qualityValue;
    }
    setMasterQualityValueFamter = (params, violationLevelObj) => {
        const { masterQualityValue } = params;
        // const isMasterPerformance = BaseModels.checkoutQualityMaster(params);
        return masterQualityValue && masterQualityValue > 0 ? Number(masterQualityValue || 0) * 100 / 10000 : masterQualityValue;
    }
    transOriginParams = (params = {}) => {
        const newParams = {};
        for (let key in this.initModel) {
            newParams[key] = params[key];
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
        const handleQualityObj = {
            qualityValue: this.getQualityValueFamter(params),
            masterQualityValue: this.getMasterQualityValueFamter(params)
        }
        return { ...others, ...dateTimeObj, ...groupObj, ...handleQualityObj, dimension, organizeName, organize };
    }
    transMoment = (date) => {
        return date ? moment(date) : null;
    }
    transDateTime = (date) => {
        if (!date) return;
        return date.format(format);
    }
}
