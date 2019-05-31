import React from 'react';
import { Row, Col } from 'antd';
import styles from './style.css';
import moment from 'moment';
import DownLoad from '@/components/DownLoad';
import { STATIC_HOST } from '@/utils/constants';

export default class AppealInfoComponent extends React.Component {
  appealPanelVisible(index) {
    this.props.onClick(index);
  }
  getAppealStatus() {
    const { isCollapse = false } = this.props.data;
    if (isCollapse) {
      return '+';
    }
    return '-';
  }
  render() {
    const { data = {}, firstCheckResult = null, secondCheckResult, uploadImgs = null } = this.props;
    const { appealEndDate, appealStart = [], type, index, isCollapse } = data;
    const number = Number(type) === 2 ? '二' : '一';
    return (
      <section className={styles.personInfoCon}>
        <span className={styles.secctionTitle}>一次申诉</span>
        <div className={styles.appealInfoCon}>
          <article className={styles.showPanel}>
            <div className={styles.appealPerson}>
              <div className={styles.secctionTitle}>申诉发起人</div>
              <div>
                <Row className={styles.container}>
                  <Col span={12}>
                    <span style={{ float: 'left', marginLeft: 0 }}>附件：{uploadImgs}</span>
                  </Col>
                  <Col span={4}>
                    <span>执行人：</span>
                  </Col>
                  <Col span={8}>
                    <span>操作时间： </span>
                  </Col>
                </Row>
                <Row className={styles.container}>
                  <Col span={24}>
                    <span>申诉说明：</span>
                  </Col>
                </Row>
              </div>
            </div>
          </article>
          <article>{firstCheckResult}</article>
          <article>{secondCheckResult}</article>
        </div>
      </section>
    );
  }
}
