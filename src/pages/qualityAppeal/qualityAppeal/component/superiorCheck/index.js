import React from 'react';
import styles from './style.css';
import { Row, Col } from 'antd';
import Item from 'antd/lib/list/Item';
import moment from 'moment';

export default class SuperiorCheckComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  componentDidMount() {}

  render() {
    const { masterAppealCheck={}, isCollapse } = this.props.data ? this.props.data : {};
    return (
      <section className={isCollapse ? `${styles.hidePanel}` : `${styles.showPanel} `}>
        <div className={styles.personInfoCon}>
          <article className={styles.appealPerson}>
            <div className={styles.secctionTitle}>主管审核：</div>
            {/* {this.state.data.map(item => ( */}
            <div>
              <Row className={styles.container}>
                <Col span={12} style={{marginLeft:3}}>
                  <div className={Number(masterAppealCheck.checkResult) ? styles.resultDotColor1 : styles.resultDotColor2}>
                    审核结果：{Number(masterAppealCheck.checkResult) === 1 ? '通过' : '不通过'}
                  </div>
                </Col>
                <Col span={4}>
                  <span>执行人：{masterAppealCheck.operator}</span>
                </Col>
                <Col span={8}>
                  <span>操作时间：{moment(masterAppealCheck.operateDate).format('YYYY年MM月DD日 HH:mm:ss')}</span>
                </Col>
              </Row>
              <div>
                <div className={styles.secCol}>
                  <div>审核说明：{masterAppealCheck.desc}</div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }
}
