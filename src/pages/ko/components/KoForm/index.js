import React from 'react';
import {Row,Col} from 'antd';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { BiFilter } from '@/utils/utils';
import styles from './style.less';
import formStyles from '../formCommon.less';
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY.MM.DD';

export default class KoForm extends React.Component {

  render() {
    return (
      <div>
        <div className={`${styles.searchBlock} ${formStyles.formStyle}`}>
          {/*第一行*/}
          <Row className={styles.gutterRow}>
            <Col className={styles.gutterCol} span={8}>
              <div className={styles.gutterBox}>
                <span className={styles.gutterLabel}>质检单号</span>：
                <span className={styles.gutterForm}><BIRangePicker style={{width:'140px'}} placeholder={["起始时间","截止时间"]} format={dateFormat}/></span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox}>
                <span className={styles.gutterLabel}>质检类型</span>：
                <span className={styles.gutterForm}>
                  <BIRangePicker style={{width:'140px'}} placeholder={["起始时间","截止时间"]} format={dateFormat}/>
                </span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox}>
                <span className={styles.gutterLabel}>质检类型</span>：
                <span className={styles.gutterForm}>
                  <BIRangePicker style={{width:'140px'}} placeholder={["起始时间","截止时间"]} format={dateFormat}/>
                </span>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
