import React from 'react';
import { Row, Col } from 'antd';
import styles from './style.css';
import moment from 'moment';
import ShowImgs from '@/pages/scoreAppeal/components/ShowImgs';
import { STATIC_HOST } from '@/utils/constants';

export default class SOPCheckResultComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  componentDidMount() { }
  render() {
    const { appealStart = {} } = this.props;
    const { operator, operateDate, desc, appealProof = [] } = appealStart;
    let newAppealProof = [];
    if (appealProof.length) {
      for (let i = 0; i < appealProof.length; i++) {
        newAppealProof.push(`${STATIC_HOST}/${appealProof[i]}`);
      }
    }
    return (
      <section className={styles.showPanel}>
        <div className={styles.personInfoCon}>
          <article className={styles.appealPerson}>
            <div className={styles.secctionTitle}>申诉发起人</div>
            <div>
              <Row className={styles.container}>
                <Col span={16}>
                  <div className={styles.resultDotColor}>
                    <span style={{ width: 75 }}>申诉证据：</span>
                    <span style={{ flex: 1 }}><ShowImgs imgList={newAppealProof} /></span>
                  </div>
                </Col>
                <Col span={3}>
                  <span>执行人：{operator}</span>
                </Col>
                <Col span={5}>
                  <span>操作时间：{moment(new Date(operateDate)).format('YYYY年MM月DD日 HH:mm:ss')}</span>
                </Col>
              </Row>
              <Row className={styles.container}>
                <Col span={24}>
                  <div>审核说明：{desc}</div>
                </Col>
              </Row>
            </div>
          </article>
        </div>
      </section>
    );
  }
}

