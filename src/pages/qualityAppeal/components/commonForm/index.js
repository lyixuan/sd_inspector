import React from 'react';
import { connect } from 'dva';
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
}))
class CreateQualityNewSheet extends React.Component {
    constructor(props) {
        super(props);
        this.formModels = new FormModels();
        this.state = {
            formParams: this.formModels.initFormModel,
            violationLevelObj: {},  // 用于储存违规等级,
            isShowConfirmModel: false,
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
        const { orgMapByMailData } = this.props;
        const newParams = this.formModels.HandleOrgMapByMail(params || orgMapByMailData);
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
            type: 'qualityNewSheet/checkRepeatQualityInspection',
            payload,
        })
    }
    upDateFormParams = (newParams = {}) => {
        this.saveParams(newParams);
    }
    onChangeOrg = (orgObj) => {
        this.saveParams(orgObj);
    }
    onChangedimensionTree = (params) => {
        const violationLevelObj = {
            ...params,
            violationLevelName: params.violationLevelname
        }
        this.setState({ violationLevelObj })
    }
    setAttUrl = (attUrl, newParams) => {
        this.saveParams({ ...newParams, attUrl });
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
    changeConfirmModel = (bol) => {
        this.setState({ isShowConfirmModel: bol });
    }
    confirmModelSubmit = () => {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.tmpParams);
        }
    }
    onSubmit = (params) => {
        const { formParams } = this.state;
        const { formType } = this.props;
        const assginObject = Object.assign({}, formParams, params);
        const newParams = this.formModels.transFormParams(assginObject);
        const { orderNum } = newParams;
        this.tmpParams = newParams;
        // if (orderNum) {
        //     this.checkRepeatQualityInspection(newParams);
        //     return;
        // }
        if (this.props.onSubmit) {
            this.props.onSubmit(newParams)
        }
        this.saveParams(params);
    }
    onCancel = () => {
        this.props.history.goBack();
    }
    render() {
        const { formParams, isShowConfirmModel } = this.state;
        const { orgList, children } = this.props;
        return (<div>
            {/* form区域 */}
            <FormComponent
                {...this.props}
                params={formParams}
                orgList={orgList}
                getOrgMapByMail={this.getOrgMapByMail}
                getOrderNum={this.getOrderNum}
                changeDimension={this.changeDimension}
                onChangeOrg={this.onChangeOrg}
                setAttUrl={this.setAttUrl}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}
                otherNode={children || null}
                violationLevelObj={this.state.violationLevelObj}
                onChangedimensionTree={this.onChangedimensionTree}
            />
            {/* 模态框部分 */}
            {/* 对子订单提示模态框 */}
            <BIModal
                title="提交确认"
                visible={isShowConfirmModel}
                onCancel={this.changeConfirmModel.bind(null, false)}
                footer={[
                    <BIButton style={{ marginRight: 10 }} onClick={this.changeConfirmModel.bind(null, false)}>
                        取消
            </BIButton>,
                    <BIButton type="primary" onClick={this.confirmModelSubmit}>
                        确定
            </BIButton>,
                ]}
            >
                <div className={styles.modalWrap}>该条记录将被提交给质检主管进行审核，确定提交吗？</div>
            </BIModal>
            <BIModal
                title="提交审核"
                visible={isShowConfirmModel}
                onCancel={this.changeConfirmModel.bind(null, false)}
                footer={[
                    <BIButton style={{ marginRight: 10 }} onClick={this.changeConfirmModel.bind(null, false)}>
                        取消
            </BIButton>,
                    <BIButton type="primary" onClick={this.confirmModelSubmit}>
                        确定
            </BIButton>,
                ]}
            >
                <div className={styles.modalWrap}>该条记录将被提交给质检主管进行审核，确定提交吗？</div>
            </BIModal>
        </div>)
    }
}
export default CreateQualityNewSheet;
