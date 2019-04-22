import React from 'react';
import Form from './form';
import { FormParams } from './utils/utils';

const dateFormat = 'YYYY.MM.DD';


class CommonForm extends React.Component {
    constructor(props) {
        super(props)
        this.formInstance = new FormParams();
        this.state = {
            params: this.formInstance.initParams,
        }
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
                returnItem = (Array.isArray(item) && item.length > 0) ? item.map(ls => ls && ls.format(dateFormat)) : undefined
                break;
            case 'choiceLessonStatus':
                returnItem = item ? item.value : undefined
                break;
            case 'publicLesson':
                returnItem = item ? item.value : undefined
                break;
            case 'publicChoiceLessonTime':
                returnItem = (Array.isArray(item) && item.length > 0) ? item.map(ls => ls && ls.format(dateFormat)) : undefined
                break;
            case 'certificateChoiceLesson':
                returnItem = item ? item.value : undefined
                break;
            case 'certificateChoiceLessonTime':
                returnItem = (Array.isArray(item) && item.length > 0) ? item.map(ls => ls && ls.format(dateFormat)) : undefined
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
                returnItem = item ? item : undefined;
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
            this.props.onSubmit(hasHandleParams);
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