import React from 'react';
import style from './style.less';
import { Button, Select, Icon, message, Spin } from 'antd';
import router from 'umi/router';
import BIModal from '@/ant_components/BIModal';
import QuestionTable from '@/pages/hotQuestion/components/questionTable';
import GuessQuestionCard from '@/pages/hotQuestion/components/guessQuestionCard';
import storage from '@/utils/storage';
import {
  getRobotList,
  copyRobot,
  getRelationQuestion,
  getRobotId,
  getUserInfo,
  getGuessQuestion,
  getGoingActivity} from './services';
import kongbai from '@/assets/hotQuestion/kongbai.png';
import {User_Identity} from './constants/user';
import {withoutSeconds} from '@/pages/configWords/utils/util';

class HotQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.userType = storage.getUserInfo().userType;
    this.guessCardColor = ['#FF5959', '#3389FF', '#9013FE', '#F5A623', '#00CCC3'];
    this.state = {
      robotList: [],
      robotListLoading: true,
      copyRobots: [],
      relationQuestion: [],
      relationOperator: null,
      relationUpdateTime: null,
      goingActivity: '',
      guessQuestion: [],
      currentRobot: 175,
      isSunlands: 1,
      showCopyModal: false,
      copyConfirmButtonDis: true,
      pageLoading: true
    }
  }

  render() {
    let {userType, userIdentity} = this;
    const {
      robotList,
      robotListLoading,
      copyRobots,
      relationQuestion,
      relationOperator,
      relationUpdateTime,
      goingActivity,
      guessQuestion,
      currentRobot,
      isSunlands,
      showCopyModal,
      copyConfirmButtonDis,
      pageLoading} = this.state;

    const {Option} = Select;

    // 根据用户类型判断用户身份并保存在this上
    if (!userIdentity) {
      if (userType === 'admin' || userType === 'boss') {
        userIdentity = User_Identity.ADMIN_AND_BOSS
      } else {
        userIdentity = User_Identity.NORMAL_USER
      }
      this.userIdentity = userIdentity;
    } else {}

    let loading = <div style={{textAlign: 'center', marginTop: 20}}>
      <Spin size="large" />
    </div>;

    let tabsAndCopyButton = <div className={style.tabs}>
      <div className={style.tab}>
        <div
          onClick={this.changeStudentType.bind(this, 1)}
          className={`${style.each} ${isSunlands === 1 ? style.active : ''}`}>
          尚德学员</div>
        <div
          onClick={this.changeStudentType.bind(this, 0)}
          className={`${style.each} ${isSunlands === 0 ? style.active : ''}`}>
          非尚德学员</div>
      </div>
      <Button
        type="primary"
        className={style.button}
        onClick={this.openCopyModal}>同步</Button>
    </div>;

    let chooseRobotArea = <div className={style['choose-robot']}>
      <div>
        <span className={style.label}>请选择：</span>
        <Select
          className={style.select}
          placeholder="请选择"
          value={currentRobot}
          loading={robotListLoading}
          onChange={this.changeRobot}>
          {
            robotList.map(item => {
              return <Option value={item.robotId} key={item.robotId}>{item.name}</Option>
            })
          }
        </Select>
      </div>
      {
        currentRobot === 175
          ? tabsAndCopyButton
          : <div style={{height: 25}}> </div>
      }
    </div>;

    // 默认底部关联问题部分
    let relationQuestionArea = <div className={style.relation}>
        <div className={style.title}>
          <div className={style.text}>
            {
              userIdentity === User_Identity.ADMIN_AND_BOSS
                ? '默认底部关联问题'
                : '底部热门问题'
            }
          </div>
          <div className={style.edit} onClick={this.goToEditRelationQuestionPage}>
            <Icon type="edit"/>&nbsp;&nbsp;编辑
          </div>
        </div>
        <div className={style.content}>
          <QuestionTable
            sourceData={relationQuestion}
            activity={goingActivity}
            operator={relationOperator}
            updateTime={relationUpdateTime}/>
        </div>
      </div>;

    // 猜你想问部分
    let guessArea = <div className={style['guess-part']}>
        <div className={style.title}>
          {
            userIdentity === User_Identity.ADMIN_AND_BOSS
              ? '猜你想问'
              : '顶部热门问题'
          }
        </div>
        <div className={style.content}>
          {
            guessQuestion.map((item, index) => {
              return <div className={style.item} key={item.cardId}>
                  <GuessQuestionCard
                    cardData={item}
                    topLeftColor={this.getColor(index)}
                    onEdit={this.handleGuessCardEdit}/>
                </div>
            })
          }
        </div>
      </div>;

    // 没有数据时展示内容
    let noData = <div className={style.kongbai}>
      <img src={kongbai} className={style.image}/>
      <p className={style.text}>
        {
          userIdentity === User_Identity.ADMIN_AND_BOSS
            ? '该机器人还没有专属【猜你想问】及【默认底部关联问题】请在首页进行同步操作'
            : '该机器人还没有专属热门问题 请联系管理员进行同步操作'
        }
      </p>
    </div>;

    return <div className={style.wrap}>
      {
        userIdentity === User_Identity.ADMIN_AND_BOSS
          ? chooseRobotArea
          : null
      }

      {
        pageLoading ? loading : null
      }

      {
        pageLoading
          ? null
          : (relationQuestion.length === 0
            ? null
            : relationQuestionArea)

      }

      {
        pageLoading
          ? null
          : (guessQuestion.length === 0
            ? null
            : guessArea)

      }

      {
        relationQuestion.length === 0
        && guessQuestion.length === 0
        && !pageLoading
        && noData
      }

      {/*同步配置弹框*/}
      <BIModal
        visible={showCopyModal}
        width={432}
        okText="确认"
        title="你希望将该套配置同步至"
        okButtonProps={{disabled: copyConfirmButtonDis}}
        onCancel={this.closeCopyModal}
        onOk={this.confirmCopyModal}>
        <div className={style['copy-modal']}>
          <span className={style.label}>机器人：</span>
          <Select
            className={style.select}
            mode="multiple"
            placeholder="请选择"
            value={copyRobots}
            onChange={this.multipleChange}>
            {
              robotList.map(item => {
                return <Option
                  value={item.robotId}
                  key={item.robotId}
                  disabled={item.robotId === 175 ? true : false}>{item.name}</Option>
              })
            }
          </Select>
        </div>
      </BIModal>

    </div>
  }

  componentDidMount() {
    const {userIdentity} = this;

    if (userIdentity === User_Identity.ADMIN_AND_BOSS) {
      // admin 和 boss的请求数据逻辑
      const {currentRobot, isSunlands} = this.state;
      this._getRobotList();
      this._getRelationQuestion(currentRobot, isSunlands);
      this._getGuessQuestion(currentRobot, isSunlands);
      this._getGoingActivity(currentRobot);
    } else {
      // 普通用户的请求数据逻辑
      this._getUserInfo().then(() => {
        this._getRobotId().then(() => {
          const {robotId} = this;
          this._getRelationQuestion(robotId, 1);
          this._getGuessQuestion(robotId, 1);
          this._getGoingActivity(robotId);
        })
      })
    }

  }

  // 获取传给猜你想问卡片的颜色值
  getColor = (i) => {
    let colors = this.guessCardColor;
    let index;
    if (i < colors.length) {
      return colors[i]
    } else {
      index = i % colors.length;
      return colors[index]
    }
  };

  // 改变选择机器人时
  changeRobot = (value) => {
    const {isSunlands} = this.state;
    this.setState({
      currentRobot: value
    });
    this._getRelationQuestion(value, isSunlands);
    this._getGuessQuestion(value, isSunlands);
    this._getGoingActivity(value);
  };

  // 改变学员类型
  changeStudentType = (value) => {
    const {currentRobot} = this.state;
    this.setState({
      isSunlands: value
    });
    this._getRelationQuestion(currentRobot, value);
    this._getGuessQuestion(currentRobot, value);
  };

  // 打开同步弹框
  openCopyModal = () => {
    this.setState({
      showCopyModal: true
    })
  };

  // 关闭弹框
  closeCopyModal = () => {
    this.setState({
      copyRobots: [],
      showCopyModal: false
    })
  };

  // 同步modal中多选框改变
  multipleChange = (value) => {
    this.setState({
      copyRobots: value
    });
    this._updateButtonStatus(value);
  };

  // 点击同步弹框的确认按钮
  confirmCopyModal = () => {
    this.setState({
      copyRobots: [],
      showCopyModal: false
    });
    this._copyRobotConfig();
  };

  // 点击底部默认关联问题的编辑按钮
  goToEditRelationQuestionPage = () => {
    const {currentRobot, isSunlands, goingActivity} = this.state;
    router.push({
      pathname: '/hotQuestion/relationEdit',
      query: {
        robotId: currentRobot,
        isSunlands: isSunlands,
        activityName: goingActivity
      }
    })
  };

  // 点击猜你想问卡片的编辑
  handleGuessCardEdit = (cardId) => {
    const {currentRobot, isSunlands} = this.state;
    router.push({
      pathname: '/hotQuestion/guessEdit',
      query: {
        robotId: currentRobot,
        isSunlands: isSunlands,
        cardId: cardId
      }
    })
  };

  // 检测同步弹框的配置按钮是否可用
  _updateButtonStatus = (robots) => {
    if (robots.length === 0) {
      this.setState({
        copyConfirmButtonDis: true
      })
    } else {
      this.setState({
        copyConfirmButtonDis: false
      })
    }
  };

  // 获取用户身份标识
  _getUserInfo = async () => {
    let info = {
      collegeId: '',
      familyId: '',
      groupId: ''
    };
    let res = await getUserInfo();
    if (res && res.code === 20000) {
      let data = res.data;
      for (let key in info) {
        info[key] = data[key] ? data[key] : ''
      }
    } else {}
    this.userOrganization = info;
  };

  // 获取机器人ID
  _getRobotId = async () => {
    const {userOrganization} = this;
    let res = await getRobotId(userOrganization);
    if (res && res.code === 200) {
      if (res.data) {
        this.robotId = res.data;
      } else {}
    } else {}
  };

  // 获取机器人列表
  _getRobotList = async () => {
    let res = await getRobotList();
    if (res && res.code) {
      this.setState({
        robotList: res.data,
        robotListLoading: false
      })
    } else {}
  };

  // 同步配置
  _copyRobotConfig = async () => {
    const {copyRobots, isSunlands} = this.state;
    let res = await copyRobot(copyRobots, isSunlands);
    if (res && res.code === 200) {
      message.success('同步成功');
    } else {
      message.error('同步失败')
    }
  };

  // 获取底部关联问题
  _getRelationQuestion = async (robotId, isSunlands) => {
    let res = await getRelationQuestion(robotId, isSunlands);
    if (res && res.code === 200) {
      res.data.updateTime = withoutSeconds(res.data.updateTime);
      this.setState({
        relationQuestion: res.data.similarTempQuestionDtoList,
        relationOperator: res.data.operator,
        relationUpdateTime: res.data.updateTime,
        pageLoading: false
      })
    }
  };

  // 获取猜你想问数据
  _getGuessQuestion = async (id, flag) => {
    let res = await getGuessQuestion(id, flag);
    if (res && res.code === 200) {
      res.data.forEach(item => {
        item.updateTime = withoutSeconds(item.updateTime)
      });
      this.setState({
        guessQuestion: res.data,
        pageLoading: false
      })
    } else {}
  };

  // 获取当前机器人正在进行中的活动的名称
  _getGoingActivity = async (id) => {
    let res = await getGoingActivity(id);
    if (res && res.code === 200) {
      this.setState({
        goingActivity: res.data
      })
    } else {}
  };

}

export default HotQuestion;
