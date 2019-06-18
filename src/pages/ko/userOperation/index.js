import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import BIButton from '@/ant_components/BIButton';
import BIPagination from '@/ant_components/BIPagination';
import InitTable from './component/InitTable';
import BIModal from '@/ant_components/BIModal';
import BIInput from '@/ant_components/BIInput';
import router from 'umi/router';
import styles from './style.less';

const { TextArea } = BIInput;
@connect(({ userOperation, loading }) => ({
  loading,
  userOperation,
  isLoading: loading.effects['userOperation/userGroupList']
}))
class userOperation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      userGroupName: '',
      pageSize: 15,
      page: 1
    }
  }
  componentDidMount() {
    this.getInitData({ pageSize: this.state.pageSize, page: this.state.page });
  }
  getInitData = (params) => {
    this.props.dispatch({
      type: 'userOperation/userGroupList',
      payload: { params: params },
    })
  }
  toCreateUserGroup = () => {
    router.push({
      pathname: '/koUserOperation/userGroupAdd'
    });
  }
  onSizeChange = (page) => {
    this.setState({
      page: page
    })
    let params = {
      page: page,
      pageSize: this.state.pageSize
    }
    this.getInitData(params)
  }

  render() {
    const tableList = this.props.userOperation.userGroupList
    return (
      <div className={styles.userOperation}>
        <div className={styles.headBar}>用户运营</div>
        <div className={styles.creatBtn}>
          <BIButton type="primary" onClick={this.toCreateUserGroup}>创建用户组</BIButton>
        </div>
        <div className={styles.contentArea}>
          <Spin spinning={this.props.isLoading}>
            {
              <InitTable list={tableList} />
            }
          </Spin>

          <div className={styles.pager}>
            <BIPagination
              showQuickJumper
              defaultPageSize={this.state.pageSize}
              current={this.state.page}
              onChange={this.onSizeChange}
              total={tableList.total}
            />
          </div>

        </div>

      </div>

    );
  }
}

export default userOperation;
