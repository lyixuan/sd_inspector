/*
* title,
* steps,
* baseLayout,
* isDisabled，
* step1Fetch, 第一步接口请求
* step2Fetch, 第二步接口请求
* step3Fetch, 第三步接口请求
* current,    当前步骤下标
* editCurrent 修改步骤
* */
import React, { Component } from 'react';
import { Steps } from 'antd';
import styles from '../style.less';
import BIButton from '@/ant_components/BIButton';
import router from 'umi/router';
const { Step } = Steps;

class StepLayout extends Component {
  // 下一页
  next() {
    const { step1Fetch, step2Fetch, step3Fetch, current, editLoading } = this.props;
    editLoading(true);
    if (current === 0) {
      if (step1Fetch) {
        step1Fetch();
      } else {
        console.warn('添加step1Fetch方法');
      }
    } else if (current === 1) {
      if (step2Fetch) {
        step2Fetch();
      } else {
        console.warn('添加step2Fetch方法');
      }
    } else if (current === 2) {
      if (step3Fetch) {
        step3Fetch();
      } else {
        console.warn('添加step3Fetch方法');
      }
    } else {
      console.log('4');
    }
  }
  // 上一页
  prev() {
    const { editCurrent, current, callBackParent, initParamsFn } = this.props;
    editCurrent(current - 1);
    callBackParent(false);
    if (current === 1 && initParamsFn) {
      initParamsFn(null);
    }
  }

  // 取消---回到列表页
  cancel = () => {
    window.history.go(-1);
  };
  // 确定---回到列表页
  clickOk = () => {
    // this.props.goBack();
    router.push({
      pathname: '/koUserOperation/userOperation'
    });
  };
  render() {
    const {
      steps,
      baseLayout,
      isDisabled,
      disableDel,
      isLoading,
      current
    } = this.props;
    const dis = disableDel === null ? isDisabled : disableDel;

    const stepBlock = (
      <div>
        {steps ? (
          <div>
            <Steps current={current} progressDot>
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
            <div>{steps[current] ? steps[current].content : null}</div>
            <div className={styles.stepsAction}>
              {current === 0 && (
                <BIButton onClick={() => this.cancel()}>
                  取消
                </BIButton>
              )}
              {current > 0 &&
                current !== steps.length - 1 && (
                  <BIButton onClick={() => this.prev()}>
                    上一步
                  </BIButton>
                )}
              {current < steps.length - 1 && (
                <BIButton
                  type="primary"
                  onClick={() => this.next()}
                  loading={isLoading}
                  disabled={isDisabled}
                >
                  下一步
                </BIButton>
              )}
              {current === steps.length - 1 && (
                <BIButton type="primary" onClick={this.clickOk}>
                  确定
                </BIButton>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
    return (
      <div className={styles.content}>{!baseLayout ? stepBlock : baseLayout}</div>
    );
  }
}

export default StepLayout;
