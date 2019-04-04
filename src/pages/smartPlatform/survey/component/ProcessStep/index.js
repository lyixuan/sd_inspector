import { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './style.less';
import { PROVINCE_STEP } from '@/utils/constants';
import { province } from '../../../exam/services';
import router from 'umi/router';
import moment from 'moment';

@connect(({ survey }) => ({
  survey,
}))
class ProcessStep extends PureComponent {
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
      objList: null,
    };
  }

  componentWillReceiveProps = nextProps => {
    console.log(nextProps);
    if (nextProps.province != this.props.province && nextProps.data && nextProps.data.length > 0) {
      this.handleNodeExam(nextProps.province, nextProps.pushNum);
    }
    return null;
  };
  handleNodeExam = (province, planNum) => {
    this.props.dispatch({
      type: 'survey/getNodeMsgCount',
      payload: { province: province, planNum: planNum },
    });
  };
  redirectDetails = (obj, name) => {
    if (obj.stepStatus == 2) {
      router.push({
        pathname: '/smartPlatform/pushData',
        query: { province: '北京市', nodeSign: obj.stepType, pathName: name },
      });
    }
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
  handleData = (data = [], examNodes) => {
    return PROVINCE_STEP.map((item, index) => {
      const obj = data.find(ls => ls.stepType === item.id) || {};
      const beginDate = obj.beginDate ? moment(obj.beginDate).format('MMMDo') : '';
      const endDate = obj.endDate ? moment(obj.endDate).format('MMMDo') : '';
      const dateTime = beginDate + endDate ? `${beginDate}-${endDate}` : '暂未公布';
      const { stepStatus } = obj; // 报考状态
      const examNodeLightHight =
        stepStatus === 3 || stepStatus === 1 || stepStatus === -1 || stepStatus == undefined;
      const toolTips = examNodeLightHight ? (
        <></>
      ) : (
        <StepStatusHover data={examNodes[index]} isVisible={item.isVisible} />
      );
      return (
        <li
          onClick={this.redirectDetails.bind(this, obj, item.name)}
          onMouseLeave={this.stepStatusLeave.bind(this, index)}
          onMouseOver={this.stepStatusHover.bind(this, index)}
          className={examNodeLightHight ? styles.stepItem2 : styles.stepItem1}
          key={item.id}
        >
          {stepStatus === 3 ? <div className={styles.stepOver}>已结束</div> : null}
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
    console.log('render', this.props);
    const objList = this.handleData(this.props.data, this.props.survey.examNodes) || null;
    return (
      <ul className={styles.stateBox}>
        {objList}
        <li className={styles.line} />
      </ul>
    );
  }
}
export default ProcessStep;

function StepStatusHover(props) {
  let readStyle = { width: props.data.readRatio * 160 + 'px' };
  let unReadStyle = { width: props.data.unreadRatio * 160 + 'px' };
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
