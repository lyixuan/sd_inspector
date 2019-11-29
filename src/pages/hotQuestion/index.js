import React from 'react';
import style from './style.less';
import { Button, Select, Icon, message } from 'antd';
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

class HotQuestion extends React.Component{
  constructor(props) {
    super(props);
    this.userType = storage.getUserInfo().userType;
    this.robots = [];
    this.guessCardColor = ['#FF5959', '#3389FF', '#9013FE', '#F5A623'];
    this.state = {
      robotList: [],
      robotListLoading: true,
      relationQuestion: [],
      relationOperator: null,
      relationUpdateTime: null,
      goingActivity: '中秋节打折',
      guessQuestion: [],
      currentRobot: 175,
      isSunlands: 1,
      showCopyModal: false,
      copyConfirmButtonDis: true
    }
  }

  render() {
    let {userType, userIdentity} = this;
    const {
      robotList,
      robotListLoading,
      relationQuestion,
      goingActivity,
      guessQuestion,
      currentRobot,
      isSunlands,
      showCopyModal,
      copyConfirmButtonDis} = this.state;

    const {Option} = Select;

    // 根据用户类型判断用户身份并保存在this上
    if (!userIdentity) {
      if (userType === 'admin' || userType === 'boss') {
        userIdentity = 1
      } else {
        userIdentity = 2
      }
      this.userIdentity = userIdentity;
    } else {}

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
              userIdentity === 1
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
            operator={relationQuestion}
            updateTime={relationQuestion}/>
        </div>
      </div>;

    // 猜你想问部分
    let guessArea = <div className={style['guess-part']}>
        <div className={style.title}>
          {
            userIdentity === 1
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
        该机器人还没有专属【猜你想问】及【默认底部关联问题】请在首页进行同步操作
      </p>
    </div>;

    return <div className={style.wrap}>
      {
        userIdentity === 1
          ? chooseRobotArea
          : null
      }

      {
        relationQuestion.length === 0
          ? null
          : relationQuestionArea
      }

      {
        guessQuestion.length === 0
          ? null
          : guessArea
      }

      {
        relationQuestion.length === 0
        && guessQuestion.length === 0
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
    if (userIdentity === 1) {
      const {currentRobot, isSunlands} = this.state;
      this._getRobotList();
      this._bossGetRelationQuestion(currentRobot, isSunlands);
      this._bossGetGuessQuestion(currentRobot, isSunlands);
      this._getGoingActivity(currentRobot);
    } else {}

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
    this._bossGetRelationQuestion(value, isSunlands);
    this._bossGetGuessQuestion(value, isSunlands);
  };

  // 改变学员类型
  changeStudentType = (value) => {
    const {currentRobot} = this.state;
    this.setState({
      isSunlands: value
    });
    this._bossGetRelationQuestion(currentRobot, value);
    this._bossGetGuessQuestion(currentRobot, value);
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
      showCopyModal: false
    })
  };

  // 同步modal中多选框改变
  multipleChange = (value) => {
    this._updateButtonStatus(value);
    this.robots = value;
  };

  // 点击同步弹框的确认按钮
  confirmCopyModal = () => {
    this.setState({
      showCopyModal: false
    });
    this._copyRobotConfig();
  };

  // 点击底部默认关联问题的编辑按钮
  goToEditRelationQuestionPage = () => {
    const {currentRobot, isSunlands} = this.state;
    console.log(currentRobot, isSunlands);
    // router.push({
    //   pathname: '',
    //   query: {}
    // })
  };

  // 点击猜你想问卡片的编辑
  handleGuessCardEdit = (cardId) => {
    const {currentRobot, isSunlands} = this.state;
    console.log(currentRobot, isSunlands, cardId);
    // router.push({
    //   pathname: '',
    //   query: {}
    // })
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
      collegeName: '',
      familyId: '',
      familyName: '',
      groupId: '',
      groupName: ''
    };
    let res = await getUserInfo();
    if (res && res.code === 20000) {
      let data = res.data;
      for (let key in info) {
        info[key] = data[key] ? data[key] : ''
      }
    } else {}
    this.userInfo = info;
  };

  // 获取机器人ID
  _getRobotId = async () => {
    const {userInfo} = this;
    let res = await getRobotId(userInfo);
    if (res && res.code === 200) {
      if (!res.data) {

      } else {
        this.robotId = res.data;
      }
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
    const {robots} = this;
    // let res = await copyRobot(robots);
    console.log(robots);
  };

  // 管理员获取底部关联问题
  _bossGetRelationQuestion = async (robotId, isSunlands) => {
    let res = await getRelationQuestion(robotId, isSunlands);
    if (res && res.code === 200) {
      this.setState({
        relationQuestion: res.data.similarTempQuestionDtoList,
        relationOperator: res.data.operator,
        relationUpdateTime: res.data.updateTime
      })
    }
  };

  // 管理员获取猜你想问数据
  _bossGetGuessQuestion = async (id, flag) => {
    let res = await getGuessQuestion(id, flag);
    if (res && res.code === 200) {
      this.setState({
        guessQuestion: res.data
      })
    } else {}
  };

  // 获取当前机器人正在进行中的活动的名称
  _getGoingActivity = async () => {
    const {robotId} = this;
    let res = await getGoingActivity(robotId);
    console.log(res);
  };

}

export default HotQuestion;
