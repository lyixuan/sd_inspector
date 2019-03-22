import React from 'react';
import { Form, Row, Col } from 'antd';
import { connect } from 'dva';
import Info from './_info';
import styles from './style.less';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIRadio from '@/ant_components/BIRadio';
import BIInput from '@/ant_components/BIInput';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:1,
    }
  }
  onChange = (e) => {
    // const orgType = e.target.value === 1?'通过':'驳回';
    this.setState({
        value: e.target.value,
      });
  };
  render() {
    return (
      <div>
        <div className={styles.appealWrap}>
          <div className={styles.s1_title}>一次申诉<span className={styles.txtCls}>（一次申诉截止日期：2019-02-01）</span></div>
          <div className={styles.resultWrap}>
            <div className={styles.s2_title}>申诉发起人</div>
            <Info />
          </div>
          <div className={styles.resultWrap}>
            <div className={styles.s2_title}>SOP审核结果</div>
            <Info />
            <Info />
            <Info />
          </div>
          <div className={styles.resultWrap}>
            <div className={styles.s2_title}>主管审核</div>
            <Info />
          </div>
        </div>
        <div className={styles.appealWrap}>
          <div className={styles.s1_title}>二次申诉（二次申诉截止日期：<span>2019-02-01</span>）</div>
          <div className={styles.resultWrap}>
            <div className={styles.s2_title}>申诉发起人</div>
            <Info />
          </div>
          <div className={styles.resultWrap}>
            <div className={styles.s2_title}>SOP审核结果</div>
            <Info />
            <Info />
            <Info />
          </div>
        </div>
        <div className={styles.masterContent}>
          <div className={styles.appealTitle}>主管审核</div>
          <Row>
            <Col span={12}>
              <span>审核结果：</span>
              <BIRadio onChange={this.onChange} value={this.state.value}>
                <BIRadio.Radio value={1}>通过</BIRadio.Radio>
                <BIRadio.Radio value={2}>驳回</BIRadio.Radio>
              </BIRadio>
            </Col>
            <Col className="gutter-row txRight" span={12}>
              <span>*二申截止日期： </span>
              <BIDatePicker style={{ width: 280 }} />
            </Col>
          </Row>
          <Row className="gutter-row">
            <Col span={24} style={{ display: 'flex' }}>
              <span style={{width:80}}>审核说明：</span>
              <BIInput.TextArea rows={4} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}

export default Index;
