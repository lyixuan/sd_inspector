import React from 'react';
import { Icon } from 'antd';
import styles from '../../style.less';
class Im extends React.Component {

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
          <ul className={styles.behavior}>
            <li className={styles.step + " " + styles.title}>
              <div className={styles.time}>20：00：00</div>
              <div className={styles.content}>
                <div className={styles.bigDot}>
                  <span className={styles.dot}></span>
                </div>
                <div className={styles.text}>进入会话</div>
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
                <div className={styles.prise}>
                  <span>学员提交评价：</span>
                  <div className={styles.stars}>
                    <Icon type="star" theme="filled" />
                    <Icon type="star" theme="filled" />
                    <Icon type="star" theme="filled" />
                    <Icon type="star" theme="filled" className={styles.empty} />
                    <Icon type="star" theme="filled" className={styles.empty} />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </section>
        <section>
          <div className={styles.dateBar}>
            <span>2019-09-09</span>
            <span>
              <Icon type="up" />
            </span>
          </div>
          <ul className={styles.behavior}>
            <li className={styles.step + " " + styles.title}>
              <div className={styles.time}>20：00：00</div>
              <div className={styles.content}>
                <div className={styles.bigDot + " " + styles.plus}>
                  <span className={styles.dot}></span>
                </div>
                <div className={styles.text}>进入会话</div>
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
                <div className={styles.prise}>
                  <span>学员提交评价：</span>
                  <div className={styles.stars}>
                    <Icon type="star" theme="filled" />
                    <Icon type="star" theme="filled" />
                    <Icon type="star" theme="filled" />
                    <Icon type="star" theme="filled" className={styles.empty} />
                    <Icon type="star" theme="filled" className={styles.empty} />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div >
    );
  }
}

export default Im;
