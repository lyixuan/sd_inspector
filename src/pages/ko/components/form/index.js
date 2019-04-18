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
    componentDidMount() {

    }
    onSaveParams = (params) => {
        this.setState({ params });
    }
    onChangeParams = (obj) => {
        this.onSaveParams({ ...this.state.params, ...obj })

    }
    onSubmit = (params) => {
        console.log(params)
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