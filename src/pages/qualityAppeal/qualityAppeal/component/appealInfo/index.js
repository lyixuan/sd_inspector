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
    const {isCollapse=false} = this.props.data;
    if (isCollapse) {
      return '+';
    }
    return '-';
  }
  render() {
    const {data={}} = this.props;
    const { appealEndDate, appealStart=[], type, index, isCollapse } = data;
    const number = Number(type)===2?'二':'一';
    const InfoList = appealStart.map((v)=>(
      <div>
        <Row className={styles.container}>
          <Col span={12}>
            <span style={{float:'left',marginLeft:0}}>附件：</span> {v.attUrl?<DownLoad loadUrl={`${STATIC_HOST}/${v.attUrl}`} text={v.attUrl&&v.attUrl.split('/')[3]} fileName={v.attUrl&&v.attUrl.split('/')[3]} textClassName={styles.downCls}/>:null}
          </Col>
          <Col span={4}>
            <span>执行人：{v.operator}</span>
          </Col>
          <Col span={8}>
            <span>操作时间：{moment(v.operateDate).format('YYYY年MM月DD日 HH:mm:ss')} </span>
          </Col>
        </Row>
        <Row className={styles.container}>
          <Col span={24} ><span>申诉说明：{v.desc}</span></Col>
        </Row>
      </div>
    ));
    return (
      <section className={styles.personInfoCon}>
        <span className={[Number(index) === 0 ? styles.secctionTitle : `${styles.hidePanel}`]}>
          申诉信息
        </span>
        <div className={styles.appealInfoCon}>
          <div className={styles.appealInfo}>
            {number}次申诉
            <span> ({number}次申诉截止日期：{appealEndDate?moment(appealEndDate).format('YYYY-MM-DD'):null})</span>
            <span
              onClick={() => {
                this.appealPanelVisible(index);
              }}
              className={styles.appealInfoPanel}
            >
              {this.getAppealStatus()}
            </span>
          </div>
          <article className={isCollapse ? `${styles.hidePanel}` : `${styles.showPanel} `}>
            <div className={styles.appealPerson}>
              <div className={styles.secctionTitle}>申诉发起人</div>
              {InfoList}
            </div>
          </article>
        </div>
      </section>
    );
  }
}
