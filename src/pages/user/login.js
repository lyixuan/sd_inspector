import React from 'react';
import { connect } from 'dva';

class Login extends React.Component {
    UNSAFE_componentWillMount() {
        const { match, location } = this.props;
        const { params } = match;
        console.log(location)
        this.props.dispatch({
            type: 'login/loginin',
            payload: params
        });
    }
    render() {
        return (
            <div>denglu</div>
        )
    }
}
export default connect(({ login }) => ({
    login
}))(Login)