import React from 'react';
import Form from './form';
import { FormParams } from './utils/utils';

const commitDateFormat = 'YYYY-MM-DD HH:mm:ss';


class CommonForm extends React.Component {
    constructor(props) {
        super(props)
        this.formInstance = new FormParams();
        const { originParams } = this.props;
        this.state = {
            params: { ...this.formInstance.initParams, ...originParams },
        }
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.originParams) !== JSON.stringify(this.props.originParams)) {
            this.setState({
                params: { ...this.formInstance.initParams, ...nextProps.originParams },
            })
        }
    }
    handleDateParams = (item) => {
        const [startTime, endTime] = item;
        return [startTime, endTime].map((ls, index) => {
            return index === 0 ? ls.format(commitDateFormat) : ls.format('YYYY-MM-DD 23:59:59');
        });
    }
    handleKoOrderGap = (item) => {
        const { type } = item;
        switch (type) {
            case 'yy':

                break;
            default:
                break;

        }
        console.log(item)
        return item
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
                returnItem = (Array.isArray(item) && item.length > 0) ? this.handleDateParams(item) : undefined
                break;
            case 'choiceLessonStatus':
                returnItem = item ? item.value : undefined
                break;
            case 'publicLesson':
                returnItem = item ? item.value : undefined
                break;
            case 'publicChoiceLessonTime':
                returnItem = (Array.isArray(item) && item.length > 0) ? this.handleDateParams(item) : undefined
                break;
            case 'certificateChoiceLesson':
                returnItem = item ? item.value : undefined
                break;
            case 'certificateChoiceLessonTime':
                returnItem = (Array.isArray(item) && item.length > 0) ? this.handleDateParams(item) : undefined
                break;
            case 'attendanceStatus':
                returnItem = item ? item.value : undefined
                break;
            case 'attendanceNum':
                returnItem = item ? item.value : undefined
                break;
            case 'listenLessonTime':
                returnItem = item ? item : undefined;
                break;
            case 'payOrder':
                returnItem = item ? item.value : undefined
                break;
            case 'orderMoney':
                returnItem = item ? item : undefined;
                break;
            case 'koOrderGap':
                // 时间间隔,处理到秒
                returnItem = item ? this.handleKoOrderGap(item) : undefined;
                break;
            case 'frontBelong':
                returnItem = item ? item : undefined;
                break;
            case 'backBelong':
                returnItem = item ? item : undefined;
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
        const hasHandleParams = this.handleSubmitParams(newParams);
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