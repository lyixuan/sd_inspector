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
    const { appealEndDate, appealStart, type, index, isCollapse } = data;
    const name= appealStart.attUrl&&appealStart.attUrl.split('/')[3];

    const number = Number(type)===2?'二':'一';
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
              <div className={styles.container}>
                <div className={styles.secRow}>
                  <span>附件：</span> <div>{appealStart.attUrl?<DownLoad loadUrl={`${STATIC_HOST}/${appealStart.attUrl}`} text={name} fileName={()=>name} textClassName={styles.downCls}/>:null} </div>
                </div>
                <div className={[styles.secRow]}>
                  <div>
                    <span>执行人：{appealStart.operator}</span>
                    <span>
                      操作时间：{moment(appealStart.operateDate).format('YYYY-MM-DD HH:mm:ss')}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.secCol}>
                  <div>申诉说明：{appealStart.desc}</div>
                  <div />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }
}
