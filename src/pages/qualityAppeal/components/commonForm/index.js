import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import BIModal from '@/ant_components/BIModal';
import BIButton from '@/ant_components/BIButton';
import FormComponent from './form';
import { FormModels } from './_utils/formModel';
import styles from './style.less';
/*
* submitLoading:@params(boole)提交状态
* formType:     @params(string)quality(质检),appeal(申述)
* actionType:   @params(string)create(创建),edit(编辑),appeal(审核)

*/

@connect(({ createQualityNewSheet1, qualityAppealHome, loading }) => ({
    createQualityNewSheet1,
    orgList: qualityAppealHome.orgList,
    orgMapByMailData: qualityAppealHome.orgMapByMailData,
    orderNumData: qualityAppealHome.orderNumData,
    dimensionTreeList: qualityAppealHome.dimensionTreeList,
    dimensionList1: qualityAppealHome.dimensionList1, // 客诉分维
    dimensionList2: qualityAppealHome.dimensionList2, // 班主任分维
    mailDataLoading: loading.effects['qualityAppealHome/getOrgMapByMail'],
    getOrderNumLoading: loading.effects['qualityAppealHome/getOrderNum'],
    checkRepeatQualityIng: loading.effects['qualityAppealHome/checkRepeatQualityInspection'],
}))
class CreateQualityNewSheet extends React.Component {
    constructor(props) {
        super(props);
        this.formModels = new FormModels();
        this.state = {
            formParams: this.formModels.initFormModel,
            violationLevelObj: {},  // 用于储存违规等级,
            isShowOrderNumConfirmModel: false,
            msgDetail: '',
            buttonText: '确定',
        };
        this.tmpParams = null;   //  用于临时储存参数;
    }
    componentDidMount() {
        // 初始化更新form的value
        this.handleOrgMapByMailParams();
        this.handleOriginDataSource();
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.orgMapByMailData) !== JSON.stringify(this.props.orgMapByMailData)) {
            // 使用邮箱获取组织机构信息
            this.handleOrgMapByMailParams(nextProps.orgMapByMailData);
        }
        if (JSON.stringify(nextProps.dataSource) !== JSON.stringify(this.props.dataSource)) {
            // 使用邮箱获取组织机构信息
            this.handleOriginDataSource(nextProps.dataSource);
        }
    }
    componentWillUnmount() {
        this.props.dispatch({
            type: 'qualityAppealHome/clearOrderNumData',
        })
    }
    handleOriginDataSource = (params) => {
        const { dataSource } = this.props;
        const newParams = this.formModels.transOriginParams(params || dataSource);
        const { qualityType, dimensionId } = newParams;
        if (dimensionId) {
            this.changeDimension({ qualityType, dimensionId }, newParams)
        }
        const violationLevelObj = this.formModels.violationLevel(params || dataSource);
        this.setState({ violationLevelObj });
        this.upDateFormParams(newParams);
    }
    handleOrgMapByMailParams = (params) => {
        const { orgMapByMailData, orgList } = this.props;
        const newParams = this.formModels.HandleOrgMapByMail(params || orgMapByMailData, orgList);
        this.upDateFormParams(newParams);
    }
    getOrgMapByMail = (mail, values) => {
        if (!mail) return;
        this.saveParams(values, () => {
            this.props.dispatch({
                type: 'qualityAppealHome/getOrgMapByMail',
                payload: { mail },
            });
        });
    }
    getOrderNum = (orderNum, values) => {
        if (!orderNum) return;

        this.saveParams(values, () => {
            this.props.dispatch({
                type: 'qualityAppealHome/getOrderNum',
                payload: { orderNum },
            });
        });
    }
    changeDimension = (params = {}, values) => {
        this.saveParams(values, () => {
            this.props.dispatch({
                type: 'qualityAppealHome/queryDimensionTreeList',
                payload: { ...params },
            });
        });

    }
    checkRepeatQualityInspection = (payload) => {
        this.props.dispatch({
            type: 'qualityAppealHome/checkRepeatQualityInspection',
            payload: { params: payload, callback: this.checkoutOrderNumCallBack },
        })
    }
    upDateFormParams = (newParams = {}) => {
        this.saveParams(newParams);
    }
    onChangeRole = (values) => {
        const { organize } = values;
        let newParams = {};
        if (organize.length === 0) {
            newParams = {
                collegeId: undefined, familyId: undefined, groupId: undefined, collegeName: undefined, familyName: undefined, groupName: undefined,
                organizeName: '',
            }
        }
        this.saveParams({ ...values, ...newParams, });
    }
    onChangeOrg = (orgObj) => {
        this.saveParams(orgObj);
    }
    onChangedimensionTree = (params) => {
        const { violationLevelObj, ...others } = params;
        const newviolationLevelObj = {
            ...violationLevelObj,
            violationLevelName: violationLevelObj.violationLevelname
        }
        this.setState({ violationLevelObj: newviolationLevelObj });
        this.saveParams({ ...others });
    }
    setAttUrl = (attUrl, newParams) => {
        this.saveParams({ ...newParams, attUrl });
    }
    formChange = (params) => {
        this.saveParams(params);
    }
    saveParams = (nextParams = {}, callback) => {
        const { formParams } = this.state;
        const newParams = { ...formParams };
        for (let item in nextParams) {
            newParams[item] = nextParams[item];
        }
        this.setState({ formParams: newParams }, () => {
            if (callback) callback();
        });
    }

    changeOrderNumConfirmModel = (bol) => {
        this.setState({ isShowOrderNumConfirmModel: bol });
    }
    checkoutOrderNumCallBack = (params) => {
        //审核状态下不弹框, roleId=49 主管 roleId=70专员 roleId=71 sop
        // checkResult 1 通过审核 0 不通过审核
        const { code, msg, roleId } = params || {};
        const { actionType, checkResult } = this.props;
        let msgDetail = '';
        let buttonText = '确定';
        if (code === 20000) {
            if (roleId === 49 && actionType === 'appeal') { // 只有主管才有审核权限
                msgDetail = checkResult === 1 ? '该条记录将提交到小德后台并修改归属人学分(绩效) , 确认提交吗?' : '确认驳回该条记录吗?';
            } else if (roleId === 70) {
                msgDetail = '该条记录将被提交给质检主管进行审核,确认提交吗?'
            }
            buttonText = '确定';
        } else {
            if (roleId === 49 && actionType === 'appeal') {
                msgDetail = checkResult === 1 ? '该条记录将提交到小德后台并修改归属人学分(绩效) , 确认提交吗?' : '确认驳回该条记录吗?';
                buttonText = '确定';
            } else {
                msgDetail = msg;
                buttonText = '继续提交';
            }

        }
        this.setState({ isShowOrderNumConfirmModel: true, msgDetail, buttonText });
    }
    noCheckoutAction = () => {
        // 审核不通过时,不需要调取检索参数接口
        this.setState({ isShowOrderNumConfirmModel: true, msgDetail: '确认驳回该条记录吗?', buttonText: '确定' });
    }
    confirmModelSubmit = () => {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.tmpParams);
        }
    }
    onSubmit = (params) => {
        // 单独处理qualityValue
        const { qualityValue = null, masterQualityValue = null } = params;
        const { formParams, violationLevelObj } = this.state;
        const { actionType, checkResult, appealEndDate, formType } = this.props;
        const assginObject = Object.assign({}, formParams, params, { qualityValue, masterQualityValue });
        const newParams = this.formModels.transFormParams(assginObject, violationLevelObj);
        this.tmpParams = newParams;
        this.saveParams(params);
        if (checkResult === undefined && actionType === 'appeal') {
            message.warn('请选择审核结果');
            return;
        }
        if (!appealEndDate && actionType === 'appeal' && formType === 'appeal' && checkResult === 0) {
            message.warn('请填写截止日期');
            return;
        }
        if (!appealEndDate && actionType === 'appeal' && formType === 'quality' && checkResult === 1) {
            message.warn('请填写截止日期');
            return;
        }
        if (checkResult === 0 && actionType === 'appeal') {
            this.noCheckoutAction();
            return;
        }
        this.checkRepeatQualityInspection(newParams);
    }
    onCancel = () => {
        this.props.history.goBack();
    }
    render() {
        const { formParams, isShowOrderNumConfirmModel, msgDetail, buttonText } = this.state;
        const { orgList, children, submitLoading } = this.props;
        return (<div>
            {/* form区域 */}
            <FormComponent
                {...this.props}
                params={formParams}
                orgList={orgList}
                getOrgMapByMail={this.getOrgMapByMail}
                getOrderNum={this.getOrderNum}
                changeDimension={this.changeDimension}
                onChangeRole={this.onChangeRole}
                onChangeOrg={this.onChangeOrg}
                setAttUrl={this.setAttUrl}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}
                otherNode={children || null}
                violationLevelObj={this.state.violationLevelObj}
                formChange={this.formChange}
                onChangedimensionTree={this.onChangedimensionTree}
            />
            {/* 模态框部分 */}
            {/* 对子订单提示模态框 */}
            <BIModal
                key="继续提交"
                title="提交确认"
                visible={isShowOrderNumConfirmModel}
                onCancel={this.changeOrderNumConfirmModel.bind(null, false)}
                footer={[
                    <BIButton key="1" style={{ marginRight: 10 }} onClick={this.changeOrderNumConfirmModel.bind(null, false)}>
                        取消
            </BIButton>,
                    <BIButton key="2" type="primary" onClick={this.confirmModelSubmit} loading={submitLoading}>
                        {buttonText}
                    </BIButton>
                ]}
            >
                <div className={styles.modalWrap}>{msgDetail}</div>
            </BIModal>
        </div>)
    }
}
export default CreateQualityNewSheet;
