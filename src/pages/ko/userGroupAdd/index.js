import React from 'react';
import { connect } from 'dva';

import BIButton from '@/ant_components/BIButton';
import StepLayout from './component/stepLayout';
import StepUpload from './component/stepUpload';
import StepInput from './component/stepInput';
import StepSucess from './component/stepSucess';
import styles from './style.less';

class userOperation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      userGroupName: '',
      isDisabled: true
    }
  }


  render() {
    const { isDisabled } = this.state;
    const current = 0
    const notice = <div>
      <p>正在创建用户组，预计需要<span style={{ color: "#52C9C2" }}>5-10</span>分钟。</p>
      <p>请在用户运营页查看最新的更新状态。</p>
    </div>
    const steps = [
      {
        title: '选择Excel',
        content: (
          <StepUpload />
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
        <div className={styles.headBar}>创建用户组</div>
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
