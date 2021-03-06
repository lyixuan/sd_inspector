import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import BIInput from '@/ant_components/BIInput';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import { Icon, Upload, message } from 'antd';
import styles from './style.less';
import router from 'umi/router';
import Line from './components/line';
import storage from '@/utils/storage';
import BILoading from '@/components/BILoading';
import { SSCP_WEB_BASE_URL } from '@/pages/configWords/utils/constants';
const { TextArea } = BIInput;


const tHead = ['序号', '所属知识库', '所属分类', '标准问题', '问题简称']
@connect(({ hotQuestion, loading }) => ({
  hotQuestion,
  answer: hotQuestion.answer,
  relationData: hotQuestion.relationData,
  loading: loading.effects['hotQuestion/getRelationData'],
  loadingSubmit: loading.effects['hotQuestion/similarTempSave'],
  loadingReset: loading.effects['hotQuestion/getAnswer'],
}))

class RelationEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      radioId: -1,
      dataSource: {},
      question: '',
      answerContent: '',
      answerCode: null,
      imageList: [],
      questionId: null,
      currentEditIndex: -1,
      status: 0,
      userType: storage.getUserInfo().userType,
      isUploadImg: false,
      moveUp: false,
      moveDown: false
    }
  }
  componentDidMount = () => {
    this.getKnowledgeList();
    this.getPageData();
  }
  getPageData = () => {
    const query = this.props.location.query;
    this.props.dispatch({
      type: 'hotQuestion/getRelationData',
      payload: { params: query },
    }).then(() => {
      this.getDataSource(this.props.relationData.list);
    });
  }
  getKnowledgeList = () => {
    this.props.dispatch({
      type: 'hotQuestion/getKnowledgeList',
      payload: { params: { id: this.props.location.query.robotId } },
    });
  }
  handleBread = () => {
    const { robotId, isSunlands } = this.props.location.query;
    router.push({
      pathname: '/hotQuestion/index',
      query: {
        robotId: robotId,
        isSunlands: isSunlands,
      }
    });
  }
  // 点击编辑
  handleEdit = (param) => {
    // if (this.state.questionId == param.questionId) {
    //   this.setState({
    //     visible: true,
    //   })
    //   return
    // }
    const currentItem = this.state.dataSource.list[param.index]
    if (currentItem.hasEdit) {
      // return;
      this.answerData(currentItem.answer);
    } else {
      this.state.isUploadImg = false;
      this.getAnswer({
        robotId: this.props.location.query.robotId,
        questionId: param.questionId
      })
    }

    this.setState({
      visible: true,
      oldQuestionId: param.oldQuestionId,
      questionId: param.questionId,
      question: param.question,
      currentEditIndex: param.index
    })


  }
  // 恢复默认
  resetAnswer = () => {
    const { robotId } = this.props.location.query;
    const { questionId, oldQuestionId } = this.state;
    this.getAnswer({
      robotId: robotId,
      questionId: oldQuestionId || questionId
    });
  }
  // 输入答案
  answerChange = (e) => {
    this.setState({
      answerContent: e.target.value
    })
  }
  getAnswer = (params) => {
    this.props.dispatch({
      type: 'hotQuestion/getAnswer',
      payload: { params: params },
    }).then(() => {
      const { answer } = this.props;
      this.answerData(answer)

    });
  }
  answerData = (answer) => {
    const reg = /##[\s\S]*##/g;
    const isMedia = reg.test(answer);
    let data = {};
    if (isMedia) {
      try {
        data = JSON.parse(answer.match(reg)[0].replace(/##/g, ""))
      } catch (err) {
        console.log(145, err)
      }
      const content = answer.replace(reg, '')
      this.setState({
        answerContent: content,
        compareContent: content,
        answerCode: answer.match(reg)[0],
        imageList: data.type === 'img' ? [{ uid: '-1', name: 'default', status: 'done', url: data.arr[0].url }] : []
      })
    } else {
      this.setState({
        answerContent: answer,
        compareContent: answer,
        imageList: []
      })
    }
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      isUploadImg: false
    })
  }
  handleOk = () => {
    const { answerContent, imageList, answerCode, currentEditIndex, compareContent } = this.state;
    let answer = ''
    if (!answerContent) {
      message.info('请输入答案');
      return;
    }

    answer = answerContent !== compareContent ? answerContent : this.props.answer
    // if (imageList.length > 0 && this.state.isUploadImg) {
    //   const json = { type: 'img', arr: [{ 'url': imageList[0].url }] }
    //   answer = `${answerContent}##${JSON.stringify(json)}##`
    // } else if (this.state.isUploadImg) {
    //   answer = answerContent
    // } else {
    //   answer = answerCode ? `${answerContent}${answerCode}` : answerContent
    // }
    this.state.dataSource.list[currentEditIndex].answer = answer
    this.state.dataSource.list[currentEditIndex].hasEdit = true
    this.setState({
      visible: false
    }, () => {
      message.info('答案已暂存，需在列表页进行发布后生效');
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
  submitBtnStatus = () => {
    const list = this.state.dataSource.list.filter((item, i) => {
      return item.questionId
    })
    this.setState({
      status: list.length
    })
  }
  swapItems = (arr, index1, index2) => {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr
  }
  moveUp = () => {
    if (this.state.radioId != -1) {
      const index = this.state.radioId;
      this.swapItems(this.state.dataSource.list, index, index - 1);
      this.state.dataSource.list.map((item, index) => {
        item.sort = index + 1
      })
      this.setState({
        dataSource: this.state.dataSource,
        radioId: this.state.radioId - 1,
        moveUp: true,
        moveDown: false
      })
    }
  }
  moveDown = () => {
    if (this.state.radioId != -1) {
      const index = this.state.radioId;
      this.swapItems(this.state.dataSource.list, index, index + 1);
      this.state.dataSource.list.map((item, index) => {
        item.sort = index + 1
      })
      this.setState({
        dataSource: this.state.dataSource,
        radioId: this.state.radioId + 1,
        moveUp: false,
        moveDown: true
      })
    }
  }
  submit = () => {
    const { dataSource } = this.state;
    const data2 = { ...dataSource }
    const list = data2.list.filter((item, i) => {
      return item.questionId
    })
    let arr = [];
    let flag = true
    for (let i = 0; i < list.length; i++) {
      arr.push(list[i].questionId);
    }
    let arr1 = [...new Set(arr)];
    if (arr1.length < arr.length) {
      message.info('问题不能重复')
      return false;
    }
    list.map((item, index) => {
      item.sort = index + 1
    })
    for (var i = 0; i < list.length; i++) {
      if (!list[i].simpleName) {
        flag = false;
      }
    }
    if (!flag) {
      message.info('问题简称不能为空')
      return false;
    }
    data2.list = list;
    if (data2.list.length < 4) {
      message.info('不能少于四条')
      return false;
    }
    const config = {
      content: <div style={{ lineHeight: '26px' }}><Icon type="check-circle" />保存成功<br />注：由于IM缓存问题，卡片内配置的问题，会在24小时内显示。</div>,
      duration: 3,
      onClose: () => { this.handleBread() },
      icon: <div style={{ display: 'none' }}></div>

    }
    this.props.dispatch({
      type: 'hotQuestion/similarTempSave',
      payload: { params: data2 },
      callBack: (data) => {
        if (data.code == 200) {
          message.success(config)
        }
      }
    })
  }
  clickRadio = (index) => {
    this.setState({
      radioId: index,
      moveUp: false,
      moveDown: false
    })
    if (this.state.radioId == index) {
      this.setState({
        radioId: -1,
      })
    }
  }
  updateData = (params) => {
    const list = this.state.dataSource.list[params.index];
    list.knowledgeId = params.knowledgeId;
    list.knowledgeName = params.knowledgeName;
    list.questionType = params.questionType;
    list.questionTypeId = params.questionTypeId
    list.question = params.question;
    list.questionId = params.questionId;
    list.isEdit = params.isEdit
    list.answer = params.answer
    list.simpleName = params.simpleName
    // this.submitBtnStatus()
  }
  // 初始化页面数据，给定唯一值
  getDataSource = (list = []) => {
    for (var i = list.length; i < 4; i++) {
      list.push({
        key: new Date().getTime() + i,
        sort: i + 1
      })
    }
    this.state.dataSource = this.props.relationData
    this.state.dataSource.list = list
    this.setState({
      dataSource: this.state.dataSource
    })
  }
  // 图片上传
  beforeUpload = (file) => {
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //   message.error('只支持上传 JPG/PNG 格式的文件');
    // }
    const isLt20M = file.size / 1024 / 1024 < 2;
    if (!isLt20M) {
      message.error('图片大小不能超过2M');
    }

    return isLt20M;
    // return isJpgOrPng && isLt20M;
  };
  UploadChange = async ({ file, fileList }) => {
    this.state.isUploadImg = true;
    if (file.status === 'done') {
      fileList.forEach(item => {
        if (item.response) {
          item.url = file.response.data.imageQcloudUrl;
          item.thumbUrl = file.response.data.imageThumQcloudUrl;
        }
      });
      this.setState({
        imageList: [...fileList]
      });
      message.success('图片上传成功');
    } else if (file.status === 'removed') {
      this.setState({
        imageList: [...fileList],
      });
    } else if (file.status === 'error') {
      message.error('上传失败');
      this.setState({
        imageList: []
      })
    } else {
      this.setState({
        imageList: [...fileList]
      })
    }
  };

  render() {
    const { visible, radioId, question, answerContent, imageList, status, userType, moveUp, moveDown } = this.state;
    const dataSource = this.props.relationData
    const { sunlandsFlag, robotName } = dataSource
    const auth = userType === 'boss' || userType === 'admin';
    const { loading, loadingSubmit, loadingReset } = this.props
    const { activityName, robotId } = this.props.location.query
    return (
      <div className={styles.editContainer}>
        <div className={styles.breadCustom}>
          <a onClick={this.handleBread}>首页/</a>配置编辑
        </div>
        <div className={styles.guessEdit}>
          <div className={styles.title}>{auth ? '默认底部关联问题' : `底部热门问题`}</div>
          {/* <div className={styles.title}></div> */}
          <div className={styles.editTop}>
            <div className={styles.labels} style={{ paddingTop: '10px' }}>
              {
                auth && <>
                  <span>{sunlandsFlag ? '尚德学员' : '非尚德学员'}</span>
                  {robotName && <span>{robotName}</span>}
                </>
              }

              {
                activityName && <p>当前已配置运营活动：【{activityName}】 该活动固定展示在底部第一位（优先于{auth ? '默认底部关联' : '底部热门'}问题） </p>

              }
            </div>
          </div>

          <div className={styles.editTable}>
            <ul className={styles.thead}>
              <li className={styles.eq0}>{tHead[0]}</li>
              <li className={styles.eq1}>{tHead[1]}</li>
              <li className={styles.eq2}>{tHead[2]}</li>
              <li className={styles.eq5}>{tHead[4]}</li>
              <li className={styles.eq3}>{tHead[3]}</li>
              <li className={styles.eq4}>
                <div className={`${styles.icon} ${radioId !== -1 && moveUp ? styles.active : ''} ${radioId === 0 ? styles.disabled : ''}`} onClick={radioId === 0 ? null : this.moveUp}><Icon type="up-circle" />上移</div>
                <div className={`${styles.icon} ${radioId !== -1 && moveDown ? styles.active : ''} ${radioId === 3 ? styles.disabled : ''}`} onClick={radioId === 3 ? null : this.moveDown}><Icon type="down-circle" />下移</div>
              </li>
            </ul>
            <div className={styles.tbody}>
              {

                loading ? <BILoading isLoading={loading} height="200px"></BILoading> : dataSource.list && dataSource.list.map((item, index) => {
                  return <Line
                    dataSource={item || {}}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                    clickRadio={this.clickRadio}
                    updateData={this.updateData}
                    key={item.questionId || item.key}
                    auth={auth}
                    index={index}
                    robotId={robotId}
                    radioId={radioId}></Line>
                })

              }

            </div>
          </div>
          <div className={styles.btns}>
            {/* <BIButton><Link to={`/xdCredit/index?params=${JSON.stringify({startTime, endTime, "dementionId": 16 }) }`} target='_black'>IM差评快捷入口</Link></BIButton> */}
            <BIButton style={{ marginRight: '8px' }} type="reset" onClick={this.handleBread}>取消
            </BIButton>
            <BIButton type="primary" onClick={this.submit} loading={loadingSubmit}>保存并发布</BIButton>
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
            <BIButton key={'submit'} type="primary" onClick={this.handleOk}>
              保存
            </BIButton>,
          ]}>
          <div className={styles.popContainer}>
            <div className={styles.formItem}>
              <label>标准问题：</label>
              <div className={styles.inputs}><BIInput value={question} readOnly={true} /></div>
            </div>
            <div className={`${styles.formItem} ${styles.formItem2}`}>
              <label>答案：</label>
              <div className={styles.inputs}>
                <TextArea value={answerContent} maxLength={1000} onChange={this.answerChange} placeholder='请输入答案' />
              </div>
            </div>
            <div className={styles.defaultBtn}>
              <BIButton type="primary" onClick={loadingReset ? null : this.resetAnswer}>恢复默认</BIButton>
            </div>
            <div className={`${styles.formItem} ${styles.formItem2}`} style={{ display: 'none' }}>
              <label>图片：</label>
              <div className={styles.inputs}>
                <Upload
                  accept="image/png, image/jpeg"
                  action={`${SSCP_WEB_BASE_URL}/activity/imageUpload`}
                  listType="picture-card"
                  accept="image/*"
                  showUploadList={{
                    showPreviewIcon: true,
                    showRemoveIcon: true,
                    showDownloadIcon: false
                  }}
                  fileList={imageList}
                  beforeUpload={this.beforeUpload}
                  onChange={this.UploadChange}>
                  {
                    imageList.length === 0
                      ? <><Icon type="upload" style={{ color: '#D5D8DB' }} />上传图片</>
                      : null
                  }
                </Upload>
                < p className={styles.notice}>注：图片大小限制为2M</p>
              </div>
            </div>
          </div>
        </BIModal>

      </div>
    )
  }
}

export default RelationEdit;
