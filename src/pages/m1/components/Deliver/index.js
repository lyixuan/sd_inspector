import React from 'react';
import titleImg from '@/assets/title.png';

import styles from './index.less';

export default class RadioComponent extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className={styles.contWrap}>
        <div className={styles.bg}>
          {this.props.titleName}
        </div>
      </div>
    )
  }
}
