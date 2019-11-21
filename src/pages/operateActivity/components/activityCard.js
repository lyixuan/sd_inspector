import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import style from './cardStyle.less';
import going from '@/assets/operateActivity/going.png';
import wait from '@/assets/operateActivity/wait.png';
import gone from '@/assets/operateActivity/gone.png';

class ActivityCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {sourceData} = this.props;

    return <div className={style.wrap}>
      <div onClick={this.clickCard.bind(this, sourceData.id)}>
        <div className={style.head}>
          <div className={style.left}>
            <img
            className={style.image}
            src={sourceData.status === 0 ? wait : (sourceData.status === 1 ? going : gone)} />
            {/*<span className={style.title}>专升本88折秒杀</span>*/}
          </div>
          <Icon
            className={style.close}
            type="close"
            onClick={this.closeCard.bind(this, sourceData.id, sourceData.name)}/>
        </div>
        <div className={style.content}>
          <div className={style.name}>{sourceData.name}</div>
          <div className={style.time}>展示时间：{sourceData.startTime} ~ {sourceData.endTime}</div>
        </div>
        <div className={style.footer}>
          <span style={{marginRight: 8}}>{sourceData.operatorName}</span>
          <span>{sourceData.updateTime}</span>
        </div>
      </div>
    </div>
  }

  clickCard = (id) => {
    this.props.onClick(id);
  };

  closeCard = (id, name, e) => {
    e.stopPropagation();
    this.props.onClose(id, name)
  };
}

export default connect(() => ({}))(ActivityCard);
