import React from 'react';
import styles from './style.css';
import moment from 'moment';
import { BiFilter } from '@/utils/utils';

export default class PersonInfoComponent extends React.Component {
  appealPanelVisible() {
    this.props.onClick();
  }
  getAppealStatus() {
    if (this.props.qualityInfoCollapse) {
      return '-';
    }
    return '+';
  }

  render() {
    const {qualityInfoCollapse,data={}} = this.props;
    const { qualityType, verifyDate, mail, role, collegeName,familyName,groupName, name } = data;

    const roleObj = BiFilter("FRONT_ROLE_TYPE_LIST").find(item => item.id === role);

    return (
      <section className={styles.personInfoCon}>
        <div className={styles.personInfo}>
          <span>质检违规详情</span>
          <span>{verifyDate?`（质检审核通过时间：${moment(verifyDate).format('YYYY-MM-DD HH:mm:ss')})`:null}</span>
          <span
            onClick={() => {
              this.appealPanelVisible();
            }}
            className={styles.appealInfoPanel}
          >
            {this.getAppealStatus()}
          </span>
        </div>
        <div className={qualityInfoCollapse ? `${styles.showPanel} ` : `${styles.hidePanel}`}>
          <div className={styles.container}>
            <div className={styles.secRow}>
              <div>质检类型：{Number(qualityType) === 1 ? '客诉质检' : '班主任质检'}</div>
              <div>归属人邮箱：{mail}@sunlands.com</div>
              <div>归属人角色：{roleObj?roleObj.name:''  }</div>
            </div>
            <div className={styles.secRow}>
              <div />
              <div>归属组织：{collegeName}{familyName?`| ${familyName}`:null}{groupName?`| ${groupName}`:null}</div>
              <div>归属人：{name}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
