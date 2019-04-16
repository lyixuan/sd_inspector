import React from 'react';
import { Icon } from 'antd';
import UserInfo from './../userInfo';
import styles from '../../style.less';
class PrivateLetter extends React.Component {

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
            <ul className={styles.behavior + " " + styles.privateLetter}>
              <li className={styles.step + " " + styles.title}>
                <div className={styles.time}>20：00：00</div>
                <div className={styles.content}>
                  <div className={styles.bigDot + " " + styles.plus}>
                    <span className={styles.dot}></span>
                  </div>
                  <div className={styles.privateToggle}>
                    <div className={styles.avatar}>
                      <img src="http://img1.imgtn.bdimg.com/it/u=1393987749,3422146058&fm=26&gp=0.jpg" />
                    </div>
                    <div className={styles.intro}>
                      <p className={styles.name}>苏大强</p>
                      <p className={styles.chat}>还行啊，老师都挺负责的</p>
                    </div>
                  </div>
                </div>
              </li>
              <li className={styles.step + " " + styles.title}>
                <div className={styles.time}>20：00：00</div>
                <div className={styles.content}>
                  <div className={styles.bigDot}>
                    <span className={styles.dot}></span>
                  </div>
                  <div className={styles.text}>
                    与韩眉眉的对话
                  </div>
                </div>
              </li>
              <li className={styles.step}>
                <div className={styles.time}>20：00：00</div>
                <div className={styles.content}>
                  <div className={styles.bigDot}>
                    <span className={styles.dot}></span>
                  </div>
                  <div className={styles.text}>点击FAQ【报考流程是什么】</div>
                </div>
              </li>
              <li className={styles.step}>
                <div className={styles.time}>20：00：00</div>
                <div className={styles.content}>
                  <div className={styles.bigDot}>
                    <span className={styles.dot}></span>
                  </div>
                  <div className={styles.chatLeft}>
                    <div className={styles.avatar}>
                      <img src="http://img1.imgtn.bdimg.com/it/u=1393987749,3422146058&fm=26&gp=0.jpg" />
                      <p>尚德学员</p>
                    </div>
                    <div className={styles.chatContent}>
                      <span className={styles.triangle}><em></em></span>
                      报考科目有哪些
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
                  <div className={styles.chatRight}>
                    <div className={styles.chatContent}>
                      <span className={styles.triangle}><em></em></span>
                      报考科目有哪些报考科目有哪些报考科目有哪些报考科目有哪些
                    </div>
                    <div className={styles.avatar}>
                      <img src="http://img1.imgtn.bdimg.com/it/u=1393987749,3422146058&fm=26&gp=0.jpg" />
                      <p>尚德学员</p>
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
                  <div className={styles.chatLeft}>
                    <div className={styles.avatar}>
                      <img src="http://img1.imgtn.bdimg.com/it/u=1393987749,3422146058&fm=26&gp=0.jpg" />
                      <p>尚德学员</p>
                    </div>
                    <div className={styles.chatContent}>
                      <span className={styles.triangle}><em></em></span>
                      报考科目有哪些
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

export default PrivateLetter;
