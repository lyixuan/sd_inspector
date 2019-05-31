import React from 'react';
import { connect } from 'dva';

import BIButton from '@/ant_components/BIButton';
import StepLayout from '../userGroupAdd/component/stepLayout';
import StepInput from '../userGroupAdd/component/stepInput';
import StepSucess from '../userGroupAdd/component/stepSucess';
import StepEdit from '../userGroupAdd/component/stepEdit1';
import styles from '../userGroupAdd/style.less';

class userOperation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      userGroupName: '',
      isDisabled: true
    }
  }
  // 回调
  onChildChange = (bol, checkParams) => {
    console.log(22, bol, checkParams)
    if (bol) {
      this.setState({
        isDisabled: bol
      });
    } else {
      this.setState({
        isDisabled: bol,
      });
    }
  };


  render() {
    console.log(36)
    const { isDisabled } = this.state;
    const current = 0
    const notice = <div>
      <p>正在创建用户组，预计需要<span style={{ color: "#52C9C2" }}>5-10</span>分钟。</p>
      <p>请在用户运营页查看最新的更新状态。</p>
    </div>
    const steps = [
      {
        title: '输入编号',
        content: (
          <StepEdit code={this.props.location.query.code} callBackParent={(bol, params) => {
            this.onChildChange(bol, params);
          }} />
        ),
      },
      {
        title: '校验文件',
        content: (
          <StepInput
            inputTitle="搜索失败的编号："
            inputContent="true"
            inputTip="true"
            nums={100} />
        ),
      },
      {
        title: '操作成功',
        content: (
          <StepSucess tipSucess={notice} />
        ),
      },

    ];

    return (
      <div className={styles.userGroup}>
        <div className={styles.headBar}>编辑用户组</div>
        <StepLayout
          current={current}
          steps={steps}
          isDisabled={isDisabled}
          disableDel={false}
        />
      </div>

    );
  }
}

export default userOperation;
