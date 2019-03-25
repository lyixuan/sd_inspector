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
    handleOriginDataSource = (params) => {
        const { dataSource } = this.props;
        const newParams = this.formModels.transOriginParams(params || dataSource);
        this.upDateFormParams(newParams);
    }
    handleOrgMapByMailParams = (params) => {
        const { orgMapByMailData } = this.props;
        const newParams = this.formModels.HandleOrgMapByMail(params || orgMapByMailData);
        console.log(newParams)
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
    upDateFormParams = (newParams = {}) => {
        this.saveParams(newParams);
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
    onSubmit = (params) => {
        const { formParams } = this.state;
        const assginObject = Object.assign({}, formParams, params)
        const newParams = this.formModels.transFormParams(assginObject);

        if (this.props.onSubmit) {
            this.props.onSubmit(newParams)
        }
        this.saveParams(params);
    }
    onCancel = () => {
        this.props.history.goBack();
    }
    render() {
        const { formParams } = this.state;
        const { orgList, children } = this.props;
        console.log(formParams)
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
                otherNode={children || null}
            />
        </div>)
    }
}
export default CreateQualityNewSheet;
