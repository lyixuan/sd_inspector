import React from 'react';
import { connect } from 'dva';
import { redirectUrlParams } from '../../utils/routeUtils';

class Login extends React.Component {
    UNSAFE_componentWillMount() {
        window.location.href = redirectUrlParams();
        // const { match, location } = this.props;
        // const { params } = match;
        // const { query: { pathname } } = location
        // this.props.dispatch({
        //     type: 'login/loginin',
        //     payload: {
        //         userInfo: params.id || '',
        //         pathname,
        //     }
        // });
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
