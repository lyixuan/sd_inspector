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
        const { collegeId, familyId, groupId, userType, ...others } = obj;
        const organize = [collegeId, familyId, groupId].filter(item => item);

        return {
            ...others, organize, role: userType,
        }
    }
    transOriginParams = (params) => {
        const { primaryAssortmentId, secondAssortmentId, thirdAssortmentId, collegeId,            // 学院ID
            familyId,
            groupId, ...others } = params || {};
        const organize = [collegeId, familyId, groupId].filter(item => item);
        const dimension = [primaryAssortmentId, secondAssortmentId, thirdAssortmentId].filter(item => item);
        return { ...others, organize, dimension };

    }
}