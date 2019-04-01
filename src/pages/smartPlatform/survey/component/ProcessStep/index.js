import { PureComponent } from 'react';
import styles from './style.less';
import { PROVINCE_STEP } from '@/utils/constants';
import router from 'umi/router';
import moment from 'moment';

function StepStatusHover(props) {
  console.log('props', props);
  let readStyle = { width: props.data.readNum * 157 + 'px' };
  let unReadStyle = { width: props.data.unreadNum * 157 + 'px' };
  return (
    <div className={props.isVisible ? styles.showToolTips : styles.hideToolTips}>
      <span className={styles.msgRead} style={readStyle} />
      <span className={styles.msgUnRead} style={unReadStyle} />
      <div className={styles.percentNum}>
        <span>{(props.data.readRatio * 100).toFixed(2)}%</span>
        <span>{(props.data.unreadRatio * 100).toFixed(2)}%</span>
      </div>
      <div className={styles.countNum}>
        <span>已读{props.data.readNum}</span>
        <span>未读{props.data.unreadNum}</span>
      </div>
    </div>
  );
}

export default class ProcessStep extends PureComponent {
  constructor(props) {
    super(props);
    this.initObj = this.initData();
    let examStep = PROVINCE_STEP.map(item => {
      item.isVisible = false;
      return item;
    }).slice();
    this.state = {
      initObj: examStep,
      props: props,
    };
  }
  static getDerivedStateFromProps = (nextProps, prevState) => {
    console.log(nextProps);
  };
  redirectDetails = obj => {
    console.log(obj);
    if (!obj.stepType) {
      return;
    }
    router.push({
      pathname: '/smartPlatform/pushData',
      query: { province: '北京市', nodeSign: obj.stepType },
    });
  };
  initData = () => {
    const returnObj = {};
    PROVINCE_STEP.forEach(item => {
      returnObj[item.id] = {
        stepStatus: item.id,
        name: item.name,
      };
    });
    return returnObj;
  };
  stepStatusHover(index) {
    if (!this.state.initObj[index].isVisible) {
      this.state.initObj[index].isVisible = true;
      this.setState({ initObj: this.state.initObj.slice() });
    }
  }
  stepStatusLeave(index) {
    if (this.state.initObj[index].isVisible) {
      this.state.initObj[index].isVisible = false;
      this.setState({ initObj: this.state.initObj.slice() });
    }
  }
  handleData = (data = []) => {
    return PROVINCE_STEP.map((item, index) => {
      const obj = data.find(ls => ls.stepType === item.id) || {};
      console.log('obj:', obj);
      const beginDate = obj.beginDate ? moment(obj.beginDate).format('MMMDo') : '';
      const endDate = obj.endDate ? moment(obj.endDate).format('MMMDo') : '';
      const dateTime = beginDate + endDate ? `${beginDate}-${endDate}` : '暂未公布';
      const { stepStatus } = obj; // 报考状态
      console.log(stepStatus, beginDate + endDate);
      const examNodeLightHight = stepStatus === 2 || stepStatus === 0 || stepStatus === -1;
      const toolTips =
        examNodeLightHight || beginDate + endDate == '' ? (
          <></>
        ) : (
          <StepStatusHover data={obj} isVisible={item.isVisible} />
        );
      return (
        <li
          onClick={this.redirectDetails.bind(this, obj)}
          onMouseLeave={this.stepStatusLeave.bind(this, index)}
          onMouseOver={this.stepStatusHover.bind(this, index)}
          className={examNodeLightHight ? styles.stepItem2 : styles.stepItem1}
          key={item.id}
        >
          {stepStatus === 2 ? <div className={styles.stepOver}>已结束</div> : null}
          <h4 className={styles.processName} key={`${item.id}h4`}>
            {item.name}
          </h4>
          <p className={styles.processDate} key={`${item.id}p`}>
            {dateTime}
          </p>
          <span className={styles.symbal}>◀</span>
          <span className={styles.circle} />
          {toolTips}
        </li>
      );
    });
  };
  render() {
    const { data = [] } = this.props;
    const objList = this.handleData(data) || null;
    return (
      <ul className={styles.stateBox}>
        {objList}
        <li className={styles.line} />
      </ul>
    );
  }
}
