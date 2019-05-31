import React, { Component } from 'react';
import { Input } from 'antd';
import styles from '../style.less';
import BIRadio from '@/ant_components/BIRadio';

const { TextArea } = Input;

class StepEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    }
  }
  // input双向绑定
  handelChange = (e) => {
    const { callBackParent } = this.props;
    // 文本框没有值，下一步不可点击
    if (e.target.value && callBackParent) {
      callBackParent(false);
    } else {
      callBackParent(true);
    }
  }
  onChange = (e) => {
    const orgType = e.target.value === 1 ? 'college' : 'family';
    this.setState({
      value: e.target.value,
    }
    );
  }
  render() {
    const {
      inputTitle,
      inputInfo,
      inputContent,
      inputTip,
      disabled,
      faileData,
      nums,
      pageType,
    } = this.props;

    return (
      <div className={styles.wrap}>
        <div className={styles.stepEdit}>
          <div className={styles.row}>
            <label>用户组编号：</label>
            <p>{this.props.code}</p>
          </div>
          <div className={styles.row}>
            <label>选择：</label>
            <div className={styles.option}>
              <BIRadio onChange={this.onChange} value={this.state.value}>
                <BIRadio.Radio value={1}>删除用户</BIRadio.Radio>
                <BIRadio.Radio value={2}>添加用户</BIRadio.Radio>
              </BIRadio>
            </div>
          </div>
        </div>
        <TextArea
          className={styles.inputTextArea}
          autosize={{ minRows: 4, maxRows: 4 }}
          placeholder="请输入学生ID，多个ID请用空格隔开"
          onChange={this.handelChange}
        />
      </div>
    );
  }
}

export default StepEdit;
