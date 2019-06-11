import React, { Component } from 'react';
import { Input } from 'antd';
import styles from '../style.less';
import BIRadio from '@/ant_components/BIRadio';

const { TextArea } = Input;

class StepEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateType: props.updateType ? props.updateType : 1,
      id: props.queryParam.id,
      userIdStr: props.faileData ? props.faileData : ''
    }
  }
  // input双向绑定
  handelChange = (e) => {
    this.setState({
      userIdStr: e.target.value
    })
    const { getParams, callBackParent } = this.props;
    let param = {
      updateType: this.state.updateType,
      id: this.state.id,
      userIdStr: e.target.value
    }
    if (getParams) {
      getParams(param);
    }
    // 文本框没有值，下一步不可点击
    if (e.target.value && callBackParent) {
      callBackParent(false);
    } else {
      callBackParent(true);
    }
  }
  onChangeRadio = (e) => {
    this.setState({
      updateType: e.target.value,
    });
    const { getParams } = this.props;
    let param = {
      updateType: e.target.value,
      id: this.state.id,
      userIdStr: this.state.userIdStr
    }
    if (getParams) {
      getParams(param);
    }

  }
  render() {
    const { faileData } = this.props;
    let valueData = '';
    if (!faileData) {
      valueData = '';
    } else {
      valueData = faileData;
    }
    return (
      <div className={styles.wrap}>
        <div className={styles.stepEdit}>
          <div className={styles.row}>
            <label>用户组编号：</label>
            <p>{this.props.queryParam.code}</p>
          </div>
          <div className={styles.row}>
            <label>选择：</label>
            <div className={styles.option}>
              <BIRadio onChange={this.onChangeRadio} value={this.state.updateType}>
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
          defaultValue={valueData}
        />
      </div>
    );
  }
}

export default StepEdit;
