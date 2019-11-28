import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import BIInput from '@/ant_components/BIInput';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import { Icon } from 'antd';
import styles from './style.less';
import router from 'umi/router';
import Line from './components/line';
import UploadImg from '@/pages/scoreAppeal/components/uploadImgs';
const { TextArea } = BIInput;

const tHead = ['序号', '所属知识库', '所属分类', '标准问题']
@connect(({ hotQuestion, loading }) => ({
  hotQuestion
}))

class GuessEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: '',
      visible: false,
      radioId: -1,
      dataSource: {
        card_id: 1,
        card_name: '',
        robot_id: '',
        isSunlands: true,
        operateName: '',//操作人
        list: [{
          sort: 1,
          knowledgeId: 264,
          knowledgeName: '报考知识库',
          questionTypeId: 794,
          questionType: '自考介绍',
          question: '我爱学习',
          questionId: 22655,
          answerId: 1,
          statistic_id: 1,//数据唯一主键，没有则不传（新增的没有）
          is_proxy: true,//是否是静态问题，非静态问题不可编辑
          answer: 'dkfdlf'
        }, {
          sort: 2,
          knowledgeId: 267,
          knowledgeName: '课程库',
          questionTypeId: 723,
          questionType: '自考介绍',
          question: '笔试需要带什么',
          questionId: 19449,
          answerId: 1,
          statistic_id: 1,//数据唯一主键，没有则不传（新增的没有）
          is_proxy: true,//是否是静态问题，非静态问题不可编辑
          answer: 'dkfdlf'
        }, {
          sort: 3,
          knowledgeId: 268,
          knowledgeName: 'APP操作',
          questionTypeId: 725,
          questionType: '自考介绍',
          question: '笔试需要带什么',
          questionId: 1,
          answerId: 1,
          statistic_id: 1,//数据唯一主键，没有则不传（新增的没有）
          is_proxy: true,//是否是静态问题，非静态问题不可编辑
          answer: 'dkfdlf'
        }]
      }

    }
  }
  componentDidMount = () => {
    this.getDataSource();
    this.getKnowledgeList();
    this.getPageData();
    // this.getQuestionType();
    console.log(77, this.props.location.query)
  }
  getPageData = () => {
    const query = this.props.location.query;
    this.props.dispatch({
      type: 'hotQuestion/getGuessData',
      payload: { params: query },
    });
  }
  getKnowledgeList = () => {
    this.props.dispatch({
      type: 'hotQuestion/getKnowledgeList',
      payload: { params: {} },
    });
  }

  handleBread = () => {
    router.push({
      pathname: '/hotQuestion/index'
    });
  }
  countArray = () => {
    let array = [];
    for (let i = this.state.dataSource.list.length; i < 27 - this.state.dataSource.list.length; i++) {
      array.push(i)
    }
    return array;
  }
  uploadImg = (info) => {
    console.log(39, info)
  }
  handleImgChange = (info) => {
    console.log(42, info)
  }
  handleEdit = (item) => {
    console.log(54, item)
    this.setState({
      visible: true
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  handleDelete = (data, index) => {
    const temp = this.state.dataSource
    let list = temp.list;
    list = list.filter((item, i) => {
      return i != index
    })
    list.map((item, index) => {
      item.sort = index + 1
    })
    temp.list = list
    this.getDataSource(list);
  }
  swapItems = (arr, index1, index2) => {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr
  }
  moveUp = () => {
    const { list } = this.state.dataSource
    console.log(128, list)
    if (this.state.radioId != -1) {
      const index = this.state.radioId;
      this.swapItems(this.state.dataSource.list, index, index - 1);
      this.state.dataSource.list.map((item, index) => {
        item.sort = index + 1
      })
      this.setState({
        dataSource: this.state.dataSource,
        radioId: -1
      })
      console.log(142, this.state.dataSource.list)
    }


  }
  moveDown = () => {
    const { list } = this.state.dataSource
    if (this.state.radioId != -1) {
      const index = this.state.radioId;
      this.swapItems(this.state.dataSource.list, index, index + 1);
      this.setState({
        dataSource: this.state.dataSource,
        radioId: -1
      })
    }
  }
  submit = () => {
    console.log(104, this.state.dataSource)
  }
  clickRadio = (index) => {
    this.setState({
      radioId: index
    })
  }
  updateData = (params) => {
    const list = this.state.dataSource.list[params.index];
    list.knowledgeId = params.knowledgeId;
    list.knowledgeName = params.knowledgeName;
    list.questionType = params.questionType;
    list.questionTypeId = params.questionTypeId
    list.question = params.question;
    list.questionId = params.questionId;
  }
  getDataSource = (list = this.state.dataSource.list) => {
    for (var i = list.length; i < 27; i++) {
      list.push({
        key: new Date().getTime() + i,
        sort: i + 1
      })
    }
    this.setState({
      dataSource: this.state.dataSource
    })
  }
  getOthersLine = () => {
    const others = [];
    for (let i = this.state.dataSource.list.length; i < 27; i++) {
      others.push(<Line
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
        clickRadio={this.clickRadio}
        updateData={this.updateData}
        key={i}
        dataSource={{}}
        auth={true}
        index={i}
      />)
    }
    return others;
  }

  render() {
    const { cardName, visible, dataSource, radioId } = this.state;
    return (
      <div className={styles.editContainer}>
        <div className={styles.breadCustom}>
          <a onClick={this.handleBread}>首页/</a>配置编辑
        </div>
        <div className={styles.guessEdit}>
          <div className={styles.title}>猜你想问</div>

          <div className={styles.editTop}>
            <div className={styles.cardName}>
              <span>猜你想问卡片名称：</span>
              <BIInput
                style={{ width: '238px' }}
                placeholder="请输入"
                value={cardName}
              />
            </div>
            <div className={styles.labels}>
              <span>尚德学员</span>
              <span>尚小德</span>
              <p>当前已配置运营活动：【领现金】 该活动固定展示在底部第一位（优先于默认底部关联问题）</p>
            </div>
          </div>

          <div className={styles.editTable}>
            <ul className={styles.thead}>
              <li className={styles.eq0}>{tHead[0]}</li>
              <li className={styles.eq1}>{tHead[1]}</li>
              <li className={styles.eq2}>{tHead[2]}</li>
              <li className={styles.eq3}>{tHead[3]}</li>
              <li className={styles.eq4}>
                <div className={`${styles.icon} ${radioId === 0 ? styles.disabled : ''}`} onClick={radioId === 0 ? null : this.moveUp}><Icon type="up-circle" />上移</div>
                <div className={`${styles.icon} ${radioId === 26 ? styles.disabled : ''}`} onClick={radioId === 26 ? null : this.moveDown}><Icon type="down-circle" />下移</div>
              </li>
            </ul>
            <div className={styles.tbody}>
              {
                dataSource.list.map((item, index) => {
                  return <Line
                    dataSource={item || {}}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                    clickRadio={this.clickRadio}
                    updateData={this.updateData}
                    key={item.questionId || item.key}
                    auth={true}
                    index={index}
                    radioId={radioId}></Line>
                })

              }


            </div>
          </div>
          <div className={styles.btns}>
            {/* <BIButton><Link to={`/xdCredit/index?params=${JSON.stringify({startTime, endTime, "dementionId": 16 }) }`} target='_black'>IM差评快捷入口</Link></BIButton> */}
            <BIButton style={{ marginRight: '8px' }} type="reset">
              <Link to={'/hotQuestion/index'}>取消</Link>
            </BIButton>
            <BIButton type="primary" onClick={this.submit}>保存</BIButton>
          </div>
        </div>
        {/* modal */}
        <BIModal
          title="答案编辑"
          width={660}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <BIButton key="back" style={{ marginRight: 10 }} onClick={this.handleCancel}>
              取消
            </BIButton>,
            <BIButton key="submit" type="primary" onClick={this.handleOk}>
              保存
            </BIButton>,
          ]}>
          <div className={styles.popContainer}>
            <div className={styles.formItem}>
              <label>标准问题：</label>
              <div className={styles.inputs}><BIInput /></div>
            </div>
            <div className={`${styles.formItem} ${styles.formItem2}`}>
              <label>答案：</label>
              <div className={styles.inputs}>
                <TextArea />
              </div>
            </div>
            <div className={styles.defaultBtn}>
              <BIButton type="primary">恢复默认</BIButton>
            </div>
            <div className={`${styles.formItem} ${styles.formItem2}`}>
              <label>图片：</label>
              <div className={styles.inputs}>
                <UploadImg
                  {...this.props}
                  modalWidth={{ width1: '50%', width2: 'auto' }}
                  limitImg={1}
                  mainNum={1}
                  onChange={this.handleImgChange}
                  uploadImg={(fileList) => this.uploadImg(fileList)}>
                </UploadImg>
                <p className={styles.notice}>注：图片大小限制为2M</p>
              </div>
            </div>
          </div>
        </BIModal>

      </div>
    )
  }
}

export default GuessEdit;
