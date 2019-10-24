import React from 'react';
import { connect } from 'dva';
import styles from './styles.less';
import workImg1 from '@/assets/workImg1.png';
import workImg2 from '@/assets/workImg2.png';
import workImg3 from '@/assets/workImg3.png';
import workImg4 from '@/assets/workImg4.png';
import workImg5 from '@/assets/workImg5.png';
import workArrow from '@/assets/workArrow.png';

@connect(xdWorkModal => ({
  xdWorkModal,
}))
class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    // const { userId} = this.state;
    return (
      <div className={styles.header}>
        <p className={styles.title}>
          <span className={styles.word}>关键指标</span>
          <span className={styles.date}>2019.07.29 - 2019.08.10 (最新学分日期)</span>
        </p>
        <ul className={styles.list}>
          <li>
            <img src={workImg1} alt="icon" />
            <span className={styles.changeType}>
              壁垒
              <img src={workArrow} className={styles.arrow} />
            </span>
            <span className={styles.num}>8.92</span>
            <p className={styles.bottom}>
              <span>学分均分</span>
              <span className={styles.arrowCon}>
                10%<i className={styles.arrowTop}></i>
                <i className={styles.arrowBottom}></i>
              </span>
            </p>
          </li>
          <li>
            <img src={workImg2} alt="icon" />
            <span className={styles.num}>8.92</span>
            <p className={styles.bottom}>
              <span>创收单量</span>
            </p>
          </li>
          <li>
            <img src={workImg3} alt="icon" />
            <span className={styles.num}>8.92</span>
            <p className={styles.bottom}>
              <span>创收流失</span>
            </p>
          </li>
          <li>
            <img src={workImg4} alt="icon" />
            <span className={styles.num}>8.92</span>
            <p className={styles.bottom}>
              <span>IM差评率</span>
            </p>
          </li>
          <li>
            <img src={workImg5} alt="icon" />
            <span className={styles.num}>8.92</span>
            <p className={styles.bottom}>
              <span>BBS负面贴数</span>
            </p>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
