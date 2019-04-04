import React from 'react';
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
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div>
              <span style={{float:'left',marginLeft:0}}>附件：</span> {v.attUrl?<DownLoad loadUrl={`${STATIC_HOST}/${v.attUrl}`} text={v.attUrl&&v.attUrl.split('/')[3]} fileName={v.attUrl&&v.attUrl.split('/')[3]} textClassName={styles.downCls}/>:null}
            </div>
          </div>
          <div className={[styles.secRow]}>
            <div>
              <span>执行人：{v.operator}</span>
              <span>
                      操作时间：{moment(v.operateDate).format('YYYY-MM-DD HH:mm:ss')}
                    </span>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.secCol}>
            <div>申诉说明：{v.desc}</div>
            <div />
          </div>
        </div>
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
            <span> {number}次申诉截止日期：{appealEndDate?moment(appealEndDate).format('YYYY-MM-DD HH:mm:ss'):null}</span>
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
