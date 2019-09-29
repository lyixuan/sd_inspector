import React from 'react';
import { Tooltip } from 'antd';
import styles from './style.less';
import face1 from '@/assets/xdFamily/face1.png';
import face2 from '@/assets/xdFamily/face2.png';
import { thousandsFormat } from '@/utils/utils';

class ColorBlock extends React.Component {
  render() {
    const {dataSet, title = 'title', num = 'num', tip = 'tip'} = this.props;
    return (
      <div className={styles.colorBlock}>
        {dataSet && dataSet.map((item, index) => <Tooltip key={index} placement="bottom" title={item[tip]}>
          <div className={styles.blockOption}>
            <div className={styles.block}>
              <div className={`${styles.title} ${styles['bg_color' + index%5]}`}>{item[title]}</div>
              {thousandsFormat(item[num])}
            </div>
            {item.rank && <div className={styles.tips}>
              <span className={styles.arrow}><em></em></span>
              <div><img src={face1} alt="icon"/>{item.rankTip}</div>
            </div>}
          </div>
          
        </Tooltip>)}
      </div>
    );
  }
}

export default ColorBlock;
