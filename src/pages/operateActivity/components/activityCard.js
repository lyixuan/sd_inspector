import React from 'react';
import {Icon} from 'antd';
import style from './cardStyle.less';
import going from '@/assets/operateActivity/going.png';
import wait from '@/assets/operateActivity/wait.png';
import gone from '@/assets/operateActivity/gone.png';

class ActivityCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      status: 0
    }
  }

  render() {
    const {status} = this.state;

    return <div className={style.wrap}>
      <div className={style.head}>
        <div className={style.left}>
          <img
          className={style.image}
          src={status === 0 ? wait : (status === 1 ? going : gone)} />
          <span className={style.title}>专升本88折秒杀</span>
        </div>
        <Icon
          className={style.close}
          type="close" />
      </div>
    </div>
  }
}

export default ActivityCard;
