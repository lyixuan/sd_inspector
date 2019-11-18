import React from 'react';
import {Icon, Modal} from 'antd';
import style from './cardStyle.less';
import going from '@/assets/operateActivity/going.png';
import wait from '@/assets/operateActivity/wait.png';
import gone from '@/assets/operateActivity/gone.png';
import deleteImg from '@/assets/operateActivity/delete-img.png';

class ActivityCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      showDeleteModal: false
    }
  }

  render() {
    const {status, showDeleteModal} = this.state;

    return <div className={style.wrap}>
      <div onClick={this.clickCard}>
        <div className={style.head}>
          <div className={style.left}>
            <img
            className={style.image}
            src={status === 0 ? wait : (status === 1 ? going : gone)} />
            {/*<span className={style.title}>专升本88折秒杀</span>*/}
          </div>
          <Icon
            className={style.close}
            type="close"
            onClick={this.closeCard}/>
        </div>
        <div className={style.content}>
          <div className={style.name}>专升本88折秒杀</div>
          <div className={style.time}>展示时间：2019-08-01 10:00 ~ 2019-08-10 10:00</div>
        </div>
        <div className={style.footer}>
          <span style={{marginRight: 8}}>张办理</span><span>2019-08-01 10:00</span>
        </div>
      </div>

      <Modal
        title="删除提示"
        width={520}
        getContainer={false}
        visible={showDeleteModal}
        wrapClassName={style['delete-modal']}
        onCancel={this.closeDeleteModal}
        onOk={this.confirmModal}>
        <div className={style['content-box']}>
          <img className={style.icon} src={deleteImg} />
          <span className={style.content}>你确定要删除活动吗？</span>
        </div>
      </Modal>
    </div>
  }

  clickCard = () => {
    this.props.onClick();
  };

  closeCard = () => {
    this.setState({
      showDeleteModal: true
    })
  };

  closeDeleteModal = () => {
    this.setState({
      showDeleteModal: false
    })
  };

  confirmModal = () => {
    this.props.onConfirm();
    this.setState({
      showDeleteModal: false
    });
  };
}

export default ActivityCard;
