import React from 'react';
import Form from './form';
import { FormParams } from './utils/utils';


class CommonForm extends React.Component {
    constructor(props) {
        super(props)
        this.formInstance = new FormParams();
        this.state = {
            params: this.formInstance.initParams,
        }
    }
    handleSubmitParams = (params = {}) => {
        const returnParams = {};
        Object.keys(params).forEach(key => {
            const obj = params[key];
            returnParams[key] = this.checkoutParams(key, obj)
        })
        return returnParams;
    }
    onSaveParams = (ops) => {
        const { params } = this.state;
        const newParams = { ...params, ...ops };
        this.setState({ params: newParams });
    }
    onChangeParams = (obj) => {
        this.onSaveParams({ ...obj })
    }
    onSubmit = (params) => {
        this.onSaveParams(params);
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