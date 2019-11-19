import React from 'react';
import { Button, Icon, Modal } from 'antd';
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
    const {sourceData} = this.props;

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
          <div className={style.name}>{sourceData.name}</div>
          <div className={style.time}>展示时间：{sourceData.startTime} ~ {sourceData.endTime}</div>
        </div>
        <div className={style.footer}>
          <span style={{marginRight: 8}}>{sourceData.operatorName}</span>
          <span>{sourceData.updateTime}</span>
        </div>
      </div>

      <Modal
        title="删除提示"
        width={520}
        getContainer={false}
        visible={showDeleteModal}
        wrapClassName={style['delete-modal']}
        footer={
          <div>
            <Button
              style={{width: 80}}
              onClick={this.closeDeleteModal}>取消</Button>
            <Button
              style={{width: 80, border: 'none'}}
              type="primary" onClick={this.confirmModal}>确定</Button>
          </div>
        }
        onCancel={this.closeDeleteModal}>
        <div className={style['content-box']}>
          <img className={style.icon} src={deleteImg} />
          <span className={style.content}>你确定要删除活动{sourceData.name}吗？</span>
        </div>
      </Modal>
    </div>
  }

  clickCard = () => {
    this.props.onClick();
  };

  closeCard = (e) => {
    e.stopPropagation();
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
    const {sourceData} = this.props;
    this.props.onConfirm(sourceData.id);
    this.setState({
      showDeleteModal: false
    });
  };
}

export default ActivityCard;
