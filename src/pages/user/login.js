import React from 'react';
import { connect } from 'dva';
import { Base64 } from 'js-base64';
import storage from '@/utils/storage';


class Login extends React.Component {
    UNSAFE_componentWillMount() {
        this.getAuthToken();
    }
    getAuthToken = () => {
        const { location: { query = {} } } = this.props;
        const paramsId = query.paramsId || '';
        let paramsObj = {}

        if (paramsId) {
            try {
                paramsObj = paramsId ? JSON.parse(Base64.decode(paramsId)) : {};
                storage.setUserInfo(paramsObj);
                this.props.dispatch({
                    type: 'login/loginin',
                    payload: paramsObj,
                })
            } catch (e) {
                console.log(e);
            }
        }
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
