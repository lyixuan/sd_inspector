/*
* inputTitle，请输入想删除的 “子订单编号”
* inputContent, 文本框
* inputTip，注意事项，有的话传true
* */
import React, { Component } from 'react';
import { Input } from 'antd';
import styles from '../style.less';
import CheckResult from './checkResult';

const { TextArea } = Input;

class stepInput extends Component {
  componentDidMount() {
    if (this.props.inputInfo.checkResult) {
      if (this.props.inputInfo.checkResult.successCount > 0) {
        this.props.callBackParent(false);
      } else {
        this.props.callBackParent(true);
      }
    } else {
      if (this.props.inputInfo.successCount > 0) {
        this.props.callBackParent(false);
      } else {
        this.props.callBackParent(true);
      }
    }

  }
  // input双向绑定
  handelChange(e) {
    console.log(16, e.target.value)
    return;
    const { getNums, callBackParent } = this.props;
    if (getNums) {
      getNums({ nums: e.target.value });
    }
    // 文本框没有值，下一步不可点击
    if (e.target.value && callBackParent) {
      callBackParent(false);
    } else {
      callBackParent(true);
    }
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
    let valueData = '';
    if (this.props.inputInfo.checkResult) {
      valueData = this.props.inputInfo.checkResult.failList.join(" ");
    } else {
      valueData = this.props.inputInfo.failList.join(" ");
    }
    let page = inputInfo.checkResult ? inputInfo.checkResult : inputInfo
    return (
      <div className={styles.wrap}>
        <CheckResult totalSize={page.total} failSize={page.failCount} successSize={page.successCount} />
        {/* {inputTitle ? <div className={styles.inputTitle}>{inputTitle}</div> : null} */}
        {/* {inputInfo.checkResult ? (
          <div className={inputContent ? styles.inputInfo1 : styles.inputInfo}>{inputInfo}</div>
        ) : null} */}
        {inputContent ? (
          <div className={styles.inputContent}>
            {!inputTip ? <div className={styles.inputContent_title}>{inputTitle}</div> : null}
            <TextArea
              className={styles.inputTextArea}
              autosize={{ minRows: 4, maxRows: 4 }}
              placeholder="请输入编号，多个编号，请用空格隔开"
              onChange={e => {
                this.handelChange(e);
              }}
              value={valueData}
              disabled={disabled}
              style={{ border: 'none' }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default stepInput;
