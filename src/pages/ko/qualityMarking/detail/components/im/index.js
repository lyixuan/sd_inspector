import React from 'react';
import copy from 'copy-to-clipboard';
import { Icon } from 'antd';
import { connect } from 'dva';
import styles from '../../style.less';

class DetailIm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  handleClick = (e) => {
    // 复制
    copy(e.target.value)
    alert('复制成功', 1)
  }

  render() {
    return (
      <>
        <ul className={styles.userInfo}>
          <li className={styles.flex}>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>学员姓名：</span>
              <span className={styles.name + " " + styles.nameCurrent}>玉青龙</span>
            </div>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>学员id：</span>
              <span className={styles.name}>388383</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>后端归属：</span>
              <span className={styles.name}>玉青龙龙玉青青龙玉青龙玉青龙玉青龙玉青龙玉青龙玉青龙玉青龙玉青龙玉青龙玉青龙玉青龙玉青龙</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>班主任：</span>
              <span className={styles.name}>玉青龙</span>
            </div>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>会话老师：</span>
              <span className={styles.name}>388383</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>订单id：</span>
              <span className={styles.name}>899889</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>产品包：</span>
              <span className={styles.name}>899889</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>满意度：</span>
              <span className={styles.name}>玉青龙</span>
            </div>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>咨询id：</span>
              <span className={styles.name}>388383</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>评价：</span>
              <span className={styles.name}>不满意</span>
            </div>
          </li>
        </ul>
        <div className={styles.imContent}>
          <div className={styles.dateBar}>
            <span>2019-09-09</span>
            <span className={styles.btn}>
              <Icon type="copy" />复制会话
            </span>
          </div>
          <ul className={styles.behavior}>
            <li className={`${styles.step} ${styles.title}`}>
              <div className={styles.time}>20：00：00</div>
              <div className={styles.content}>
                <div className={`${styles.bigDot} ${styles.plus}`}>
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
                <div className={`${styles.chat} ${styles.chatRight}`}>
                  <div className={styles.chatContent}>
                    <span className={styles.striangle}><em></em></span>
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
                <div className={`${styles.chat} ${styles.chatLeft}`}>
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


        </div>
      </>
    );
  }
}

export default DetailIm;

