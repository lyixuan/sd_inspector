import React from 'react';
import moment from 'moment';
import BIInput from '@/ant_components/BIInput/index';
import styles from './style.css';
import BISelect from '@/ant_components/BISelect/index';
const { Option } = BISelect;

class SecondCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appealEndDate: null,
      checkResult: null,
      desc: null,
      isWarn: null,
    };
  }
  onChangeCheckBox = e => {
    const { setStateData } = this.props;
    this.setState(
      {
        isWarn: Number(e.target.checked),
      },
      () => {
        setStateData(this.state);
      }
    );
  };
  onChangeRadio = e => {
    const { setStateData } = this.props;
    let param = {};
    if (e.target.value === 0) {
      param = {
        checkResult: e.target.value,
        isWarn: null,
      };
    } else {
      param = {
        checkResult: e.target.value,
      };
    }
    const newParams = Object.assign({}, param, { ...this.clearDate(e.target.value) });
    this.setState(newParams, () => {
      setStateData(this.state);
    });
  };
  clearDate = checkResult => {
    const { hideDate, formType } = this.props;
    const isShowDate =
      (formType && formType === 'quality' && checkResult === 0) ||
      (formType && formType === 'appeal' && checkResult === 1);
    if (hideDate || isShowDate) {
      return {
        appealEndDate: undefined,
      };
    }
  };
  disabledDate = current => {
    // const day1 = new Date();
    // day1.setTime(day1.getTime()-24*60*60*1000);
    // return  current < moment(day1,'YYYY-MM-DD');
    return current && current < moment().endOf('day');
  };
  onChangeDate = (e, dateString) => {
    const { setStateData } = this.props;
    this.setState(
      {
        appealEndDate: dateString,
      },
      () => {
        setStateData(this.state);
      }
    );
  };
  onChangeInput = e => {
    const { setStateData } = this.props;
    this.setState(
      {
        desc: e.target.value,
      },
      () => {
        setStateData(this.state);
      }
    );
  };
  render() {
    const { checkResult } = this.state;
    const { hideDate, showWarn, formType,creditType } = this.props;
    return (
      <section className={styles.personInfoCon}>
        <div className={styles.container}>
          <div className={styles.secRow} >
            <span style={{ width: 90 }}>*审核结果：</span>
          </div>
          <div style={{marginTop:'15px'}}></div>
          <div  className={styles.secRow}>
            <span style={{ width: 90 }}>&nbsp;申诉说明：</span>
            <BIInput.TextArea  maxLength={500} onChange={this.onChangeInput} rows={4} />
          </div>
        </div>
      </section>
    );
  }
}

export default SecondCheck;
