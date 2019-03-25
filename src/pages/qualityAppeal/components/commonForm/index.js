import React from 'react';
import { connect } from 'dva';

import FormComponent from './form';
import { FormModels } from './_utils/formModel';

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
            formParams: this.formModels.initModel,
        };
    }
    componentDidMount() {
        // 初始化更新form的value
        this.handleOrgMapByMailParams();
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
    handleOriginDataSource = (params) => {
        const { dataSource } = this.props;
        const newParams = this.formModels.transOriginParams(params || dataSource);
        this.upDateFormParams(newParams);
    }
    handleOrgMapByMailParams = (params) => {
        const { orgMapByMailData } = this.props;
        const newParams = this.formModels.HandleOrgMapByMail(params || orgMapByMailData);
        this.upDateFormParams(newParams);
    }
    getOrgMapByMail = (mail, values) => {
        if (!mail) return;
        this.props.dispatch({
            type: 'qualityAppealHome/getOrgMapByMail',
            payload: { mail },
        });
        this.saveParams(values);
    }
    getOrderNum = (orderNum, values) => {
        if (!orderNum) return;
        this.props.dispatch({
            type: 'qualityAppealHome/getOrderNum',
            payload: { orderNum },
        });
        this.saveParams(values);
    }
    changeDimension = (params = {}, values) => {
        this.props.dispatch({
            type: 'qualityNewSheet/queryDimensionTreeList',
            payload: { ...params },
        });
        this.saveParams(values);

    }
    upDateFormParams = (newParams = {}) => {
        this.saveParams(newParams);
    }
    setAttUrl = (attUrl, newParams) => {
        this.saveParams({ ...newParams, attUrl });
    }
    saveParams = (nextParams = {}) => {
        const { params } = this.state;
        const newParams = { ...params };
        for (let item in nextParams) {
            newParams[item] = nextParams[item];
        }
        this.setState({ formParams: newParams });
    }
    onSubmit = (params) => {
        const newParams = this.formModels.transFormParams(params);
        if (this.props.onSubmit) {
            this.props.onSubmit(newParams)
        }
        console.log(newParams, this.state.formParams)
    }
    onCancel = () => {
        this.props.history.goBack();
    }
    render() {
        const { formParams } = this.state;
        const { orgList } = this.props;
        return (<div>
            {/* form区域 */}
            <FormComponent
                {...this.props}
                params={formParams}
                orgList={orgList}
                getOrgMapByMail={this.getOrgMapByMail}
                getOrderNum={this.getOrderNum}
                changeDimension={this.changeDimension}
                setAttUrl={this.setAttUrl}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}
            />
        </div>)
    }
}
export default CreateQualityNewSheet;
