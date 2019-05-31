import React from 'react';
import Form from './form';
import { FormParams } from './utils/utils';
import { handleDateParams } from '../../utils/utils';

class CommonForm extends React.Component {
    constructor(props) {
        super(props)
        this.formInstance = new FormParams();
        const { originParams } = this.props;
        this.state = {
            params: { ...this.formInstance.initParams, ...originParams, orderMoney: undefined,
              userGroup: undefined, },
        }
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.originParams) !== JSON.stringify(this.props.originParams)) {
            this.setState({
                params: { ...this.formInstance.initParams, ...nextProps.originParams },
            })
        }
    }
    handleCustomValue = (obj) => (formula = 1) => {
        const { value, minValue, maxValue } = obj;
        const returnObj = { value, minValue, maxValue };;
        Object.keys(returnObj).forEach(item => {
            const ls = returnObj[item];
            returnObj[item] = !ls ? ls : Number(ls) * formula;
        })
        return { ...obj, ...returnObj };
    }
    handleCustomParams = (item) => {
        const { unit } = item;
        let returnObj = { ...item };
        switch (unit) {
            case 'yy':
                returnObj = this.handleCustomValue(item)(365 * 24 * 3600);
                break;
            case 'mm':
                returnObj = this.handleCustomValue(item)(30 * 24 * 3600);
                break;
            case 'dd':
                returnObj = this.handleCustomValue(item)(24 * 3600);
                break;
            case 'hh':
                returnObj = this.handleCustomValue(item)(3600);
                break;
            case 'min':
                returnObj = this.handleCustomValue(item)(60);
                break;
            default:
                break;

        }
        return returnObj
    }
    handleOrgParams = (data = []) => (orgArr) => {
        const returnObj = {};
        orgArr.forEach((item, index) => {
            returnObj[item] = data[index] ? data[index].value : null;
        });
        return returnObj;
    }

    checkoutParamsType = (key, item) => {
        let returnItem = undefined;
        switch (key) {
            case 'fromDevice':
                returnItem = (Array.isArray(item) && item.length > 0) ? item.map(ls => ls.value) : undefined
                break;
            case 'fromApp':
                returnItem = (Array.isArray(item) && item.length > 0) ? item.map(ls => ls.value) : undefined
                break;
            case 'registerTime':
                returnItem = (Array.isArray(item) && item.length > 0) ? handleDateParams(item) : undefined
                break;
            case 'choiceLessonStatus':
                returnItem = item ? item.value : undefined
                break;
            case 'publicLesson':
                returnItem = item ? item.value : undefined
                break;
            case 'publicChoiceLessonTime':
                returnItem = (Array.isArray(item) && item.length > 0) ? handleDateParams(item) : undefined
                break;
            case 'certificateChoiceLesson':
                returnItem = item ? item.value : undefined
                break;
            case 'certificateChoiceLessonTime':
                returnItem = (Array.isArray(item) && item.length > 0) ? handleDateParams(item) : undefined
                break;
            case 'attendanceStatus':
                returnItem = item ? item.value : undefined
                break;
            case 'attendanceNum':
                returnItem = item ? item : undefined
                break;
            case 'listenLessonTime':
                returnItem = item ? this.handleCustomParams(item) : undefined;
                break;
            case 'payOrder':
                returnItem = item ? item.value : undefined
                break;
            case 'orderMoney':
                returnItem = item ? item : undefined;
                break;
            case 'userGroup':
                returnItem = item ? item.value : undefined;
                break;
            case 'orderStatus':
                returnItem = item ? item.value : undefined;
                break;
            case 'koOrderGap':
                // 时间间隔,处理到秒
                returnItem = item ? this.handleCustomParams(item) : undefined;
                break;
            case 'frontBelong':
                returnItem = item ? this.handleOrgParams(item)(['businessId', 'legionId']) : undefined;
                break;
            case 'backBelong':
                returnItem = item ? this.handleOrgParams(item)(['collegeId', 'familyId', 'groupId']) : undefined;
                break;
            default:
                returnItem = null;
                break
        }
        return returnItem;

    }
    handleSubmitParams = (params = {}) => {
        const returnParams = {};
        Object.keys(params).forEach(key => {
            const obj = params[key];
            returnParams[key] = this.checkoutParamsType(key, obj)
        })
        return returnParams;
    }
    onSaveParams = (params) => {
        this.setState({ params });
    }
    onChangeParams = (obj) => {
        const { params } = this.state;
        const newParams = { ...params, ...obj };
        this.onSaveParams({ ...newParams })
    }
    onSubmit = (params) => {
        const newParams = { ...this.state.params, ...params };
        console.log(140, newParams);

        const hasHandleParams = this.handleSubmitParams(newParams);
        console.log(144,hasHandleParams);
        
        this.onSaveParams(newParams);
        if (this.props.onSubmit) {
            this.props.onSubmit(hasHandleParams, newParams);
        }
    }
    render() {
        const { params } = this.state
        return (
            <>
                <Form {...this.props} params={params} onSubmit={this.onSubmit} onChange={this.onChangeParams} />
            </>
        )
    }
}
export default CommonForm
