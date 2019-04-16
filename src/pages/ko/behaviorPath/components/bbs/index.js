import React from 'react';
import { Icon } from 'antd';
import UserInfo from './../userInfo';
import styles from '../../style.less';
class Bbs extends React.Component {

  render() {
    return (
      <div className={styles.comWrap}>
        <div className={styles.leftComponent}>
          <section>
            <div className={styles.dateBar}>
              <span>2019-09-09</span>
              <span>
                <Icon type="up" />
              </span>
            </div>
            <ul className={styles.behavior}>
              <li className={styles.step}>
                <div className={styles.time}>20：00：00</div>
                <div className={styles.content}>
                  <div className={styles.bigDot}>
                    <span className={styles.dot}></span>
                  </div>
                  <div className={styles.post}>
                    <p className={styles.postHead}>发主帖</p>
                    <div className={styles.postBody}>
                      我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好…...
                      <span className={styles.toggle}>展开 <Icon type="down" /></span>
                    </div>
                  </div>
                </div>
              </li>
              <li className={styles.step}>
                <div className={styles.time}>20：00：00</div>
                <div className={styles.content}>
                  <div className={styles.bigDot}>
                    <span className={styles.dot}></span>
                  </div>
                  <div className={styles.post}>
                    <p className={styles.postHead}>发主帖</p>
                    <div className={styles.postBody}>
                      我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好…...
                      <span className={styles.toggle}>展开 <Icon type="down" /></span>
                    </div>
                    <div className={styles.postBody}>
                      我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好…...
                      <span className={styles.toggle}>展开 <Icon type="down" /></span>
                    </div>
                  </div>
                </div>
              </li>
              <li className={styles.step}>
                <div className={styles.time}>20：00：00</div>
                <div className={styles.content}>
                  <div className={styles.bigDot}>
                    <span className={styles.dot}></span>
                  </div>
                  <div className={styles.post}>
                    <p className={styles.postHead}>发主帖</p>
                    <div className={styles.postBody}>
                      我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好…...
                      <span className={styles.toggle}>展开 <Icon type="down" /></span>
                    </div>
                    <div className={styles.postBody}>
                      我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好学习我要好好…...
                      <span className={styles.toggle}>展开 <Icon type="down" /></span>
                    </div>
                  </div>
                </div>
              </li>

            </ul>
          </section>
        </div>
        <UserInfo></UserInfo>
      </div >
    );
  }
}

export default Bbs;
