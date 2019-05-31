import React from 'react';
import { Row, Col, Checkbox } from 'antd';
import moment from 'moment';
import BIDatePicker from '@/ant_components/BIDatePicker/index';
import BIRadio from '@/ant_components/BIRadio/index';
import BIInput from '@/ant_components/BIInput/index';
import UploadImgs from '../uploadImgs';
import styles from './styles.css';
class Edit extends React.Component {
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
    const { hideDate, showWarn, formType } = this.props;
    const isShowDate =
      (formType && formType === 'quality' && checkResult === 0) ||
      (formType && formType === 'appeal' && checkResult === 1);
    return (
      <section className={styles.personInfoCon}>
        <span className={styles.secctionTitle}>一次申诉</span>
        <div className={styles.appealInfoCon}>
          <div className={styles.rowGap} />
          <Row className="gutter-row">
            <Col span={24} style={{ display: 'flex' }}>
              <span style={{ width: 80 }}>&nbsp;申诉证据：</span>
              <UploadImgs type="edit" />
            </Col>
          </Row>
          <div className={styles.rowGap} />

          <Row className="gutter-row">
            <Col span={24} style={{ display: 'flex' }}>
              <span style={{ width: 80 }}>&nbsp;申诉说明：</span>
              <BIInput.TextArea maxLength={500} onChange={this.onChangeInput} rows={4} />
            </Col>
          </Row>
        </div>
      </section>
    );
  }
}

export default Edit;
