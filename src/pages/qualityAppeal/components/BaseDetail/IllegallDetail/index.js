import React from 'react';
import styles from './style.css';
import { STATIC_HOST } from '@/utils/constants';
import DownLoad from '@/components/DownLoad';

export default class IllegallDetail extends React.Component {
  render() {
    const { data } = this.props;
    const name = data.attUrl ? data.attUrl.split('/')[3]:"";
    return (
      <section className={styles.personInfoCon}>
        <div className={styles.boxTitle}>
          <span>违规详情</span>
        </div>
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div><span className={styles.spanLabel}>附件</span>：<span className={styles.downSpan}>{data.attUrl ? <DownLoad loadUrl={`${STATIC_HOST}/${data.attUrl}`} text={name} fileName={name} /> : null}</span></div>
            <p><span className={styles.spanLabel}>违规详情</span>：{data.desc}</p>
          </div>
        </div>
      </section>
    );
  }
}
