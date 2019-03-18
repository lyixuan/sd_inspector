import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import { Row, Col, Input, Radio } from 'antd';
const { TextArea } = Input;
const RadioGroup = Radio.Group;


class EditAppeal extends React.Component {
  render() {
    return (
      <div className={styles.editAppeal}>
        <div className={styles.editBox}>
          <div className={styles.title}>SOP审核</div>
          <Row className="gutter-row2">
            <Col span={24} className="editRow">
              <div className={styles.label}>审核结果：</div>
              <div className={styles.content}>
                <RadioGroup>
                  <Radio value={1}>通过</Radio>
                  <Radio value={2}>驳回</Radio>
                </RadioGroup>
              </div>
            </Col>
          </Row>
          <Row className="gutter-row2">
            <Col span={24} className="editRow">
              <div className={styles.label}>审核说明：</div>
              <div className={styles.content}>
                <TextArea rows={4} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default EditAppeal;
