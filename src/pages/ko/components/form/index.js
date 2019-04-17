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
    render() {
        const { params } = this.state
        return (
            <>
                <Form params={params} />
            </>
        )
    }
}
export default CommonForm 