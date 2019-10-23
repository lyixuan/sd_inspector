import React from 'react';
import { Tooltip } from 'antd';
import styles from './style.less';
import face1 from '@/assets/xdFamily/face1.png';
import face2 from '@/assets/xdFamily/face2.png';


class ColorBlock extends React.Component {
  render() {
    const { dataSet, title = 'title', num = 'num', tip = 'tip' } = this.props;
    return (
      <div className={styles.colorBlock}>
        {dataSet && dataSet.map((item, index) =>
          <div key={index} className={styles.blockOption}>
            <Tooltip key={index} placement="bottom" title={item[tip]}>
              <div className={styles.block}>
                <div className={`${styles.title} ${styles['bg_color' + index % 5]}`}>{item[title]}</div>
                {item[num]}
              </div>
            </Tooltip>
            {item.rank == 'green' && <div className={styles.tips}>
              <span className={styles.arrow}><em></em></span>
              <div className={styles.rankTip}><img src={face1} alt="icon" />{item.rankTip}</div>
            </div>}
            {item.rank == 'red' && <div className={styles.tips}>
              <span className={styles.arrow}><em></em></span>
              <div className={`${styles.rankTip} ${styles.rankTipError}`}><img src={face2} alt="icon" />{item.rankTip}</div>
            </div>}
          </div>)}
      </div>
    );
  }
}

export default ColorBlock;
