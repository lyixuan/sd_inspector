import React, { PureComponent } from 'react';
import { Layout, Radio, Spin } from 'antd';
import { connect } from 'dva';
import GlobalHeader from '../components/GlobalHeader';
import Modal from '@/components/Modal/Modal';
import styles from './styles/header.less';
import storage from '../utils/storage';
import { GLOBAL_HEADER_SELECT } from '../utils/constants';
import { redirectOldSysHosts } from '../utils/routeUtils';

import c from '@/assets/workBench/c.png';
import b from '@/assets/workBench/b.png';
import a from '@/assets/workBench/a.png';
import s from '@/assets/workBench/s.png';
import cGray from '@/assets/workBench/c2.png';
import bGray from '@/assets/workBench/b2.png';
import aGray from '@/assets/workBench/a2.png';
import sGray from '@/assets/workBench/s2.png';

const { Header } = Layout;
const RadioGroup = Radio.Group;

const gradeImg = { // 等级
    C: c,
    B: b,
    A: a,
    S: s,
}
const gradeImgGray = { // 等级
    C: cGray,
    B: bGray,
    A: aGray,
    S: sGray,
}
@connect(({ login = {}, loading }) => ({
    login,
    loading,
    getRoleListLoading: loading.effects['login/CurrentUserListRole'],
    roleList: login.roleList || [],
}))

class SelfHeader extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            roleSelected: props.currentUser && props.currentUser.userId,
            certificationList: []
        };
    }
    componentDidMount() {
        this.getCertificationList();
    }
    getUserInfo = () => {
        return storage.getUserInfo() || {};
    }
    getRoleList = () => {
        this.props.dispatch({
            type: 'login/CurrentUserListRole',
            payload: { userId: this.getUserInfo().userId },
        });
    };
    getCertificationList = () => {
        this.props.dispatch({
            type: 'login/getCertificationList',
            callback: (dataSource) => {
                let arrs = [
                    { child: [], imgUrl: null, grade: "C" },
                    { child: [], imgUrl: null, grade: "B" },
                    { child: [], imgUrl: null, grade: "A" },
                    { child: [], imgUrl: null, grade: "S" }
                ];
                arrs.map(item => {
                    if (item.grade < dataSource.currentGradeCode) {
                        item.imgUrl = gradeImgGray[item.grade]
                    } else {
                        item.imgUrl = gradeImg[item.grade]
                    }
                    if (dataSource.currentGradeCode == "S") {
                        item.imgUrl = gradeImg[item.grade]
                    } else if (item.grade == "S") {
                        item.imgUrl = gradeImgGray[item.grade]
                    }
                    item.child = dataSource.certificationList.filter(item2 => item2.gradeCode === item.grade)
                })
                this.setState({
                    certificationList: arrs
                })
            },
        });
    }
    handleMenuClick = ({ key }) => {
        switch (key) {
            // 修改密码功能暂时
            // case 'changePwd':
            //     redirectOldSysHosts('/changePwd/changePassword');
            //     break;
            case 'logout':
                this.props.dispatch({ type: 'login/logout' });
                break;
            case 'changeRole':
                this.showModal(true);
                break;
            default:
                break;
        }
    };
    showModal = bol => {
        const { visible } = this.state;
        if (visible !== bol) {
            this.setState({ visible: bol });
            if (bol) {
                this.getRoleList();
            }
        }
    };
    choseRole = e => {
        const roleSelected = e.target.value;
        this.setState({ roleSelected });
    };
    sureChoseRole = () => {
        const { roleSelected } = this.state;
        const { roleList = [] } = this.props;
        if (this.getUserInfo().userId === roleSelected) {
            this.setState({ visible: false });
            return;
        }
        this.props.dispatch({
            type: 'login/changeRole',
            payload: roleList.find(item => item.userId === roleSelected) || {},
        });
        this.setState({ visible: false });
    };
    handleMenuList = () => {
        const selectedGroup = GLOBAL_HEADER_SELECT;
        const adminUser = this.getUserInfo();
        const positionCount = adminUser.positionCount || 0;
        //  positionCount<=1  hide  changeRole selectItem
        return selectedGroup.filter(item => item.id !== 'changeRole' || positionCount > 1);
    };
    renderContent = () => {
        const { roleSelected } = this.state;
        const { roleList = [], getRoleListLoading } = this.props;
        return (
            <div className={styles.modalContent}>
                <Spin spinning={getRoleListLoading}>
                    <RadioGroup value={roleSelected} onChange={this.choseRole}>
                        {roleList.map(item => (
                            <Radio style={radioStyle} value={item.userId} key={item.userId}>
                                {item.roleName}
                            </Radio>
                        ))}
                    </RadioGroup>
                </Spin>
            </div>
        );
    };
    render() {
        const { visible, certificationList } = this.state;
        const selectedGroup = this.handleMenuList();
        return (
            <Header style={{ padding: 0, height: '54px', lineHeight: '54px' }}>
                <GlobalHeader
                    {...this.props}
                    certificationList={certificationList}
                    onMenuClick={this.handleMenuClick}
                    selectedGroup={selectedGroup}
                />
                <Modal
                    visible={visible}
                    title="切换角色"
                    modalContent={this.renderContent()}
                    clickOK={this.sureChoseRole}
                    footButton={['取消', '确定']}
                    showModal={this.showModal}
                />
            </Header>
        );
    }
}
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};
export default SelfHeader;
