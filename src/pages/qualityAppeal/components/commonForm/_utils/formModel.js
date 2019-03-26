import { BaseModels } from './baseModels';
export class FormModels extends BaseModels {
    constructor(props) {
        super(props)
        this.initModel = {
            qualityType: null,         // @params(Number)质检类型
            mail: '',                  // @params(String)邮箱
            role: '',                  // @params(String)归属人角色
            name: '',                  // @params(String)归属人
            organize: [],              // @params(Array) 归属人组织
            orderNum: '',              // @params(String)子订单编号
            violationDate: null,       // @params(Moment)质检违规日期
            reduceScoreDate: null,     // @params(Moment)质检扣分日期
            dimensionId: null,         // @params(Number)分维ID
            dimension: [],             // @params(Array)违规分类
            customerMail: '',          // @params(String)客诉主管邮箱
            qualityValue: null,        // @params(Number)扣除学分/绩效
            attUrl: '',                // @params(String)附件地址	
            desc: '',                  // @params(String)违规详情
            familyType: null,          // @params(Number)自考壁垒
            userId: null,              // @params(number) 用户id
            id: null,                   // @params(number) 质检单id
        };
    }
    handleInitData = () => {
        const initModel = JSON.parse(JSON.stringify(this.initModel));
        return {
            ...initModel,
        }
    }
    transFormParams = (params) => {
        const { organize = [], dimension = [], violationDate, reduceScoreDate, ...others } = params || {};
        const [collegeId, familyId, groupId] = organize;
        const [primaryAssortmentId, secondAssortmentId, thirdAssortmentId] = dimension;
        const dateTimeObj = {
            violationDate: this.transDateTime(violationDate),
            reduceScoreDate: this.transDateTime(reduceScoreDate),
        }
        const newParams = { ...others, ...dateTimeObj, primaryAssortmentId, secondAssortmentId, thirdAssortmentId, collegeId, familyId, groupId };
        return newParams;
    }
}