import React from 'react';
import styles from './style.less';
import { thousandsFormat } from '@/utils/utils';

class ColorBlock extends React.Component {
  render() {
    const {dataSet, title = 'title', num = 'num'} = this.props;
    return (
      <div className={styles.colorBlock}>
        {dataSet && dataSet.map((item, index) => <div key={index} className={styles.block}>
          <div className={`${styles.title} ${styles['bg_color' + index%5]}`}>{item[title]}</div>
          {thousandsFormat(item[num])}
        </div>)}
      </div>
    );
  }
}

export default ColorBlock;
