import React from 'react';
import {connect} from 'dva';
import styles from './styles.less';
import { Button, Input, Icon, Spin, Modal, message} from 'antd';
import router from 'umi/router';
import ActivityCard from '@/pages/operateActivity/components/activityCard';
import kongbai from '@/assets/operateActivity/kongbai.png';
import {getUserInfo, getRobotId, getActiveList, deleteActive} from './services';
import storage from '@/utils/storage';
import extentImg from '@/assets/xdcredit/extent.png';
import {withoutSeconds} from '@/pages/configWords/utils/util';
import style from '@/pages/operateActivity/components/cardStyle.less';
import deleteImg from '@/assets/operateActivity/delete-img.png';

class OperateActivity extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      isLoading: true,
      hasPermission: true,
      showDeleteModal: false,
      deleteActivityId: 0,
      deleteActivityName: ''
    };
  }

  render() {
    const {isLoading, activities, hasPermission, showDeleteModal, deleteActivityName} = this.state;

    let loading = <div style={{textAlign: 'center'}}>
      <Spin size="large" />
    </div>;

    let noPermission = <div className={styles.permission}>
      <img src={extentImg} alt='权限' className={styles.image}/>
      <span className={styles.text}>你没有权限查看该页面，请联系系统管理员</span>
    </div>;

    let noActive = <div className={styles.kongbai}>
      <img src={kongbai} className={styles.image}/>
      <p className={styles.text}>您还没有运营活动，快创建一个吧</p>
      <Button
        type='primary'
        className={styles.button}
        onClick={this.goToCreate}>
        <Icon type="plus" />创建活动</Button>
    </div>;

    let content = <div className={styles.wrap}>
      <div className={styles.head}>
        <Button
          className={styles.button}
          type="primary"
          onClick={this.goToCreate}>
          <Icon type="plus" style={{width: 12, height: 12, marginRight: 2}}/>
          创建活动</Button>
        {/*<Input*/}
        {/*  className={styles.input}*/}
        {/*  suffix={<Icon type="search" style={{color: '#B8BBBF'}} />}*/}
        {/*  placeholder="请输入活动名称进行搜索" />*/}
      </div>

      <div className={styles.content}>
        {
          activities.map(item => {
            return <ActivityCard
              sourceData={item}
              onClick={this.handleCardClick.bind(this, item.id)}
              onClose={this.handleCardClose}
              key={item.id}/>
          })
        }
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
              type="primary" onClick={this.confirmDeleteModal}>确定</Button>
          </div>
        }
        onCancel={this.closeDeleteModal}>
        <div className={style['content-box']}>
          <img className={style.icon} src={deleteImg} />
          <span className={style.content}>你确定要删除活动{deleteActivityName}吗？</span>
        </div>
      </Modal>
    </div>;

    return <div>
      {
        isLoading
          ? loading
          : (hasPermission
            ? (activities.length === 0 ? noActive : content)
            : noPermission)
      }
    </div>
  }

  componentDidMount() {
    this._getUserInfo().then(() => {
      this._getRobotId().then(() => {
        if (this.robotId) {
          this._getActiveList()
        }
      })
    })
  }

  // 跳转到新建活动页面
  goToCreate = () => {
    this.props.dispatch({
      type: 'operateActivity/changeActivityId',
      payload: 0
    });
    router.push('/operateActivity/configActivity')
  };

  handleCardClick = (id) => {
    this.props.dispatch({
      type: 'operateActivity/changeActivityId',
      payload: id
    });
    router.push('/operateActivity/configActivity')
  };

  handleCardClose = (id, name) => {
    this.setState({
      deleteActivityId: id,
      deleteActivityName: name,
      showDeleteModal: true
    })
  };

  closeDeleteModal = () => {
    this.setState({
      showDeleteModal: false
    })
  };

  confirmDeleteModal = async () => {
    const {deleteActivityId} = this.state;
    this._deleteActive(deleteActivityId);
    this.setState({
      showDeleteModal: false
    });
    setTimeout(() => {
      this._getActiveList();
    }, 500)
  };

  // 获取用户身份标识
  _getUserInfo = async () => {
    let activeInfo = {
      collegeId: '',
      collegeName: '',
      familyId: '',
      familyName: '',
      groupId: '',
      groupName: ''
    };
    let res = await getUserInfo();
    if (res && res.code === 20000) {
      let data = res.data;
      for (let key in activeInfo) {
        activeInfo[key] = data[key] ? data[key] : ''
      }
    } else {}
    this.activeInfo = activeInfo;
    storage.setItem('active_info', activeInfo);
  };

  // 获取机器人ID
  _getRobotId = async () => {
    const {activeInfo} = this;
    let res = await getRobotId(activeInfo);
    if (res && res.code === 200) {
      if (!res.data) {
        this.setState({
          hasPermission: false,
          isLoading: false
        });
      } else {
        this.robotId = res.data;
        storage.setItem('robot_id', res.data);
      }
    } else {}
  };

  // 获取活动列表
  _getActiveList = async () => {
    const {robotId} = this;
    let res = await getActiveList(robotId);
    if (res && res.code === 200) {
      let data = res.data;
      data.forEach(item => {
        item.startTime = withoutSeconds(item.startTime);
        item.endTime = withoutSeconds(item.endTime);
        item.updateTime = withoutSeconds(item.updateTime);
      });
      this.setState({
        activities: res.data,
        isLoading: false
      })
    } else {
      message.error('网络错误，请稍后重试');
      this.setState({
        isLoading: false
      })
    }
  };

  // 删除某个活动
  _deleteActive = async (id) => {
    let res = await deleteActive(id);
    if (res && res.code === 200) {
    } else {
      message.error('删除失败，请稍后重试');
    }
  };
}

export default connect(() => ({}))(OperateActivity);
