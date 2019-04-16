import React from 'react';
import { Icon } from 'antd';
import styles from '../../style.less';
class Study extends React.Component {

  render() {
    return (
      <div className={styles.comWrap}>
        <section>
          <div className={styles.dateBar}>
            <span>2019-09-09</span>
            <span>
              <Icon type="up" />
            </span>
          </div>
          <ul className={styles.behavior + " " + styles.study}>
            <li className={styles.step + " " + styles.studyTitle}>
              <div className={styles.time}>20：00：00</div>
              <div className={styles.content}>
                <div className={styles.bigDot}>
                  <span className={styles.dot}></span>
                </div>
                <div className={styles.text}>进入直播</div>
              </div>
            </li>
            <li className={styles.step}>
              <div className={styles.time}>20：00：00</div>
              <div className={styles.content}>
                <div className={styles.bigDot}>
                  <span className={styles.dot}></span>
                </div>
                <div className={styles.text}>进入直播</div>
              </div>
            </li>
            <li className={styles.step}>
              <div className={styles.time}>20：00：00</div>
              <div className={styles.content}>
                <div className={styles.bigDot}>
                  <span className={styles.dot}></span>
                </div>
                <div className={styles.priseBox}>
                  <div className={styles.prise1}>
                    <span>提交课程评价：</span>
                    <div className={styles.stars}>
                      <Icon type="star" theme="filled" />
                      <Icon type="star" theme="filled" />
                      <Icon type="star" theme="filled" />
                      <Icon type="star" theme="filled" className={styles.empty} />
                      <Icon type="star" theme="filled" className={styles.empty} />
                    </div>
                  </div>
                  <div className={styles.prise2}>
                    <span className={styles.label}>知识点讲解特清晰</span>
                    <span className={styles.label}>知识点讲解</span>
                  </div>
                  <div className={styles.prise3}>要是能互动就更好了</div>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

export default Study;
