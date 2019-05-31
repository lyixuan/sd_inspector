import React from 'react';
import { connect } from 'dva';

import BIButton from '@/ant_components/BIButton';
import BIPagination from '@/ant_components/BIPagination';
import InitTable from './component/InitTable';
import BIModal from '@/ant_components/BIModal';
import BIInput from '@/ant_components/BIInput';
import router from 'umi/router';
import styles from './style.less';

const { TextArea } = BIInput;
@connect(({ userOperation }) => ({
  userOperation
}))
class userOperation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      userGroupName: '',
      pageSize: 10,
      page: 1
    }
  }
  componentDidMount() {
    this.getInitData();
  }
  getInitData = () => {
    this.props.dispatch({
      type: 'userOperation/userGroupList',
      payload: { params: { pageSize: this.state.pageSize, page: this.state.page } },
    })
  }
  toCreateUserGroup = () => {
    router.push({
      pathname: '/ko/userGroupAdd'
    });
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
          <InitTable list={tableList} />
          <div className={styles.pager}>
            <BIPagination
              showQuickJumper
              defaultPageSize={1}
              current={this.state.page}
              total={50}
            />
          </div>

        </div>

      </div>

    );
  }
}

export default userOperation;
