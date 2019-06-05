import React from 'react';
import { Row, Col } from 'antd';
import styles from './style.css';
import moment from 'moment/moment';
import ShowImgs from '@/pages/scoreAppeal/components/ShowImgs';

export default class SOPCheckResultComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  componentDidMount() {}
  render() {
    const { appealStart={} } = this.props;
    const {operator,operateDate,desc,appealProof=['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png','https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png']} = appealStart;
    return (
      <section className={styles.showPanel}>
        <div className={styles.personInfoCon}>
          <article className={styles.appealPerson}>
            <div className={styles.secctionTitle}>申诉发起人</div>
            <div>
              <Row className={styles.container}>
                <Col span={16}>
                  <div className={styles.resultDotColor}>
                    <span style={{width:75}}>申诉证据：</span>
                    <span style={{flex:1}}><ShowImgs imgList = {appealProof}/></span>
                  </div>
                </Col>
                <Col span={4}>
                  <span>执行人：{operator}</span>
                </Col>
                <Col span={4}>
                  <span>操作时间：{operateDate}</span>
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

